import pytest
from brownie import network, LoveLock, convert, chain, exceptions
from scripts.helpful_scripts import get_account, create_locks, LOCAL_BLOCKCHAIN_ENVIRONMENTS, FORKED_LOCAL_ENVIRONMENTS
from web3 import Web3
import json
import base64

import logging
LOGGER = logging.getLogger(__name__)

LOCK_FEE = 0.12 * (10**18) + 1000

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

def test_lockSVG1(lovelock_contract, example_lock):
    #only do this on local chains
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    test_lock_grey_square_heart_lock = ["fff",\
            "d1d1d1",\
            "b3b3b3",\
            0,\
            1,\
            "9A9A9A",\
            "hello world",\
            "111111",\
            "25.05.1928",\
            "111111"]  

    lovelock_contract.createLoveLock(
            test_lock_grey_square_heart_lock,
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

    assert TEST_IMAGE_SQUARE_SILVER_HEART_LOCK == decodedStr

def test_lockSVG2(lovelock_contract, example_lock):
    #only do this on local chains
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    test_lock_grey_heart_normal_lock = ["fff",\
            "d1d1d1",\
            "b3b3b3",\
            1,\
            0,\
            "9A9A9A",\
            "hello world",\
            "111111",\
            "25.05.1928",\
            "111111"]  

    lovelock_contract.createLoveLock(
            test_lock_grey_heart_normal_lock,
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

    assert TEST_IMAGE_HEART_SILVER_NORMAL_LOCK == decodedStr


def test_lockSVG3(lovelock_contract, example_lock):
    #only do this on local chains
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    test_lock_grey_heart_normal_lock = ["fff",\
            "ff000",\
            "ff3333",\
            1,\
            1,\
            "ff0000",\
            "hello world",\
            "ff0000",\
            "25.05.1928",\
            "ff0000"]  

    lovelock_contract.createLoveLock(
            test_lock_grey_heart_normal_lock,
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
    #lock price is 0.1 USD
    # 0.1 / 0.9 = 8.62, so assert is between 8 and 9
    #TODO: check this ... 
    expected_entrance_fee_min = Web3.toWei(0.1, "ether")
    expected_entrance_fee_max = Web3.toWei(0.2, "ether")
    lock_fee = lovelock_contract.getLockFee()
    LOGGER.info("lock_fee: " + str(lock_fee))
    #10000000000000000
    #111111111111111111
    #107847861308426860
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
        


TEST_IMAGE_SQUARE_SILVER_HEART_LOCK = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 420" xml:space="preserve"><radialGradient id="a" cx="210" cy="210" r="210" gradientTransform="matrix(1 0 0 -1 0 420)" gradientUnits="userSpaceOnUse"><stop offset=".19" style="stop-color:#fff"/><stop offset=".688" style="stop-color:#d1d1d1"/><stop offset=".971" style="stop-color:#b3b3b3"/></radialGradient><path fill="url(#a)" d="M0 0h420v420H0V0z"/><path fill="#666" d="M132 138.5V99.2c0-43 35-78 78-78s78 35 78 78v39.3h-.6V99.2c0-42.7-34.7-77.4-77.4-77.4s-77.4 34.7-77.4 77.4v39.3h-.6z"/><path fill="#333" d="M136.5 138.5s-.1-38.7-.1-39.3c0-40.5 33-73.5 73.5-73.5 40.9 0 73.6 33 73.6 73.5 0 .6-.1 39.3-.1 39.3h-3s.1-38.7.1-39.3c0-38.9-31.7-70.7-70.7-70.7-38.9 0-70.7 31.7-70.7 70.7 0 .6.1 39.3.1 39.3h-2.7z"/><path fill="#737373" d="M146.7 138.5V99.2c0-34.9 28.3-63.2 63.2-63.2s63.2 28.3 63.2 63.2c0 .6-.1 39.3-.1 39.3h-1.5s.1-38.7.1-39.3c0-34-27.7-61.7-61.7-61.7-33.7 0-61.6 27.7-61.6 61.7 0 .6.1 39.3.1 39.3h-1.7z"/><path fill="#F2F2F2" d="M141.2 138.5s-.1-38.7-.1-39.3c0-38 30.9-68.9 68.9-68.9s68.9 30.9 68.9 68.9c0 .6-.1 39.3-.1 39.3h-1.7s.1-38.7.1-39.3c0-37-30.1-67.2-67.2-67.2-37 0-67.2 30.1-67.2 67.2 0 .6.1 39.3.1 39.3h-1.7z"/><path fill="#BCBCBC" d="M132.6 138.5V99.2c0-42.7 34.7-77.4 77.4-77.4s77.4 34.7 77.4 77.4v39.3h-3.9s.1-38.7.1-39.3c0-40.5-33-73.5-73.5-73.5s-73.5 33-73.5 73.5c0 .6.1 39.3.1 39.3h-4.1z"/><path fill="#CCC" d="M150.9 138.5s-.1-38.7-.1-39.3c0-32.7 26.6-59.3 59.2-59.3s59.2 26.6 59.2 59.3c0 .6-.1 39.3-.1 39.3h-1.7s.1-38.7.1-39.3c0-31.7-25.8-57.5-57.5-57.5s-57.5 25.8-57.5 57.5c0 .6.1 39.3.1 39.3h-1.7z"/><path fill="#999" d="M154.3 138.5s-.1-38.7-.1-39.3c0-30.7 25.1-55.8 55.8-55.8s55.8 25.1 55.8 55.8c0 .6-.1 39.3-.1 39.3h-1.1V99.2c0-30.2-24.5-54.7-54.7-54.7S155.2 69 155.2 99.2v39.3h-.9z"/><path fill="#D0D0D0" d="M141.2 138.5s-.1-38.7-.1-39.3c0-38 30.9-68.9 68.9-68.9s68.9 30.9 68.9 68.9c0 .6-.1 39.3-.1 39.3h1.9s.1-38.7.1-39.3c0-38.9-31.7-70.7-70.7-70.7-38.9 0-71 31.7-71 70.7 0 .6.1 39.3.1 39.3h2z"/><path fill="#7F7F7F" d="M145.1 138.5s-.1-38.7-.1-39.3c0-35.9 29.1-65 65-65s65 29.1 65 65c0 .6-.1 39.3-.1 39.3H273s.1-38.7.1-39.3c0-34.9-28.5-63.2-63-63.2-34.9 0-63.2 28.3-63.2 63.2v39.3h-1.8z"/><path fill="#E2E2E2" d="m142.9 138.5-.1-39.3c0-37 30.1-67.2 67.2-67.2 37 0 67.2 30.1 67.2 67.2 0 .6-.1 39.3-.1 39.3h-2.2s.1-38.7.1-39.3c0-35.9-29.1-65-65-65s-65 29.1-65 65l.1 39.3h-2.2z"/><path fill="#ADADAD" d="M152.6 138.5s-.1-38.7-.1-39.3c0-31.7 25.8-57.5 57.5-57.5s57.5 25.8 57.5 57.5c0 .6-.1 39.3-.1 39.3h-1.8s.1-38.7.1-39.3c0-30.7-25.1-55.8-55.8-55.8s-55.8 25.1-55.8 55.8c0 .6.1 39.3.1 39.3h-1.6z"/><path fill="#848484" d="M150 138.5s-.1-38.7-.1-39.3c0-33.1 27-60.1 60.1-60.1s60.1 27 60.1 60.1c0 .6-.1 39.3-.1 39.3h1.6s.1-38.7.1-39.3c0-34-27.7-61.7-61.7-61.7s-61.7 27.7-61.7 61.7c0 .6.1 39.3.1 39.3h1.6z"/><path fill="#B5B5B5" d="M150 138.5s-.1-38.7-.1-39.4c0-33.1 27-60.1 60.1-60.1s60.1 27 60.1 60.1c0 .6-.1 39.4-.1 39.4h-.9s.1-38.7.1-39.4c0-32.7-26.6-59.2-59.2-59.2s-59.2 26.6-59.2 59.2c0 .6.1 39.4.1 39.4h-.9z"/><path fill="#9A9A9A" d="M298.4 138.5H120.9c-1.6 0-2.9 1.3-2.9 2.9v159.8c0 1.6 1.3 2.9 2.9 2.9h177.5c1.6 0 2.9-1.3 2.9-2.9V141.4c0-1.6-1.3-2.9-2.9-2.9z"/><linearGradient id="b" gradientUnits="userSpaceOnUse" x1="118" y1="221.3" x2="301.3" y2="221.3"><stop offset="0" style="stop-color:#9c9c9c;stop-opacity:3.000000e-02"/><stop offset=".06" style="stop-color:#fff;stop-opacity:.7"/><stop offset=".1" style="stop-color:#fff;stop-opacity:0"/><stop offset=".484" style="stop-color:#fff;stop-opacity:5.000000e-02"/><stop offset=".9" style="stop-color:#fff;stop-opacity:0"/><stop offset=".94" style="stop-color:#fff;stop-opacity:.7"/><stop offset="1" style="stop-color:#000;stop-opacity:3.000000e-02"/></linearGradient><path fill="url(#b)" d="M298.4 138.5H120.9c-1.6 0-2.9 1.3-2.9 2.9v159.8c0 1.6 1.3 2.9 2.9 2.9h177.5c1.6 0 2.9-1.3 2.9-2.9V141.4c0-1.6-1.3-2.9-2.9-2.9z"/><path opacity=".4" d="M118 300.8v.4c0 1.6 1.3 2.9 2.9 2.9h177.5c1.6 0 2.9-1.3 2.9-2.9v-.4H118z"/><path opacity=".6" fill="#FFF" d="M298.4 138.5H120.9c-1.5 0-2.7 1.1-2.9 2.6h183.3c-.2-1.4-1.4-2.6-2.9-2.6z"/><path fill="#CCC" d="M186.8 224.9c-2.7-2.7-4.1-6.2-4.1-10s1.5-7.4 4.1-10c2.7-2.7 6.2-4.1 10-4.1s7.4 1.5 10 4.1l3.1 3.1 3.1-3.1c2.7-2.7 6.2-4.1 10-4.1s7.4 1.5 10 4.1c2.7 2.7 4.1 6.2 4.1 10s-1.5 7.4-4.1 10L210 248l-23.2-23.1z"/><path d="M223.1 200.8c3.8 0 7.3 1.5 9.9 4.1 5.4 5.5 5.4 14.4 0 19.9l-3 3-20 20-20-20-3-3c-2.6-2.6-4.1-6.2-4.1-9.9 0-3.8 1.5-7.3 4.1-9.9s6.2-4.1 9.9-4.1 7.3 1.5 9.9 4.1l3 3 .2.2.2-.2 3-3c2.6-2.8 6.1-4.2 9.9-4.2m0-.3c-3.7 0-7.4 1.4-10.1 4.2l-3 3-3-3c-2.8-2.8-6.5-4.2-10.1-4.2-3.7 0-7.4 1.4-10.1 4.2-5.6 5.6-5.6 14.7 0 20.3l3 3 20.3 20.3 20.3-20.3 3-3c5.6-5.6 5.6-14.7 0-20.3-3-2.8-6.6-4.2-10.3-4.2z"/><path d="M231.8 206c-2.4-2.4-5.6-3.7-9.1-3.7-3.4 0-6.6 1.3-9.1 3.7l-3.8 3.9-3.9-3.9c-2.4-2.4-5.6-3.7-9.1-3.7-3.4 0-6.6 1.3-9.1 3.7-2.4 2.4-3.7 5.6-3.7 9.1s1.3 6.6 3.7 9.1l22 21.8 21.9-21.9c2.4-2.4 3.7-5.6 3.7-9.1s-1.1-6.6-3.5-9z"/><text x="50%" y="87%" dominant-baseline="middle" text-anchor="middle" style="font-weight:900;font-family:monospace;fill:#111111;font-size:24px">hello world</text><text x="50%" y="94%" dominant-baseline="middle" text-anchor="middle" style="font-weight:700;font-family:monospace;fill:#111111;font-size:12px;stroke:none">25.05.1928</text></svg>'
TEST_IMAGE_HEART_SILVER_NORMAL_LOCK = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 420" xml:space="preserve"><radialGradient id="a" cx="210" cy="210" r="210" gradientTransform="matrix(1 0 0 -1 0 420)" gradientUnits="userSpaceOnUse"><stop offset=".19" style="stop-color:#fff"/><stop offset=".688" style="stop-color:#d1d1d1"/><stop offset=".971" style="stop-color:#b3b3b3"/></radialGradient><path fill="url(#a)" d="M0 0h420v420H0V0z"/><path fill="#666" d="M132 138.5V99.2c0-43 35-78 78-78s78 35 78 78v39.3h-.6V99.2c0-42.7-34.7-77.4-77.4-77.4s-77.4 34.7-77.4 77.4v39.3h-.6z"/><path fill="#333" d="M136.5 138.5s-.1-38.7-.1-39.3c0-40.5 33-73.5 73.5-73.5 40.9 0 73.6 33 73.6 73.5 0 .6-.1 39.3-.1 39.3h-3s.1-38.7.1-39.3c0-38.9-31.7-70.7-70.7-70.7-38.9 0-70.7 31.7-70.7 70.7 0 .6.1 39.3.1 39.3h-2.7z"/><path fill="#737373" d="M146.7 138.5V99.2c0-34.9 28.3-63.2 63.2-63.2s63.2 28.3 63.2 63.2c0 .6-.1 39.3-.1 39.3h-1.5s.1-38.7.1-39.3c0-34-27.7-61.7-61.7-61.7-33.7 0-61.6 27.7-61.6 61.7 0 .6.1 39.3.1 39.3h-1.7z"/><path fill="#F2F2F2" d="M141.2 138.5s-.1-38.7-.1-39.3c0-38 30.9-68.9 68.9-68.9s68.9 30.9 68.9 68.9c0 .6-.1 39.3-.1 39.3h-1.7s.1-38.7.1-39.3c0-37-30.1-67.2-67.2-67.2-37 0-67.2 30.1-67.2 67.2 0 .6.1 39.3.1 39.3h-1.7z"/><path fill="#BCBCBC" d="M132.6 138.5V99.2c0-42.7 34.7-77.4 77.4-77.4s77.4 34.7 77.4 77.4v39.3h-3.9s.1-38.7.1-39.3c0-40.5-33-73.5-73.5-73.5s-73.5 33-73.5 73.5c0 .6.1 39.3.1 39.3h-4.1z"/><path fill="#CCC" d="M150.9 138.5s-.1-38.7-.1-39.3c0-32.7 26.6-59.3 59.2-59.3s59.2 26.6 59.2 59.3c0 .6-.1 39.3-.1 39.3h-1.7s.1-38.7.1-39.3c0-31.7-25.8-57.5-57.5-57.5s-57.5 25.8-57.5 57.5c0 .6.1 39.3.1 39.3h-1.7z"/><path fill="#999" d="M154.3 138.5s-.1-38.7-.1-39.3c0-30.7 25.1-55.8 55.8-55.8s55.8 25.1 55.8 55.8c0 .6-.1 39.3-.1 39.3h-1.1V99.2c0-30.2-24.5-54.7-54.7-54.7S155.2 69 155.2 99.2v39.3h-.9z"/><path fill="#D0D0D0" d="M141.2 138.5s-.1-38.7-.1-39.3c0-38 30.9-68.9 68.9-68.9s68.9 30.9 68.9 68.9c0 .6-.1 39.3-.1 39.3h1.9s.1-38.7.1-39.3c0-38.9-31.7-70.7-70.7-70.7-38.9 0-71 31.7-71 70.7 0 .6.1 39.3.1 39.3h2z"/><path fill="#7F7F7F" d="M145.1 138.5s-.1-38.7-.1-39.3c0-35.9 29.1-65 65-65s65 29.1 65 65c0 .6-.1 39.3-.1 39.3H273s.1-38.7.1-39.3c0-34.9-28.5-63.2-63-63.2-34.9 0-63.2 28.3-63.2 63.2v39.3h-1.8z"/><path fill="#E2E2E2" d="m142.9 138.5-.1-39.3c0-37 30.1-67.2 67.2-67.2 37 0 67.2 30.1 67.2 67.2 0 .6-.1 39.3-.1 39.3h-2.2s.1-38.7.1-39.3c0-35.9-29.1-65-65-65s-65 29.1-65 65l.1 39.3h-2.2z"/><path fill="#ADADAD" d="M152.6 138.5s-.1-38.7-.1-39.3c0-31.7 25.8-57.5 57.5-57.5s57.5 25.8 57.5 57.5c0 .6-.1 39.3-.1 39.3h-1.8s.1-38.7.1-39.3c0-30.7-25.1-55.8-55.8-55.8s-55.8 25.1-55.8 55.8c0 .6.1 39.3.1 39.3h-1.6z"/><path fill="#848484" d="M150 138.5s-.1-38.7-.1-39.3c0-33.1 27-60.1 60.1-60.1s60.1 27 60.1 60.1c0 .6-.1 39.3-.1 39.3h1.6s.1-38.7.1-39.3c0-34-27.7-61.7-61.7-61.7s-61.7 27.7-61.7 61.7c0 .6.1 39.3.1 39.3h1.6z"/><path fill="#B5B5B5" d="M150 138.5s-.1-38.7-.1-39.4c0-33.1 27-60.1 60.1-60.1s60.1 27 60.1 60.1c0 .6-.1 39.4-.1 39.4h-.9s.1-38.7.1-39.4c0-32.7-26.6-59.2-59.2-59.2s-59.2 26.6-59.2 59.2c0 .6.1 39.4.1 39.4h-.9z"/><path fill="#9A9A9A" d="M338.6 177.8c0-.6.1-1.2.1-1.7-.2-1.3-.1-2.5-.2-3.8-.6-32.7-23.9-52.8-41.5-58.1-27.7-8.3-58.9-4.3-77.8 11.6-7.1 6-6 6-9.3 8.6-3.3-2.6-2.3-2.6-9.3-8.6-18.9-15.9-50.1-19.9-77.8-11.6-17.7 5.3-40.9 25.4-41.5 58.1v11.2c.6 17.8 7.9 39.3 26.2 63.8 53.7 72.4 102.2 85.3 102.5 85.3.3-.1 48.8-12.9 102.5-85.3 18.3-24.6 25.6-46 26.2-63.8-.1-.9-.1-1.7-.1-2.5.1-.8.1-1.6.1-2.4 0-.2-.1-.5-.1-.8z"/><linearGradient id="b" gradientUnits="userSpaceOnUse" x1="210" y1="109.984" x2="210" y2="332.6"><stop offset="0" style="stop-color:#f2f2f2;stop-opacity:.5"/><stop offset=".639" style="stop-color:#fff;stop-opacity:0"/></linearGradient><path fill="url(#b)" d="M338.6 177.8c0-.6.1-1.2.1-1.7-.2-1.3-.1-2.5-.2-3.8-.6-32.7-23.9-52.8-41.5-58.1-27.7-8.3-58.9-4.3-77.8 11.6-7.1 6-6 6-9.3 8.6-3.3-2.6-2.3-2.6-9.3-8.6-18.9-15.9-50.1-19.9-77.8-11.6-17.7 5.3-40.9 25.4-41.5 58.1v11.2c.6 17.8 7.9 39.3 26.2 63.8 53.7 72.4 102.2 85.3 102.5 85.3.3-.1 48.8-12.9 102.5-85.3 18.3-24.6 25.6-46 26.2-63.8-.1-.9-.1-1.7-.1-2.5.1-.8.1-1.6.1-2.4 0-.2-.1-.5-.1-.8z"/><linearGradient id="c" gradientUnits="userSpaceOnUse" x1="210" y1="87.3" x2="210" y2="241.3" gradientTransform="matrix(1 0 0 -1 0 420)"><stop offset=".006" style="stop-color:#000"/><stop offset=".141" style="stop-color:#040505"/><stop offset=".294" style="stop-color:#0f1212"/><stop offset=".399" style="stop-color:#1b1f20"/><stop offset=".436" style="stop-color:#56595a"/><stop offset=".492" style="stop-color:#a8aaaa"/><stop offset=".531" style="stop-color:#dcdcdd"/><stop offset=".551" style="stop-color:#f0f0f0"/><stop offset=".685" style="stop-color:#1b1f20"/><stop offset="1" style="stop-color:#000"/></linearGradient><path opacity=".5" fill="url(#c)" d="M312.5 242.5c-53.7 72.4-102.2 85.3-102.5 85.3-.3-.1-48.8-12.9-102.5-85.3-18.3-24.6-25.6-46-26.2-63.8-.6 18.8 6.2 41.8 26.2 68.7 53.7 72.4 102.2 85.3 102.5 85.3.3-.1 48.8-12.9 102.5-85.3 20-26.8 26.8-49.9 26.2-68.7-.6 17.8-7.9 39.2-26.2 63.8z"/><linearGradient id="d" gradientUnits="userSpaceOnUse" x1="81.385" y1="277.558" x2="338.611" y2="277.558" gradientTransform="matrix(1 0 0 -1 0 420)"><stop offset="0" style="stop-color:#000"/><stop offset=".35" style="stop-color:#0f1212"/><stop offset=".45" style="stop-color:#a8aaaa"/><stop offset=".5" style="stop-color:#dcdcdd"/><stop offset=".55" style="stop-color:#f0f0f0"/><stop offset=".65" style="stop-color:#1b1f20"/><stop offset="1" style="stop-color:#000"/></linearGradient><path opacity=".5" fill="url(#d)" d="M122.9 116.8c27.7-8.3 58.9-4.3 77.8 11.6 7.1 6 6 6 9.3 8.6 3.3-2.6 2.3-2.6 9.3-8.6 18.9-15.9 50.1-19.9 77.8-11.6 17.7 5.3 40.9 25.4 41.5 58.1.6-34.3-23.4-55.4-41.5-60.7-27.7-8.3-58.9-4.3-77.8 11.6-7.1 6-6 6-9.3 8.6-3.3-2.6-2.3-2.6-9.3-8.6-18.9-15.9-50.1-19.9-77.8-11.6-18.1 5.4-42.2 26.5-41.5 60.7.5-32.7 23.8-52.9 41.5-58.1z"/><path d="M210 252c-3.1 0-6.1-1.3-8.1-3.6s-3-5.4-2.6-8.4l1.8-16.2c.1-.8-.2-1.6-.8-2.2-2.6-2.6-4.1-6.2-4.1-9.8 0-7.6 6.2-13.8 13.8-13.8h.4c3.5.1 6.9 1.5 9.4 4s4 5.9 4 9.4c.1 3.8-1.4 7.6-4.1 10.2-.6.5-.9 1.3-.8 2.2l1.9 16.2c.4 3.1-.6 6.2-2.6 8.4-2.2 2.3-5.2 3.6-8.2 3.6z"/><path fill="#CCC" d="M209.9 251.6c-3 0-5.8-1.2-7.8-3.5-2-2.2-2.9-5.2-2.5-8.2l1.8-16.2c.1-.9-.2-1.8-.9-2.5-2.6-2.5-4-6-4-9.6 0-7.4 6.1-13.4 13.4-13.4h.4c3.4.1 6.7 1.5 9.1 4 2.5 2.5 3.9 5.7 4 9.1.1 3.7-1.4 7.4-4 9.9-.7.6-1 1.5-.9 2.5l1.9 16.2c.4 3-.6 6-2.5 8.2-2.2 2.2-5.1 3.5-8 3.5z"/><path d="M218.5 220.4c2.3-2.3 3.7-5.5 3.6-9-.2-6.4-5.4-11.6-11.8-11.8-6.8-.2-12.4 5.3-12.4 12 0 3.3 1.4 6.4 3.6 8.6 1 1 1.5 2.3 1.3 3.6L201 240c-.6 5.4 3.6 10.1 9.1 10.1s9.7-4.7 9.1-10.1l-1.9-16.2c-.2-1.2.2-2.6 1.2-3.4z"/><text x="50%" y="87%" dominant-baseline="middle" text-anchor="middle" style="font-weight:900;font-family:monospace;fill:#111111;font-size:24px">hello world</text><text x="50%" y="94%" dominant-baseline="middle" text-anchor="middle" style="font-weight:700;font-family:monospace;fill:#111111;font-size:12px;stroke:none">25.05.1928</text></svg>'