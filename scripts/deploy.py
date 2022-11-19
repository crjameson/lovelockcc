

from scripts.helpful_scripts import get_account, get_contract, fund_with_link
from brownie import LoveLock, network, config, XSSFilter


def deploy_lovelock():
    account = get_account()
    lovelock = LoveLock.deploy(
        get_contract("matic_usd_price_feed").address,
        get_contract("vrf_coordinator").address,
        get_contract("link_token").address,
        config["networks"][network.show_active()]["fee"],
        config["networks"][network.show_active()]["keyhash"],
        {"from": account},
        publish_source=config["networks"][network.show_active()].get("verify", False)
        )
    #tx = lovelock.createLoveLock("tom", "jerry", "nice desc", {"from": account})
    #tx.wait(1)
    print("deployed at: " + lovelock.address)
    
    return lovelock

    #TODO: deploy on polygon and arbitrum testnets, maybe all evm chains?

# libraries need to be deployed extra: https://ethereum.stackexchange.com/questions/119265/how-to-test-internal-members-of-solidity-library-or-contract-in-brownie
def deploy_xss_filter():
    account = get_account()
    xss_filter = XSSFilter.deploy({"from": account})
    print("deployed at: " + xss_filter.address)

    return xss_filter


def main():
    deploy_lovelock()