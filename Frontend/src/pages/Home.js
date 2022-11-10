import React from 'react';
import { ConnectWallet } from '../components/ConnectWallet'
import {Link} from "react-router-dom";

import '../scss/home.scss'

export default class Home extends React.Component {
    render() {
        return (
            <div className="home p-1 p-lg-5 pt-lg-2 my-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="text-center display-5 fw-bold">Mint your <span className="spanlove">Love</span>Lock</h1>
                    <p className="col-md-12 fs-5">With the LoveLock NFT it is now possible to prove your beloved partner true loyalty, honesty and faithfulness. Once the NFT minted on the Blockchain your Love is as immutable as the NFT itself. Every NFT can be customized and is unique to you and your Partner.</p>
                    <p className="col-md-12 fs-5">Start showing your Love now!</p>
                    <div className='faded-button'>
                        <Link
                            to={`${process.env.PUBLIC_URL}/mint`}
                            className="btn btn-primary btn-lg"
                        >Mint now!</Link>
                    </div>
                </div>
            </div>
        );
    }
}
