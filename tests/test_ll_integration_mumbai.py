import pytest
from brownie import network, LoveLock, convert, chain, exceptions, web3
from scripts.helpful_scripts import fund_with_link, create_locks, get_account, LOCAL_BLOCKCHAIN_ENVIRONMENTS, FORKED_LOCAL_ENVIRONMENTS, get_contract
from web3 import Web3
import json
import base64
import time

import logging
LOGGER = logging.getLogger(__name__)

LOCK_FEE = Web3.toWei(0.1, "ether")

def test_winner_can_claim_testnet(lovelock_contract, example_lock):
    #only do this on local chains
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    ll_tx = lovelock_contract.createLoveLock(
            example_lock,
            "some nice nft description",
        {"from": get_account(0),
        "value": LOCK_FEE}
    )
    ll_tx.wait(1)
    # wait 60 seconds till the lock is created?
    time.sleep(60)

    assert lovelock_contract.ownerOf(0) == get_account()
    # make sure we have a lock and total supply works
    locks_total = lovelock_contract.totalSupply()
    assert locks_total == 1

    # we need link token on the contract address before we can call randomness
    tx = fund_with_link(lovelock_contract)
    tx.wait(1)

    end_tx = lovelock_contract.endRaffle({"from": get_account(0)})
    end_tx.wait(1)
    time.sleep(60)

    LOGGER.info("events: " + str(end_tx.events))

    # make sure the raffle endet
    assert lovelock_contract.raffle_state() == 0

    acc = ""
    for i in range(1):
        acc = get_account(i)
        won = lovelock_contract.hasWon({"from": acc})
        LOGGER.info("account: " + acc.address + " hasWon(): " + str(won))
        if won:
            break
    
    LOGGER.info("winner: " + acc.address + " can claim: " + str(lovelock_contract.getCurrentPriceMoney()))
    current_balance = web3.eth.get_balance(acc.address)
    tx = lovelock_contract.claimPriceMoney({"from": acc})
    tx.wait(1)
    new_balance = web3.eth.get_balance(acc.address)

    # make sure he got the money
    assert new_balance > current_balance
