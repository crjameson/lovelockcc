
import { Outlet, Route, Routes, Link, Switch } from "react-router-dom"
import React, {useEffect, useState} from 'react';
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useContractRead
} from 'wagmi';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import config_file from "../Config/Config.json";
import CountdownTimer from "../components/Countdown.js";
import { Row, Col, Container } from 'react-bootstrap'

const Raffle = () => {
    const { address, isConnected } = useAccount()
    const [user_won, setUserwon] = useState(false);
    const [last_pricepot, setlast_pricepot] = useState(0);
    const [current_pricepot, setcurrent_pricepot] = useState(0);
    const [Date_end, setDate_end] = useState("01.12.2022 6PM UTC");
    const { datareadfirst, isErrorreadfirst, isLoadingreadfirst } = useContractRead({
        address: config_file.contract_address,

        abi: [
            {
                name: 'getCurrentPriceMoney',
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
        functionName: 'getCurrentPriceMoney',
        args: [],
        overrides: {
            from: address
        },
        onSuccess(data) {

            console.log("getCurrentPriceMoney Data: ", JSON.parse(data) /1000000000000000000);
            setcurrent_pricepot(JSON.parse(data) /1000000000000000000);

        },
        onError(error) {
            console.log('Error', error)

        },
    })
    const { datalastprice, datalastpriceError, datalastpriceisLoading } = useContractRead({
        address: config_file.contract_address,

        abi: [
            {
                name: 'getRecentPriceMoney',
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
        functionName: 'getRecentPriceMoney',
        args: [],
        overrides: {
            from: address
        },
        onSuccess(data) {

            console.log("getRecentPriceMoney Data: ", (JSON.parse(data)));
            setlast_pricepot((JSON.parse(data)/1000000000000000000));

        },
        onError(error) {
            console.log('Error', error)

        },
    })
    const { haswonread, haswonError, haswonisLoading } = useContractRead({
        address: config_file.contract_address,

        abi: [
            {
                name: 'hasWon',
                type: 'function',
                stateMutability: 'view',
                inputs: [],
                outputs: [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
            },
        ],
        functionName: 'hasWon',
        args: [],
        overrides: {
            from: address
        },
        onSuccess(data) {
            if (address != undefined)
            {
                console.log("hasWon Data: ", (JSON.parse(data)));
                setUserwon(JSON.parse(data));
            }


        },
        onError(error) {
            console.log('Error', error)

        },
    })
    const { data, write } = useContractWrite(
        {
            mode: 'recklesslyUnprepared',
            address: config_file.contract_address,
            abi: [
                {
                    name: 'claimPriceMoney',
                    type: 'function',
                    stateMutability: 'payable',
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
            functionName: 'claimPriceMoney',
            overrides: {
                from: address,
            },

            args: [],

            //args: [[bg1.substring(1), bg2.substring(1), bg3.substring(1), Locktype.toString(), Keyholetype.toString(), lockcolor.substring(1), NameText, text_color.substring(1), ,dateVal.toString(), date_color.substring(1)], NftDescription],
            onSuccess(data) {
                console.log('Claiming Success!', data)
            },
            onSettled(data, error) {
                console.log('Settled', { data, error })
            }
        })

    useEffect(() => {


        var DateObj = new Date()
        var months = DateObj.getMonth();

        // Printing month.
        console.log(DateObj);
        console.log(months);
    });
    return (
        <Container className="home p-1 p-lg-5 pt-lg-2 my-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="text-center display-5 fw-bold">Win the <span className="spanlove">Love</span>Lock Jackpot</h1>
                <CountdownTimer />
                <Row className="align-items-center justify-content-center">
                    <Col md={8}><p className="col-md-12 fs-5">By minting your own customized NFT, you automatically participate in the LoveLock Raffle. Every Month a random winner is choosen by the system.</p>
                        </Col>
                </Row>

                <Row className="align-items-center justify-content-center">
                    <Col md={8}><p className="col-md-12 fs-5">For the current Contest the Winner gets {current_pricepot.toFixed(3)} Matic.</p>
                    </Col>
                </Row>

                <Row className="align-items-center justify-content-center">
                    <Col md={8}><p className="col-md-12 fs-5">Last Month the Jackpot was {last_pricepot.toFixed(3)} Matic.</p>
                    </Col>
                </Row>

                {user_won && (
                    <>
                        <p className="col-md-12 fs-5">Congratulations! You Won the Jackpot! Claim your {last_pricepot.toFixed(3)} Matic.</p>
                            <button className="btn btn-primary btn-lg" onClick={() => write?.()}>Claim Jackpot</button>
                        </>
                )}

            </div>
        </Container>


    );
}
export default Raffle
