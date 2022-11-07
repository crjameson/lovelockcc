import pytest
from brownie import network, LoveLock, convert, chain, exceptions
from scripts.helpful_scripts import get_account, LOCAL_BLOCKCHAIN_ENVIRONMENTS, FORKED_LOCAL_ENVIRONMENTS
from web3 import Web3
import json
import base64

import logging
logging.basicConfig(level=logging.DEBUG)

LOCK_FEE = Web3.toWei(1, "ether")

def test_can_create_nft_not_enough_matic(lovelock_contract, example_lock):
    #only do this on local chains
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    with pytest.raises(exceptions.VirtualMachineError) as exc:
        lovelock_contract.createLoveLock(
                example_lock,
                "some nice nft description",
            {"from": get_account(),
            "value": 0}
        )
        assert exc.revert_msg == "not enough matic send"
    # make sure we have a lock and total supply works
    locks_total = lovelock_contract.totalSupply()
    assert locks_total == 0

def test_can_create_nft(lovelock_contract, example_lock):
    #only do this on local chains
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    lovelock_contract.createLoveLock(
            example_lock,
            "some nice nft description",
        {"from": get_account(),
        "value": LOCK_FEE}
    )
    assert lovelock_contract.ownerOf(0) == get_account()
    # make sure we have a lock and total supply works
    locks_total = lovelock_contract.totalSupply()
    assert locks_total == 1

def test_getMyLock(lovelock_contract, example_lock):
    #only do this on local chains
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    lovelock_contract.createLoveLock(
            example_lock,
            "some nice nft description",
        {"from": get_account(),
        "value": LOCK_FEE}
    )

    # get the id of my owners account lock
    lockId = lovelock_contract.getMyLock()
    assert lockId == 0

def test_lockAttributes(lovelock_contract, example_lock):
    #only do this on local chains
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    lovelock_contract.createLoveLock(
            example_lock,
            "some nice nft description",
        {"from": get_account(),
        "value": LOCK_FEE}
    )

    nft_string = lovelock_contract.tokenURI(0)
    #nft_json = json.loads(nft_string)
    logging.debug("nft string: " + nft_string)
    decodedBytes = base64.b64decode(nft_string.split(",")[1])
    decodedStr = decodedBytes.decode("ascii") 
    logging.debug("ascii string: " + str(decodedStr))
    json_data=json.loads(decodedStr)
    logging.debug("json string: " + str(json_data))
    decodedBytes = base64.b64decode(json_data["image"].split(",")[1])
    decodedStr = decodedBytes.decode("ascii") 
    logging.debug("image: " + str(decodedStr))

def test_lockSVG(lovelock_contract, example_lock):
    #only do this on local chains
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    lovelock_contract.createLoveLock(
            example_lock,
            "some nice nft description",
        {"from": get_account(),
        "value": LOCK_FEE}
    )

    nft_string = lovelock_contract.tokenURI(0)
    #nft_json = json.loads(nft_string)
    logging.debug("nft string: " + nft_string)
    decodedBytes = base64.b64decode(nft_string.split(",")[1])
    decodedStr = decodedBytes.decode("ascii") 
    logging.debug("ascii string: " + str(decodedStr))
    json_data=json.loads(decodedStr)
    logging.debug("json string: " + str(json_data))
    decodedBytes = base64.b64decode(json_data["image"].split(",")[1])
    decodedStr = decodedBytes.decode("ascii") 
    logging.debug("image: " + str(decodedStr))

def test_get_lock_fee(lovelock_contract):
    #only do this on local chains
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    # current matic / usd price is around 1.16
    #lock price is 1 USD
    # 1 / 1.16 = 8.62, so assert is between 8 and 9
    expected_entrance_fee_min = Web3.toWei(0.8, "ether")
    expected_entrance_fee_max = Web3.toWei(0.9, "ether")
    lock_fee = lovelock_contract.getLockFee()
    # Assert
    # assert 834724540901502504 > 8000000000000000000
    # assert 100000000000000000 > 800000000000000000
    assert lock_fee > expected_entrance_fee_min
    assert lock_fee < expected_entrance_fee_max
