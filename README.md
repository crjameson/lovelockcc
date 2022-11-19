# lovelockcc

## The Idea

Video demonstration: https://www.youtube.com/watch?v=j7Wts1P6F1g 
Testnet/Live site: https://lovelock.cc 

You have probably already seen them on bridges all over the world, padlocks which significant others lock to a bridge to seal their love. The history of these love locks dates back over 100 years to Serbia but has quickly spread worldwide. These little locks are a beautiful romantic gesture and the perfect gift for your anniversary, wedding or valentines day.

But they also have their caveats. There was the story of the famous Pont des Arts bridge in Paris which collapsed under the weight of 45 tons of love locks and some municipal authorities treat them as vandalism and remove them.

So the basic idea of this little website is to put that romantic love lock gesture on the blockchain which makes it really immutable, undestroyable and forever. No waste, no pollution of the environment and no way to remove it. A bit nerdy but certainly a very special gift for your loved ones.

hint!!!!: this is actually a serious commitment! you life on the blockchain forever! no divorce possible :D

biiig thanks to https://www.oniichain.com/ ... amazing on chain nft art, and good inspiration :o 

all brownie and nft basics from here https://www.youtube.com/watch?v=M576WGiDBdQ , best video ever 

-------------------------

## Backend

For the local Backend: Install and setup ganache-cli (nvm version 16.15.1)

Setup a python3 virtual environment:

python3 -m venv llvenv
source llvenv/bin/activte
pip install -r requirements.txt

For the local unit tests written in python / eth-brownie running with ganache-cli: 

brownie test -k test_lockSVG4 -s

Local tests with mainnet fork:
brownie test tests/test_ll.py::test_get_lock_fee -o log_cli=true --log-cli-level=DEBUG --network polygon-main-fork

To deploy on polygon testnet Mumbai:
Hint: Make sure to have the polygon addon enabled in Infura! (needs CC)

Create and configure an account either in the .env file or in brownie:

brownie accounts generate deployment_account
brownie accounts list

brownie run scripts/deploy.py --network polygon-test 

Get the latest deployed contract in Brownie console:

brownie console --network polygon-test
Brownie v1.19.2 - Python development framework for Ethereum

LovelockccProject is the active project.
Brownie environment is ready.
>>> Contract("0xeb3039Ac7dD83Bc6cf0e6b4EaCb4752AfE433993")

## Frontend

Frontend runs on React:

nvm install
nvm start

## Testnet
- Make sure to have some testnet Matic in your Wallet: https://faucet.polygon.technology/
- Make sure the deployed contract has some testnet Link token for the raffle: you can get testnet link in the above faucet as well
- Latest deployed contract: 0xeb3039Ac7dD83Bc6cf0e6b4EaCb4752AfE433993
- Testnet explorer: https://mumbai.polygonscan.com/address/0xeb3039Ac7dD83Bc6cf0e6b4EaCb4752AfE433993


