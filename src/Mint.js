import * as React from 'react'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useContractRead
} from 'wagmi'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import {useState} from "react";

export function MintNFT() {
    const { config } = usePrepareContractWrite({
        address: '0xA48f2591B53A80e260944352A2F232EE04C918fE',
        abi: [
            {
                name: 'createLoveLock',
                type: 'function',
                stateMutability: 'nonpayable',
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
        args: [["636363", "CFCFCF", "ABABAB", "FF0000", "00FF00", "0000FF", "hello world", "FF0000", "FFFFFF","25.05.1928","000000"], "test"],
    })
    //const { data, write } = useContractWrite(config)
    const { data, write } = useContractWrite(
    {
        mode: 'recklesslyUnprepared',
        address: '0xA48f2591B53A80e260944352A2F232EE04C918fE',
        abi: [
            {
                name: 'createLoveLock',
                type: 'function',
                stateMutability: 'nonpayable',
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
        args: [["636363", "CFCFCF", "ABABAB", "FF0000", "00FF00", "0000FF", "hello world", "FF0000", "FFFFFF","25.05.1928","000000"], "test"],
        onSuccess(data) {
        console.log('Success', data)},
        onSettled(data, error) {
            console.log('Settled', { data, error })
        }
    })
    const { address, isConnected } = useAccount()
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })
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
            console.log('Success', data)
        },
    })

    return (
        <div>

            <button className="btn btn-primary btn-lg" type="button" disabled={!isConnected} onClick={() => write?.()}>
                {isLoading ? 'Minting...' : 'Mint Now'}
            </button>
            {isSuccess && (

                <div>
                    Successfully minted your NFT!
                </div>
            )}
        </div>
    )
}

