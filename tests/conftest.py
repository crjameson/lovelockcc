from scripts.helpful_scripts import (
    LOCAL_BLOCKCHAIN_ENVIRONMENTS,
)
from brownie import network
from scripts.deploy import deploy_lovelock
import pytest


@pytest.fixture()
def lovelock_contract():
    return deploy_lovelock()

@pytest.fixture()
def example_lock():
    return ["636363",\
            "CFCFCF",\
            "ABABAB",\
            "FF0000",\
            "00FF00",\
            "0000FF",\
            "hello world",\
            "FF0000",\
            "FFFFFF",\
            "25.05.1928",\
            "000000"]