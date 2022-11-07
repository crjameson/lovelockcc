import pytest
from brownie import network, LoveLock, convert, chain, exceptions, web3
from scripts.helpful_scripts import fund_with_link, get_account, create_locks, LOCAL_BLOCKCHAIN_ENVIRONMENTS, FORKED_LOCAL_ENVIRONMENTS, get_contract
from web3 import Web3
import json
import base64
import time

import logging
LOGGER = logging.getLogger(__name__)

LOCK_FEE = Web3.toWei(1, "ether")

def test_getCurrentPriceMoney(lovelock_contract, example_lock):
    #only do this on local chains
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    create_locks(lovelock_contract, example_lock, 1)

    # make sure we have a lock and total supply works
    locks_total = lovelock_contract.totalSupply()
    assert locks_total == 1

    # price money should now be 0.6*LOCK_FEE
    currentPriceMoney = lovelock_contract.getCurrentPriceMoney()
    assert currentPriceMoney == LOCK_FEE * 0.6

    # now mint a second lock and check the price money doubled
    lovelock_contract.createLoveLock(
            example_lock,
            "some nice nft description",
        {"from": get_account(1),
        "value": LOCK_FEE}
    )

    # make sure we have a lock and total supply works
    locks_total = lovelock_contract.totalSupply()
    assert locks_total == 2

    # price money should now be 0.6*LOCK_FEE
    currentPriceMoney = lovelock_contract.getCurrentPriceMoney()
    assert currentPriceMoney == 2 * LOCK_FEE * 0.6   

def test_contract_has_link_token(lovelock_contract, example_lock):
    #only do this on local chains
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    # we need link token on the contract address before we can call randomness
    tx = fund_with_link(lovelock_contract)
    tx.wait(1)
    link_contract = get_contract("link_token")
    balance = link_contract.balanceOf(lovelock_contract.address)
    # make sure there is enough link to pay the fees
    assert balance >= 100000000000000000

def test_dev_gets_paid(lovelock_contract, example_lock):
    #only do this on local chains
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    create_locks(lovelock_contract, example_lock, 6)

    # make sure we have a lock and total supply works
    locks_total = lovelock_contract.totalSupply()
    assert locks_total == 6

    contract_balance = 6 * LOCK_FEE
    current_price_money = lovelock_contract.getCurrentPriceMoney()
    expected_dev_money = contract_balance - current_price_money
    previous_owner_account_balance = web3.eth.get_balance(get_account(0).address)

    # we need link token on the contract address before we can call randomness
    tx = fund_with_link(lovelock_contract)
    tx.wait(1)

    end_tx = lovelock_contract.endRaffle()
    end_tx.wait(1)

    # make sure the dev got paid his share - owner of contract got paid 
    current_owner_account_balance = web3.eth.get_balance(get_account(0).address)

    assert current_owner_account_balance > previous_owner_account_balance

def test_winner_can_claim(lovelock_contract, example_lock):
    #only do this on local chains
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    create_locks(lovelock_contract, example_lock, 6)

    # make sure we have a lock and total supply works
    locks_total = lovelock_contract.totalSupply()
    assert locks_total == 6

    # we need link token on the contract address before we can call randomness
    tx = fund_with_link(lovelock_contract)
    tx.wait(1)

    end_tx = lovelock_contract.endRaffle()
    end_tx.wait(1)

    LOGGER.info("events: " + str(end_tx.events))
    # find request id from the events
    request_id = end_tx.events["RequestedRandomness"]["requestId"]
    # fake the callback from the chainlink node with random number 777, whenever there is a state change -> pass account
    # 777 % 6 = 3 -> so account 4 should win
    get_contract("vrf_coordinator").callBackWithRandomness(
        request_id, 777, lovelock_contract.address, {"from": get_account(0)}
        )

    # make sure the raffle endet
    assert lovelock_contract.raffle_state() == 0

    acc = ""
    for i in range(6):
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

