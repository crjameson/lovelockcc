from web3 import Web3, HTTPProvider
import json

w3 = Web3(HTTPProvider('http://127.0.0.1:8545'))
# ethereum block details: https://levelup.gitconnected.com/exploring-the-ethereum-block-9fa3a68e42d8

block = json.loads(w3.toJSON(w3.eth.getBlock(102, True)))

