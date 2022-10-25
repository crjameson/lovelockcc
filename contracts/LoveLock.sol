// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "./NFTGenerator.sol";
import "./XSSFilter.sol";


contract LoveLock is ERC721URIStorage {
    uint256 public tokenCounter;
    // price for one lovelock - make love free :D, maybe we can use some chainlink pricing feature here 
    uint256 private constant _unitPrice = 0.02 ether;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("LoveLock", "LLCC") {
    }

    /*
    this function mints a new svg nft based on the user input params encoded in nft data
    using more then 10 params, gives some deep call stack error, so we need to use struct here
    */
    function createLoveLock(NFTGenerator.SVGParams memory svgparams, string memory description
        ) public returns (uint256) {

        // before doing anything filter the input,
        //if there are an invalid chars in any of the params, return an error
        require(XSSFilter.validateString(svgparams.bg1), "invalid input");
        require(XSSFilter.validateString(svgparams.bg2), "invalid input");
        require(XSSFilter.validateString(svgparams.bg3), "invalid input");
        require(XSSFilter.validateString(svgparams.lc1), "invalid input");
        require(XSSFilter.validateString(svgparams.lc2), "invalid input");
        require(XSSFilter.validateString(svgparams.lc3), "invalid input");
        require(XSSFilter.validateString(svgparams.text), "invalid input");
        require(XSSFilter.validateString(svgparams.tc1), "invalid input");
        require(XSSFilter.validateString(svgparams.tc2), "invalid input");
        require(XSSFilter.validateString(svgparams.date), "invalid input");
        require(XSSFilter.validateString(svgparams.dc1), "invalid input");
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
        _tokenIds.increment();
        return newTokenId;
    }  
    
}