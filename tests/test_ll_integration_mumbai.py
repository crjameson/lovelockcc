import pytest
from brownie import network, LoveLock, convert, chain, exceptions, web3
from scripts.helpful_scripts import fund_with_link, get_account, LOCAL_BLOCKCHAIN_ENVIRONMENTS, FORKED_LOCAL_ENVIRONMENTS, get_contract
from web3 import Web3
import json
import base64
import time

def test_winner_can_claim_testnet(lovelock_contract, example_lock):