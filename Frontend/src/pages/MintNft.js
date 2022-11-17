import * as React from 'react'
import { Accordion, Card, Row, Col, Container } from 'react-bootstrap'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useContractRead
} from 'wagmi'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';

import "../scss/mint.scss";

import BigNumber from "bignumber.js";

import { SketchPicker, CompactPicker } from "@hello-pangea/color-picker";

import SVG_heart_normal from "../Locks/SVG_heart_normal";
import SVGheartheart from "../Locks/SVG_heart_heart";
import SVGsquarenormal from "../Locks/SVG_square_normal";
import SVG_square_heart from "../Locks/SVG_square_heart";
import config_file from "../Config/Config.json";
import {useNavigate} from "react-router-dom";

const customStyles = {
    content: {
    },
};
export function NftMintNew() {
    const [NameText, setNameText] = useState("Eva + Maximilian");
    const [NftDescription, setNftDescription] = useState("Eva + Maximilian");
    const [dateVal, setDateval] = useState("01.01.2022");
    const [bg1, setBg1] = useState("#FFFFFF");
    const [bg2, setBg2] = useState("#E6E6E6");
    const [bg3, setBg3] = useState("#D5D5D5");
    const [lockcolor, setLockcolor] = useState("#e5bd5c");
    const [Locktype, setLocktype] = useState(0);
    const [Keyholetype, setKeyholetype] = useState(0);
    const [Render_component, setRender_component] = useState("square_normal");
    const [text_color, setTextcolor] = useState("#1F1F1F");
    const [date_color, setDateColor] = useState("#1F1F1F");
    const [lockprice, setLockprice] = useState("");
    const [Mintsettled, setMintsettled] = useState(false);
    const [Errmsg, setErrmsg] = useState("");
    const [lockid, setlockid] = useState(0);

    let navigate = useNavigate();
    const { address, isConnected } = useAccount()

    const components = {
        "heart_normal": SVG_heart_normal,
        "heart_heart": SVGheartheart,
        "square_normal": SVGsquarenormal,
        "square_heart": SVG_square_heart
    };
    const Component = components[Render_component];

    useEffect(() => {
        if (Locktype == 0 && Keyholetype == 0) {
            setRender_component("square_normal");
        } else if (Locktype == 0 && Keyholetype == 1) {
            setRender_component("square_heart");
        } else if (Locktype == 1 && Keyholetype == 0) {
            setRender_component("heart_normal");
        } else {
            setRender_component("heart_heart");
        }
    }, [Locktype, Keyholetype]);




    const { datareader, isErrorreader, isLoadingreader } = useContractRead({
        address: config_file.contract_address,
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
            //console.log(JSON.parse(data));
            setLockprice(BigNumber(JSON.parse(data) + 5000));

        },
    })

    const { data, write } = useContractWrite(
        {
            mode: 'recklesslyUnprepared',
            address: config_file.contract_address,
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
                                    "internalType": "uint256",
                                    "name": "lockShape",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "keyHoleShape",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "lockColor",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "text",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "textColor",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "date",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "dateColor",
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
                value: (lockprice).toString(),


            },


            args: [[
                bg1.substring(1),
                bg2.substring(1),
                bg3.substring(1),
                Locktype.toString(),
                Keyholetype.toString(),
                lockcolor.substring(1),
                NameText,
                text_color.substring(1),
                dateVal.toString(),
                date_color.substring(1)],
                NftDescription],

            //args: [[bg1.substring(1), bg2.substring(1), bg3.substring(1), Locktype.toString(), Keyholetype.toString(), lockcolor.substring(1), NameText, text_color.substring(1), ,dateVal.toString(), date_color.substring(1)], NftDescription],
            onSuccess(data) {
                //console.log('Success', data)
                setMintsettled(true);
            },
            onError(data)
            {
                setErrmsg(data?.data?.message);
            }
        })
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash, });

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

            setlockid(JSON.parse(data));
        },
        onError(error) {
        },
    })

    useEffect(() => {
        if (isSuccess)
        {
            navigate("/showroom");
        }
    }, [isSuccess]);
    return (
        <Container className="mint flex-column">
            <Row>
            <Col md={8}>
                <p>Here you can mint your unique LoveLock NFT. After minting the NFT it will be stored immutable on the blockchain and send to your wallet. </p>
            </Col>
            </Row>
            <Row>
                <Col md={8}>
                    <Accordion defaultActiveKey="0">

                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Shape</Accordion.Header>
                            <Accordion.Body>
                                <div className='form-group mb-4'>
                                    <select name="locktype" className="form-control" id="alertype" onChange={(e) => setLocktype(e.target.value)}>
                                        <option value="0">Square Shape</option>
                                        <option value="1">Heart Shape</option>
                                    </select>
                                </div>
                                <div className='form-group mb-4'>
                                    <select name="keyhole" className="form-control" id="alertype" onChange={(e) => setKeyholetype(e.target.value)}>
                                        <option value="0">Normal Keyhole</option>
                                        <option value="1">Heart Keyhole</option>
                                    </select>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Background</Accordion.Header>
                            <Accordion.Body>
                                <div className="d-flex flex-wrap justify-content-center">

                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Background 1</Card.Title>
                                            <CompactPicker onChangeComplete={(e) => { setBg1(e.hex.toString()); }} />
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Background 2</Card.Title>
                                            <CompactPicker onChangeComplete={(e) => { setBg2(e.hex.toString()); }} />

                                        </Card.Body>
                                    </Card>

                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Background 3</Card.Title>
                                            <CompactPicker onChangeComplete={(e) => { setBg3(e.hex.toString()); }} />

                                        </Card.Body>
                                    </Card>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Lock</Accordion.Header>
                            <Accordion.Body>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Lock Color</Card.Title>
                                        <CompactPicker onChangeComplete={(e) => { setLockcolor(e.hex.toString()); }} />
                                    </Card.Body>
                                </Card>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Text</Accordion.Header>
                            <Accordion.Body>
                                <div className="d-flex flex-wrap justify-content-center">

                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Text Color</Card.Title>
                                            <CompactPicker onChangeComplete={(e) => { setTextcolor(e.hex.toString()); }} />
                                        </Card.Body>
                                    </Card>

                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Date Color</Card.Title>
                                            <CompactPicker onChangeComplete={(e) => { setDateColor(e.hex.toString()); }} />

                                        </Card.Body>
                                    </Card>

                                </div>

                                <div className='form-group mb-3'>
                                    <label className='text-muted'>NFT Description</label>
                                    <textarea rows={5} className="form-control h-100" id="inputcustomtext" placeholder="Your Description" maxLength="1024" onChange={(e) => setNftDescription(e.target.value)} ></textarea>
                                </div>


                                <div className='form-group mb-2'>
                                    <label className='text-muted'>Custom Text </label>
                                    <input type="text" className="form-control" id="inputcustomtext" placeholder="Your Custom Text (all letters, numbers and +-. are allowed)" maxLength="28" onChange={(e) => { setNameText(e.target.value); }} />
                                </div>
                                <div className='form-group'>
                                    <input type="text" className="form-control" id="inputcustomdate" placeholder="Date (all letters, numbers and +-. are allowed)" onChange={(e) => { setDateval(e.target.value); }} />
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>


                    </Accordion>

                    {Errmsg ??(
                    <div>
                        {Errmsg}
                    </div>)}

                    { lockid > 0 ? (
                            <button className="btn btn-primary btn-lg w-100 mt-3" disabled={!isConnected} onClick={() => navigate("/showroom")}>
                                You already have a LoveLock! Click to view it.
                            </button>
                    ):
                        (
                            <button className="btn btn-primary btn-lg w-100 mt-3" disabled={!isConnected} onClick={() => write?.()}>
                                {isConnected ? 'Mint your NFT' : 'Please connect your Wallet'}
                            </button>
                        )}

                </Col>
                <Col md={4}  className='mt-3 mt-lg-0'>
                    <Component name={NameText} date={dateVal} bg1={bg1} bg2={bg2} bg3={bg3} lock_color={lockcolor} text_color={text_color} date_color={date_color} />
                </Col>
            </Row>
            <Row>
                <Col md={8} className='mt-4'>
                    <p>There is a one time fee for the lock of 25 USD. 50% of the funds will go into a raffle and each month one of the locks will be chosen as winner. So if you’re lucky, maybe you can go for a nice dinner or even a short holiday trip together with that money. And you have this chance every month.
The other half is used for transaction fees and the development fund of this website. We plan to build a beautiful love lock bridge in the metaverse.
</p></Col>
            </Row>
        </Container>
    )
}

