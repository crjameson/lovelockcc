import * as React from 'react'
import {useState, useEffect} from "react";
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useContractRead
} from 'wagmi'

import additional from "./css/additional.css";
import arrow from "./Assets/left-arrow-svgrepo-com.svg";
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function ShowNFT() {
    const [locks, setLocks] = useState([]);
    const [nftJson, setNFTJSON] = useState();
    const [elementLoaded, setelementLoaded] = useState(false);
    const [lockid, setlockid] = useState(0);


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
        args: [0],
        onSuccess(data) {
            let tmp_json  = JSON.parse(atob(data.slice(29)));
            setNFTJSON(atob(tmp_json["image"].slice(26)));
            //console.log(atob(tmp_json["image"].slice(26)));
            //
            //document.getElementById("wrapper").innerHTML = nftJson
            
            setelementLoaded(true);
        },
    })


    useEffect(() => {
        let tmp_lock_list = [];

        for (let i = 0; i < 10; i++) {
            console.log(i);
            setlockid(i);
        }
        console.log(locks);

    }, []);

    if (elementLoaded)
    {
    return(
        <div  class="container">

            <div className="row">
                <div className="col divadditional"><img src={arrow} className="arrows"/></div>
                <div className="col-6"><div id="wrapper" dangerouslySetInnerHTML={{__html: nftJson}}></div></div>
                <div className="col divadditional"><img src={arrow} className="rotate180 arrows"/></div>
            </div>

        </div>
    )}
}