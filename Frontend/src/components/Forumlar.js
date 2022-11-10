import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import { usePrepareContractWrite, useContractWrite } from 'wagmi'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
export const Formular = () => {
    const { address, isConnected } = useAccount()
    const [to, setTo] = useState('')
    const [amount, setAmount] = useState('')

    const { config } = usePrepareContractWrite({
        address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
        abi: [
            {
                name: 'mint',
                type: 'function',
                stateMutability: 'nonpayable',
                inputs: [],
                outputs: [],
            },
        ],
        functionName: 'mint',
    })
    const { write } = useContractWrite(config)


    return (
        <div>
            <span>Your Address: {address}</span>
            <form>
                <input aria-label="Recipient" placeholder="0xA0Cf…251e" onChange={(e) => setTo(e.target.value)} value={to}/>
                <input aria-label="Amount (ether)" onChange={(e) => setAmount(e.target.value)} value={amount} placeholder="0.05" />
                <button disabled={!write} onClick={() => write?.({
                    args: [["636363", "CFCFCF", "ABABAB", "FF0000", "00FF00", "0000FF", "hello world", "FF0000", "FFFFFF","25.05.1928","000000"], "TEST"],
                })}>Send</button>
            </form>
        </div>
    );
};
