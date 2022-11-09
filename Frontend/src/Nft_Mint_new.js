import * as React from 'react'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useContractRead
} from 'wagmi'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import "./css/mint.css";
import preview from "./Assets/svgviewer-output.svg";
import BigNumber from "bignumber.js";

import { SketchPicker } from "@hello-pangea/color-picker";

import SVG_hearth_normal from "./Locks/SVG_hearth_normal";
import SVGhearthhearth from "./Locks/SVG_hearth_hearth";
import SVGsquarenormal from "./Locks/SVG_square_normal";
import SVG_square_hearth from "./Locks/SVG_square_hearth";
import config_file from "./Config/Config.json";

const customStyles = {
    content: {
    },
};
export function NftMintNew() {
    const [NameText, setNameText] = useState("your custom Text");
    const [NftDescription, setNftDescription] = useState("your custom description");
    const [dateVal, setDateval] = useState("01.01.2022");
    const [bg1, setBg1] = useState("#257e38");
    const [bg2, setBg2] = useState("#d1d1d1");
    const [bg3, setBg3] = useState("#b3b3b3");
    const [lockcolor, setLockcolor] = useState("#A9A9A");
    const [Locktype, setLocktype] = useState(0);
    const [Keyholetype, setKeyholetype] = useState(0);
    const [Render_component, setRender_component] = useState("square_normal");
    const [text_color, setTextcolor] = useState("#fff");
    const [date_color, setDateColor] = useState("#fff");
    const [lockprice, setLockprice] = useState("");


    const components = {
        "hearth_normal": SVG_hearth_normal,
        "hearth_hearth": SVGhearthhearth,
        "square_normal": SVGsquarenormal,
        "square_hearth": SVG_square_hearth
    };
    const Component = components[Render_component];

    useEffect(() => {
        if (Locktype == 0 && Keyholetype == 0)
        {
            setRender_component("square_normal");
        } else if (Locktype == 0 && Keyholetype == 1)
        {
            setRender_component("square_hearth");
        } else if (Locktype == 1 && Keyholetype == 0)
        {
            setRender_component("hearth_normal");
        }else
        {
            setRender_component("hearth_hearth");
        }
    }, [Locktype, Keyholetype]);

    const { address, isConnected } = useAccount()


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
            console.log(JSON.parse(data));
            setLockprice(BigNumber(JSON.parse(data)+5000) );

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
                console.log('Success', data)},
            onSettled(data, error) {
                console.log('Settled', { data, error })
            }
        })
    const { isLoading, isSuccess } = useWaitForTransaction({hash: data?.hash,});


    useEffect(() => {

        console.log(bg1.substring(1));
        console.log(bg2.substring(1));
        console.log(bg3.substring(1));
        console.log(Locktype.toString());
        console.log(Keyholetype.toString());
        console.log(lockcolor.substring(1));
        console.log(NameText.substring(1));
        console.log(text_color.substring(1));
        console.log(dateVal.substring(1));
        console.log(date_color.substring(1));
        console.log(NftDescription.substring(1));


    }, []);
    return (
        <div className="container flex-column">

            <div className="row">
                <div className="col"></div>
                <div className="col-9"><div className="card">

                    <Component name={NameText} date={dateVal} bg1={bg1} bg2={bg2} bg3={bg3} lock_color={lockcolor} text_color={text_color} date_color={date_color}/>

                </div></div>
                <div className="col"></div>
            </div>

            <div className="row">
                <div className="col"><h3>Background 1</h3><SketchPicker
                    onChangeComplete={(e) => { setBg1(e.hex.toString()); }}/></div>
                <div className="col"><h3>Background 2</h3><SketchPicker
                    onChangeComplete={(e) => { setBg2(e.hex.toString()); }}/></div>
                <div className="col"><h3>Background 3</h3><SketchPicker
                    onChangeComplete={(e) => { setBg3(e.hex.toString()); }}/></div>
            </div>
            <div className="row">
                <div className="col"><h3>Lock Color</h3><SketchPicker
                    onChangeComplete={(e) => { setLockcolor(e.hex.toString()); }}/></div>
                <div className="col"></div>
                <div className="col"></div>
            </div>



            <select name="locktype" className="form-control" id="alertype" onChange={(e) => setLocktype(e.target.value)}>
                <option value="0">Square Shape</option>
                <option value="1">Hearth Shape</option>
            </select>
            <select name="keyhole" className="form-control" id="alertype" onChange={(e) => setKeyholetype(e.target.value)}>
                <option value="0">Normal Keyhole</option>
                <option value="1">Hearth Keyhole</option>
            </select>
            <input type="text" className="form-control" id="inputcustomtext"
                   placeholder="Your Text"  maxLength="28" onChange={(e) => { setNameText(e.target.value); }}/>
            <input type="date" className="form-control" id="inputcustomdate"
                   placeholder="Date" onChange={(e) => { setDateval(e.target.value); }}/>

            <div className="row">
                <div className="col"><h3>Text Color</h3><SketchPicker
                    onChangeComplete={(e) => { setTextcolor(e.hex.toString()); }}/></div>
                <div className="col"><h3>Date Color</h3><SketchPicker
                    onChangeComplete={(e) => { setDateColor(e.hex.toString()); }}/></div>
                <div className="col"><h3>NFT Description</h3>
                    <input type="text" className="form-control" id="inputcustomtext"
                           placeholder="Your Text"  maxLength="1024" onChange={(e) => { setNftDescription(e.target.value); }}/>
                </div>
            </div>



            <button className="btn btn-primary btn-lg" onClick={() => write?.()}>Mint your NFT now</button>


        </div>
    )
}

