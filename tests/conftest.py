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
    return ["fff",\
            "d1d1d1",\
            "b3b3b3",\
            0,\
            0,\
            "9A9A9A",\
            "hello world",\
            "111111",\
            "25.05.1928",\
            "111111"]