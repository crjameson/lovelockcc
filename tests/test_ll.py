import pytest
from brownie import network, LoveLock, convert, chain
from scripts.helpful_scripts import get_account
import json
import base64

import logging
logging.basicConfig(level=logging.DEBUG)

def test_can_create_nft():
    if network.show_active() not in ["development"] or "fork" in network.show_active():
        pytest.skip("Only for local testing")

    ll_contract = LoveLock.deploy(
        {"from": get_account()}
    )

    ll_contract.createLoveLock(
            ["636363",\
            "CFCFCF",\
            "ABABAB",\
            "FF0000",\
            "00FF00",\
            "0000FF",\
            "hello world",\
            "FF0000",\
            "FFFFFF",\
            "25.05.1928",\
            "000000"],
            "some nice nft description",
        {"from": get_account()}
    )
    assert ll_contract.ownerOf(0) == get_account()

    nft_string = ll_contract.tokenURI(0)
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

    #TODO: make more tests, for the attributes and so