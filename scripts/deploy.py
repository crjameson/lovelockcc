

from scripts.helpful_scripts import get_account
from brownie import LoveLock

nft_data = "https://ipfs.io/ipfs/Qmd9MCGtdVz2miNumBHDbvj8bigSgTwnr4SbyH6DNnpWdt?filename=0-PUG.json"


def deploy():
    account = get_account()
    lovelock = LoveLock.deploy({"from": account})
    #tx = lovelock.createLoveLock("tom", "jerry", "nice desc", {"from": account})
    #tx.wait(1)
    print("deployed at: " + lovelock.address)
    
    return lovelock

    #TODO: deploy on polygon and arbitrum testnets, maybe all evm chains?


def main():
    deploy()