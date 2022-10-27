import * as React from 'react'
import {useState} from "react";
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useContractRead
} from 'wagmi'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function ShowNFT() {

    const [nftJson, setNFTJSON] = useState();

    const { dataread, isErrorread, isLoadingread } = useContractRead({
        address: '0xA48f2591B53A80e260944352A2F232EE04C918fE',
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
        args: [1],
        onSuccess(data) {
            let tmp_json  = JSON.parse(atob(data.slice(29)));
            console.log('Success', data[2])
            setNFTJSON(atob(tmp_json["image"].slice(26)));
            console.log(atob(tmp_json["image"].slice(26)));
            document.getElementById("wrapper").innerHTML = nftJson
        },
    })

    return(
        <div>
            <h1 className="display-5 fw-bold">Your Love Locks</h1>
            <div id="wrapper"></div>
        </div>
    )
}