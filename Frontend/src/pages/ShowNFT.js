import * as React from 'react'
import { useState, useEffect } from "react";
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useContractRead
} from 'wagmi'

import BigNumber from "bignumber.js";
import arrow from "../Assets/left-arrow-svgrepo-com.svg";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import config_file from "../Config/Config.json";
import { Card, Container, Row } from 'react-bootstrap';
import '../scss/shownft.scss'

export function ShowNFT() {
    const [locks, setLocks] = useState([]);
    const [nftJson, setNFTJSON] = useState();
    const [elementLoaded, setelementLoaded] = useState(false);
    const [lockid, setlockid] = useState(0);
    const { address, isConnected } = useAccount()



    const { datareadfirst, isErrorreadfirst, isLoadingreadfirst } = useContractRead({
        address: config_file.contract_address,

        abi: [
            {
                name: 'getMyLock',
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
        functionName: 'getMyLock',
        args: [],
        overrides: {
            from: address
        },
        onSuccess(data) {

            console.log("getMyLock Data: ", data);
            setlockid(JSON.parse(data));
            setelementLoaded(true);
        },
        onError(error) {
            console.log('Error', error)
            setelementLoaded(true);

            // setlockid(0);
        },
    })
    const { dataread, isErrorread, isLoadingread } = useContractRead({
        address: config_file.contract_address,
        abi: [
            {
                name: 'tokenURI',
                type: 'function',
                stateMutability: 'view',
                inputs: [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                outputs: [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
            },
        ],
        functionName: 'tokenURI',
        args: [lockid],
        onSuccess(data) {
            let tmp_json = JSON.parse(atob(data.slice(29)));
            if (lockid > 0) {
                console.log(atob(tmp_json["image"].slice(26)));
                setNFTJSON(atob(tmp_json["image"].slice(26)));
            }
            //console.log(atob(tmp_json["image"].slice(26)));
            //
            //document.getElementById("wrapper").innerHTML = nftJson

            setelementLoaded(true);
        },
    })
    const { datareadcount, isErrorreadcout, isLoadingreadc } = useContractRead({
        address: config_file.contract_address,
        abi: [
            {
                name: 'tokenCounter',
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
        functionName: 'tokenCounter',
        args: [],
        onSuccess(data) {

            //            console.log("Token counter: ", JSON.parse(data));
            console.log("Token counter: ", data);
            //console.log(atob(tmp_json["image"].slice(26)));
            //
            //document.getElementById("wrapper").innerHTML = nftJson
        },
    })



    if (elementLoaded) {
        return (
            <Container className="show-nft">

                {lockid > 0 ?
                    (
                        <div>
                            <h2 className='h2 mb-4'>Your <span>Love</span>Lock</h2>

                            <div className='card-container'>
                                <Card>
                                    <Card.Body>
                                        <div id="wrapper" dangerouslySetInnerHTML={{ __html: nftJson }}></div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    )

                    : (
                        <div className="row">
                            <div className="col flex-column">
                                <h4>Seems like you don't have a Love Lock NFT yet.</h4>
                            </div>
                        </div>
                    )}


            </Container>
        )
    }
}