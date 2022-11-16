import * as React from 'react'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useContractRead
} from 'wagmi'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import "./scss/mint.scss";
import preview from "./Assets/svgviewer-output.svg";
import BigNumber from "bignumber.js";

const customStyles = {
    content: {
    },
};
export function MintNFT() {
    const [lovetext, setlovetext] = useState("Lars ist der Beste");
    const [lovedate, setlovedate] = useState("11.11.2022");
    const [lockprice, setLockprice] = useState("");
    //const { data, write } = useContractWrite(config)
    const { address, isConnected } = useAccount()
    const [modalIsOpen, setIsOpen] = useState(false);

    const [lockselected, setLockselected] = useState(1);


    const { datareader, isErrorreader, isLoadingreader } = useContractRead({
        address: '0xD32b8896517537467f0e3AEDf093D27554afb60b',
        abi: [
            {
                name: 'getLockFee',
                type: 'function',
                stateMutability: 'view',
                inputs: [],
                outputs: [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
            },
        ],
        functionName: 'getLockFee',
        args: [],
        onSuccess(data) {
            //let tmp_json  = JSON.parse(atob(data.slice(29)));
            setLockprice(BigNumber(JSON.parse(data)));
            console.log("Lock Price: ", BigNumber(JSON.parse(data)));
            console.log("ETH Adress: ", address);

        },
    })

    const { data, write } = useContractWrite(
        {
            mode: 'recklesslyUnprepared',
            address: '0xD32b8896517537467f0e3AEDf093D27554afb60b',
            abi: [
                {
                    name: 'createLoveLock',
                    type: 'function',
                    stateMutability: 'payable',
                    inputs: [
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "bg1",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "bg2",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "bg3",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "lc1",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "lc2",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "lc3",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "text",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "tc1",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "tc2",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "date",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "dc1",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct NFTGenerator.SVGParams",
                            "name": "svgparams",
                            "type": "tuple"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        }
                    ],
                    outputs: [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                },
            ],
            functionName: 'createLoveLock',
            overrides: {
                from: address,
                value: lockprice.toString(),
            },
            args: [["636363", "CFCFCF", "ABABAB", "FF0000", "00FF00", "0000FF", lovetext, "FF0000", "FFFFFF", lovedate.toString(), "000000"], lovetext],
            onSuccess(data) {
                console.log('Success', data)
            },
            onSettled(data, error) {
                console.log('Settled', { data, error })
            }
        })
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash, });

    useEffect(() => {

    }, [lockselected]);
    let subtitle;
    function openModal() {
        setIsOpen(true);

    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.

    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div className='mint'>

            <button className="btn btn-primary btn-lg" onClick={openModal} disabled={!isConnected} >{isConnected ? 'Mint your NFT now' : 'Connect your Wallet to Mint your custom NFT'}</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                className="Modal"
                ariaHideApp={false}
                contentLabel="Example Modal">
                <header >
                    <span onClick={() => closeModal()}
                        className="close-button topright">&times;</span>
                </header>
                {isSuccess == true ? (
                    <div className="container">
                        <div className="row">
                            <div className="col flex-column items-center"><h1>Successfully minted your NFT!</h1></div></div>
                        <div className="row">
                            <div className="col flex-column items-center alignment"><button className="btn btn-primary btn-lg alignment" type="button" onClick={() => { closeModal(); }}>Show me my Lock</button></div>
                        </div>


                    </div>
                ) : isLoading == true ?

                    (
                        <div className="container">
                            <div className="row">
                                <div className="col flex-column items-center"><h1>Minting your NFT..</h1></div></div>

                        </div>

                    ) : (
                        <div className="container choosecontainer">
                            <div className="row alignment mt-3">

                                <div className="col alignment"><h1 className="display-5 fw-bold">Mint your own <span className="spanlove">Love</span>Lock</h1></div>
                            </div>
                            <div className="row alignment mt-3">

                                <div className="col order-1 alignment"><input type="radio" name="card" id="card_one" />
                                    <label htmlFor="card_one">
                                        <div className="card" onClick={() => { setLockselected(1); }}>
                                            <span className="check_btn"><i className="fas fa-check"></i></span>
                                            <div className="imgdiv">
                                                <img className="imgselect" src={preview} alt="" />

                                            </div>
                                            <h2 className="title">Silver Lock</h2>
                                            <ul>
                                                <li>Color: <span>Silver</span></li>
                                                <li>Price: <span>10 USD</span></li>

                                            </ul>
                                        </div>
                                    </label></div>

                                <div className="col order-2 alignment"><input type="radio" name="card" id="card_two" />
                                    <label htmlFor="card_two">
                                        <div className="card" onClick={() => { setLockselected(2); }}>
                                            <span className="check_btn"><i className="fas fa-check"></i></span>
                                            <div className="imgdiv">
                                                <img className="imgselect" src={preview} alt="" />
                                            </div>
                                            <h2 className="title">Gold Lock</h2>
                                            <ul>
                                                <li>Color: <span>Gold</span></li>
                                                <li>Price: <span>20 USD</span></li>

                                            </ul>
                                        </div>
                                    </label></div>
                                <div className="col order-3 alignment">
                                    <input type="radio" name="card" id="card_three" />





                                    <label htmlFor="card_three">
                                        <div className="card" onClick={() => { setLockselected(3); }}>
                                            <span className="check_btn"><i className="fas fa-check"></i></span>
                                            <div className="imgdiv">
                                                <img className="imgselect" src={preview} alt="" />
                                            </div>
                                            <h2 className="title">Diamond Lock</h2>
                                            <ul>
                                                <li>Color: <span>Diamond</span></li>
                                                <li>Price: <span>50 USD</span></li>

                                            </ul>
                                        </div>
                                    </label></div>

                            </div>


                            <div className="row alignment mt-3">
                                <div className="col alignment">
                                    <form className="form-inline">
                                        <div className="form-row  mt-4">
                                            <div className="form-group col alignment">
                                                <h2>Customize your NFT</h2>
                                            </div>
                                        </div>
                                        <div className="form-row  mt-4">
                                            <div className="form-group col alignment">
                                                <label htmlFor="inputEmail4">Love Message </label>
                                                <input type="text" className="form-control" id="inputEmail4"
                                                    placeholder="I Love you" />
                                            </div>
                                        </div>
                                        <div className="form-row  mt-2">
                                            <div className="form-group col alignment">
                                                <label htmlFor="inputPassword4">Anniversary Date </label>
                                                <input type="date" className="form-control" id="inputPassword4"
                                                    placeholder="text" />
                                            </div>
                                        </div>
                                        <div className="form-row mt-3">
                                            <div className="form-group col alignment">
                                                <button className="btn btn-primary btn-lg" type="button" disabled={!isConnected} onClick={() => write?.()}>
                                                    {isLoading ? 'Minting...' : 'Mint Now'}
                                                </button>
                                            </div>


                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}


            </Modal>

        </div>
    )
}

