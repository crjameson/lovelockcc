// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";


import "./NFTGenerator.sol";
import "./XSSFilter.sol";

// we still use vrfconsumerbase v1, the new one adds subscribtion to safe some gas fees, 
// but probably even harder to test that :D so TODO: Update to chainlink subscription
// https://docs.chain.link/docs/vrf/v2/subscription/migration-from-v1/

//TODO: great text about optimization: https://0xmacro.com/blog/solidity-gas-optimizations-cheat-sheet/


contract LoveLock is ERC721URIStorage, VRFConsumerBase,  Ownable {
    uint256 public tokenCounter;
    // price for one lovelock - make love free :D, maybe we can use some chainlink pricing feature here 
    // 25 USD for a lock 50% for raffle, 50% for fees and dev
    // for tests one lock costs 10 cent so around 0.1 matic
    uint256 private lockPriceUSD = 0.1 * (10**18);
    // percentage amount of the lockPrice paid to dev for Link and Dev costs
    uint256 private constant devFee = 50;

    // locks are minted with always increased id from this counter
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // mapping to store, the id for the user/wallet
    mapping(address => uint256) private _lockOwnerByAddress;

    // to get the price of a lock in USD -> you never know how expensive matic might become :D
    AggregatorV3Interface internal priceFeed;

    // 0 1 
    enum RAFFLE_STATE {
        OPEN,
        CALCULATING_WINNER
    }

    RAFFLE_STATE public raffle_state;

    // fee to pay for randomness requests as vrfconsumer
    uint256 public chainlinkFee;
    // hash to identify a chainlink node
    bytes32 public keyhash;

    // recent winner who has x amount of time to claim his winnings
    address payable public recentWinner;
    // amount he can claim so he cant claim the added value
    uint256 public recentPriceMoney;

    // EVENTS
    event RequestedRandomness(bytes32 requestId);
    event LockCreated(address owner, uint256 indexed id);
    event RaffleEnded(address winner, uint256 indexed amount);


    constructor(address _priceFeedAddress, 
                address _vrfCoordinator, 
                address _link, 
                uint256 _chainlinkFee,
                bytes32 _keyhash) 
    ERC721("LoveLock", "LLCC") 
    VRFConsumerBase (_vrfCoordinator, _link){
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
        raffle_state = RAFFLE_STATE.OPEN;
        chainlinkFee = _chainlinkFee;
        keyhash = _keyhash;
        //first lock has id 1 -> we skip zero
         _tokenIds.increment();
    }

    /*
    this function mints a new svg nft based on the user input params encoded in nft data
    using more then 10 params, gives some deep call stack error, so we need to use struct here
    */
    function createLoveLock(NFTGenerator.SVGParams memory svgparams, string memory description
        ) public payable returns (uint256) {

        require(balanceOf(msg.sender) == 0, "each wallet can only have one lovelock");
        require(msg.value >= getLockFee(), "not enough matic send");
        require(raffle_state == RAFFLE_STATE.OPEN, "calculating raffle winners, try again later");

        // before doing anything filter the input,
        //if there are an invalid chars in any of the params, return an error
        require(XSSFilter.validateString(svgparams.bg1), "invalid input");
        require(XSSFilter.validateString(svgparams.bg2), "invalid input");
        require(XSSFilter.validateString(svgparams.bg3), "invalid input");
        require(XSSFilter.validateString(svgparams.lockColor), "invalid input");
        require(XSSFilter.validateString(svgparams.text), "invalid input");
        require(XSSFilter.validateString(svgparams.textColor), "invalid input");
        require(XSSFilter.validateString(svgparams.date), "invalid input");
        require(XSSFilter.validateString(svgparams.dateColor), "invalid input");
        require(XSSFilter.validateString(description), "invalid input");

        uint256 newTokenId = _tokenIds.current();

        string memory name = string(abi.encodePacked("Lovelock #", Strings.toString(_tokenIds.current())));
        string memory image = Base64.encode(bytes(NFTGenerator.generateSVGImage(svgparams)));

        string memory nft_json = Base64.encode(
            bytes(string(
                abi.encodePacked(
                    '{"name": "', name, '",',
                    '"description": "', description, '",',
                    '"attributes": ', NFTGenerator.generateAttributes(svgparams), ',',
                    '"image": "',
                    "data:image/svg+xml;base64,",
                    image,
                    '"}'
                )
            ))
        );

        string memory token_uri_data = string(abi.encodePacked('data:application/json;base64,', nft_json));
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, token_uri_data);
        
        // store the token id for that address
        _lockOwnerByAddress[msg.sender] = newTokenId;

        emit LockCreated(msg.sender, newTokenId);

        _tokenIds.increment();
        return newTokenId;
    }  

    // enumerable interface is not neccesary and more expensive in fees, so better do it myself
    function totalSupply () public view returns (uint256) {
        // because our first token is 1, we need -1
        return _tokenIds.current()-1;
    }

    /// @dev return the id of the owned lock
    function getMyLock() public view returns (uint256) {
        uint256 lockId = _lockOwnerByAddress[msg.sender];
        require(lockId > 0, "no lock avail");
        return lockId;
    }

    /// @dev returns the USD price in Matic
    function getLockFee() public view returns(uint256) {
         (, int256 price, , , ) = priceFeed.latestRoundData();
        uint256 adjustedPrice = uint256(price) * 10**10; // 18 decimals
        uint256 lockFee = (lockPriceUSD * 10**18) / adjustedPrice;
        return lockFee;       
    }

    // raffle stuff starts here

    /// make sure the contract has link tokens at the deployed contract address! otherwise gas estimation failed error
    /// @dev this is the end raffle function called by chainlink automations 
    function endRaffle() public onlyOwner {
        raffle_state = RAFFLE_STATE.CALCULATING_WINNER;

        // pay the dev first - the rest goes to the winner 
        
        uint256 current_balance = address(this).balance;
        require(current_balance > 1000000000000000000, "not enough token to raffle");

        
        uint256 dev_amount = current_balance / 100 * devFee;

        // TODO: check this - this would be more fair if we only distribute to dev if the previous winner has claimed or substract the previous price balance?
        if(recentPriceMoney > 0) {
            // previous winner has not claimed, so only take the dev fee from the new entries
            dev_amount = (current_balance - recentPriceMoney) / 100 * devFee;
        }

        payable(owner()).transfer(dev_amount);

        bytes32 requestId = requestRandomness(keyhash, chainlinkFee);

        // reset values in case the winner has not claimed his price
        recentWinner = payable(address(0));
        recentPriceMoney = 0;
        emit RequestedRandomness(requestId);
    }
    
    // callback function gets called by VRF Coordinator, when the random number is avail
    function fulfillRandomness(bytes32 _requestId, uint256 _randomness) internal override {
        require(raffle_state == RAFFLE_STATE.CALCULATING_WINNER, "raffle not calculating winner");
        require(_randomness > 0, "random not found");

        // a random token id wins all the raffle and then has time till the next raffle to claim it
        // that way we dont lose money to dead wallets
        //TODO: check if current() -1 is better, because we are starting now with tokenId 1
        uint256 winningToken = _randomness % (_tokenIds.current()-1);
        recentWinner = payable(ownerOf(winningToken));
        // he can claim all the currently available matic token in this contract 
        recentPriceMoney = address(this).balance;

        emit RaffleEnded(recentWinner, recentPriceMoney);

        raffle_state = RAFFLE_STATE.OPEN;
    }

    /// @dev the recent winner can claim his price money with this function
    function claimPriceMoney() public {
        require(msg.sender == recentWinner, "only recent winner can claim the money");

        recentWinner.transfer(recentPriceMoney);
        // reset the recent price money, so we know, the winner claimed it
        recentPriceMoney = 0;
    }

    /// @dev returns the current amount in the price pool minus dev fees
    function getRecentPriceMoney() public view returns (uint256) {
        return recentPriceMoney;
    }

    /// @dev returns if the sender has won or not
    function hasWon() public view returns (bool) {
        require(raffle_state == RAFFLE_STATE.OPEN, "calculating raffle winners, try again later");
        return msg.sender == recentWinner;
    }

    /// @dev returns the current amount in the price pool minus dev fees
    function getCurrentPriceMoney() public view returns (uint256) {
        return address(this).balance / 100 * (100-devFee);
    }


    /// @dev sets the price of a lock in USD, default 0.1 for testing and 25 for live
    function setLockFeeUSD(uint256 newLockPrice) onlyOwner public returns (uint256) {
        lockPriceUSD = newLockPrice * (10**18);
        return lockPriceUSD;
    }
}