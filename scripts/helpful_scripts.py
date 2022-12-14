from brownie import (
    accounts,
    network,
    config,
    Contract,
    interface,
    MockV3Aggregator,
    VRFCoordinatorMock,
    LinkToken,
)
from web3 import Web3

FORKED_LOCAL_ENVIRONMENTS = ["polygon-main-fork", "mainnet-fork-dev"]
LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["development", "ganache-local"]



def get_account(index=None, id=None):
    if index:
        return accounts[index]
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return accounts[0]
    if network.show_active() in FORKED_LOCAL_ENVIRONMENTS:
        return accounts[0]
    if network.show_active() == "polygon-test":
        return accounts.load('deployment_account')
    if id:
        return accounts.load(id)
    return accounts.add(config["wallets"]["from_key"])

contract_to_mock = {
    "matic_usd_price_feed": MockV3Aggregator,
    "vrf_coordinator": VRFCoordinatorMock,
    "link_token": LinkToken,
}


def get_contract(contract_name):
    """This function will grab the contract addresses from the brownie config
    if defined, otherwise, it will deploy a mock version of that contract, and
    return that mock contract.
        Args:
            contract_name (string)
        Returns:
            brownie.network.contract.ProjectContract: The most recently deployed
            version of this contract.
    """
    contract_type = contract_to_mock[contract_name]
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        if len(contract_type) <= 0:
            # MockV3Aggregator.length
            deploy_mocks()
        contract = contract_type[-1]
        # MockV3Aggregator[-1]
    else:
        contract_address = config["networks"][network.show_active()][contract_name]
        # address
        # ABI
        contract = Contract.from_abi(
            contract_type._name, contract_address, contract_type.abi
        )
        # MockV3Aggregator.abi
    return contract


DECIMALS = 8
INITIAL_VALUE = 90000000


def deploy_mocks(decimals=DECIMALS, initial_value=INITIAL_VALUE):
    account = get_account()
    MockV3Aggregator.deploy(decimals, initial_value, {"from": account})
    link_token = LinkToken.deploy({"from": account})
    VRFCoordinatorMock.deploy(link_token.address, {"from": account})
    print("deployed mocks")


def fund_with_link(
    contract_address, account=None, link_token=None, amount=100000000000000000
):  # 0.1 LINK
    account = account if account else get_account()
    link_token = link_token if link_token else get_contract("link_token")
    tx = link_token.transfer(contract_address, amount, {"from": account})
    # link_token_contract = interface.LinkTokenInterface(link_token.address)
    # tx = link_token_contract.transfer(contract_address, amount, {"from": account})
    tx.wait(1)
    print("fund contract: " + str(tx))
    return tx

# helper function to create many locks with different accounts
def create_locks(lovelock_contract, example_lock, count, lock_fee=0):
    if lock_fee == 0: 
        lock_fee = Web3.toWei(1, "ether")

    for i in range(count):
        lovelock_contract.createLoveLock(
            example_lock,
            "some nice nft description",
            {"from": get_account(i),
            "value": lock_fee + 1000}
        )