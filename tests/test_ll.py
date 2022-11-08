import pytest
from brownie import network, LoveLock, convert, chain, exceptions
from scripts.helpful_scripts import get_account, create_locks, LOCAL_BLOCKCHAIN_ENVIRONMENTS, FORKED_LOCAL_ENVIRONMENTS
from web3 import Web3
import json
import base64

import logging
LOGGER = logging.getLogger(__name__)

LOCK_FEE = 0.1 * (10**18)

def test_cant_create_nft_not_enough_matic(lovelock_contract, example_lock):
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
    assert lovelock_contract.ownerOf(1) == get_account()
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
    assert lockId == 1

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

    nft_string = lovelock_contract.tokenURI(1)
    #nft_json = json.loads(nft_string)
    LOGGER.debug("nft string: " + nft_string)
    decodedBytes = base64.b64decode(nft_string.split(",")[1])
    decodedStr = decodedBytes.decode("ascii") 
    LOGGER.debug("ascii string: " + str(decodedStr))
    json_data=json.loads(decodedStr)
    LOGGER.debug("json string: " + str(json_data))
    decodedBytes = base64.b64decode(json_data["image"].split(",")[1])
    decodedStr = decodedBytes.decode("ascii") 
    LOGGER.debug("image: " + str(decodedStr))

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

    nft_string = lovelock_contract.tokenURI(1)
    #nft_json = json.loads(nft_string)
    LOGGER.debug("nft string: " + nft_string)
    decodedBytes = base64.b64decode(nft_string.split(",")[1])
    decodedStr = decodedBytes.decode("ascii") 
    LOGGER.debug("ascii string: " + str(decodedStr))
    json_data=json.loads(decodedStr)
    LOGGER.debug("json string: " + str(json_data))
    decodedBytes = base64.b64decode(json_data["image"].split(",")[1])
    decodedStr = decodedBytes.decode("ascii") 
    LOGGER.debug("image: " + str(decodedStr))

def test_get_lock_fee(lovelock_contract):
    #only do this on local chains
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    # current matic / usd price is around 1.16
    #lock price is 1 USD
    # 1 / 1.16 = 8.62, so assert is between 8 and 9
    #TODO: check this ... 
    expected_entrance_fee_min = Web3.toWei(0.008, "ether")
    expected_entrance_fee_max = Web3.toWei(0.02, "ether")
    lock_fee = lovelock_contract.getLockFee()
    # Assert
    # assert 834724540901502504 > 8000000000000000000
    # assert 10000000000000000 > 80000000000000000
    assert lock_fee > expected_entrance_fee_min
    assert lock_fee < expected_entrance_fee_max

def test_getMyLock(lovelock_contract, example_lock):
    #only do this on local chains
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    create_locks(lovelock_contract, example_lock, 4)

    for i in range(4):
        acc = get_account(i)
        lock_id = lovelock_contract.getMyLock({"from": acc})
        LOGGER.info("lock id: " + str(lock_id) + " for acc: " + acc.address)
        assert lock_id == i+1 
        
