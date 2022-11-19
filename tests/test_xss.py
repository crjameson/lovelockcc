import pytest
from brownie import network, LoveLock, convert, chain, exceptions
from scripts.helpful_scripts import get_account, create_locks, LOCAL_BLOCKCHAIN_ENVIRONMENTS, FORKED_LOCAL_ENVIRONMENTS
from web3 import Web3
from scripts.deploy import deploy_xss_filter


import logging
LOGGER = logging.getLogger(__name__)

# change visibility to public before running this test - or make a testcontract

def test_xss_filter():
    #only do this on local chains
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()

    xss_filter = deploy_xss_filter()

    assert xss_filter.validateString("<script> evil") == False
    assert xss_filter.validateString("good") == True
