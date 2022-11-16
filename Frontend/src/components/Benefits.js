import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import { usePrepareContractWrite, useContractWrite } from 'wagmi'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
export const Benefits = () => {
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
        <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
            <div className="d-flex flex-column align-items-start gap-2">
                <h3 className="fw-bold">Left-aligned title explaining these awesome features</h3>
                <p className="text-muted">Paragraph of text beneath the heading to explain the heading. We'll add onto it
                    with another sentence and probably just keep going until we run out of words.</p>
                <a href="#" className="btn btn-primary btn-lg">Mint your Love</a>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 g-4">
                <div className="d-flex flex-column gap-2">
                    <div
                        className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                        <svg className="bi" width="1em" height="1em">
                            
                        </svg>
                    </div>
                    <h4 className="fw-semibold mb-0">Featured title</h4>
                    <p className="text-muted">Paragraph of text beneath the heading to explain the heading.</p>
                </div>

                <div className="d-flex flex-column gap-2">
                    <div
                        className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                        <svg className="bi" width="1em" height="1em">
                            
                        </svg>
                    </div>
                    <h4 className="fw-semibold mb-0">Featured title</h4>
                    <p className="text-muted">Paragraph of text beneath the heading to explain the heading.</p>
                </div>

                <div className="d-flex flex-column gap-2">
                    <div
                        className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                        <svg className="bi" width="1em" height="1em">
                            
                        </svg>
                    </div>
                    <h4 className="fw-semibold mb-0">Featured title</h4>
                    <p className="text-muted">Paragraph of text beneath the heading to explain the heading.</p>
                </div>

                <div className="d-flex flex-column gap-2">
                    <div
                        className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                        <svg className="bi" width="1em" height="1em">
                            
                        </svg>
                    </div>
                    <h4 className="fw-semibold mb-0">Featured title</h4>
                    <p className="text-muted">Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
        </div>
    );
};
