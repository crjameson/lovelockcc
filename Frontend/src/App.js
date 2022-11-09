import "@rainbow-me/rainbowkit/styles.css";
import {getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {chain, configureChains, createClient, WagmiConfig} from "wagmi";
import {alchemyProvider} from "wagmi/providers/alchemy";
import {publicProvider} from "wagmi/providers/public";
import {ConnectWallet} from "./ConnectWallet";
import Container from 'react-bootstrap/Container';
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Formular} from "./Forumlar";
import {Benefits} from "./Benefits";
import {MintNFT} from "./Mint";
import {ShowNFT} from "./ShowNFT";
import Logo from "./Assets/Logo.svg";
import * as React from "react";
import "./App.css";
import {NftMintNew} from "./Nft_Mint_new";
import { Outlet, Route, Routes } from "react-router-dom";

const {chains, provider} = configureChains(
    [chain.polygonMumbai],
    [publicProvider()]
);



const {connectors} = getDefaultWallets({
    appName: "My RainbowKit App",
    chains
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
});

export default function App() {
    return (

        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
            <Container className="container py-4">
                <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                    <a href="/"
                       className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <span className="fs-4"><img src={Logo} alt="logo" width="250" height="75"/></span>
                    </a>
                    <ul className="nav nav-pills">
                        <li className="nav-item"><ConnectWallet/></li>
                    </ul>
                </header>
                <div className="p-5 mb-4 bg-light rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold">Mint your <span className="spanlove">Love</span>Lock</h1>
                        <p className="col-md-12 fs-4">With the LoveLock NFT it is now possible to prove your beloved partner true loyalty, honesty and faithfulness. Once the NFT minted on the Blockchain your Love is as immutable as the NFT itself. Every NFT can be customized and is unique to you and your Partner.</p>
                        <p className="col-md-12 fs-4">Start showing your Love now!</p>
                        {/*<MintNFT></MintNFT>*/}
                    </div>
                </div>
                <div className="p-5 mb-4 bg-light rounded-3">
                    <h1 className="display-5 fw-bold text-center">Your <span className="spanlove">Love</span>Lock</h1>
                    <div className="container-fluid py-5 just">
                        <ShowNFT></ShowNFT>
                    </div>
                </div>
                <div className="p-5 mb-4 bg-light rounded-3">
                    <h1 className="display-5 fw-bold text-center">Mint your <span className="spanlove">Love</span>Lock</h1>
                    <div className="container-fluid py-5 just">
                        <NftMintNew></NftMintNew>
                    </div>
                </div>


            </Container>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
function LayoutsWithNavbar() {
    return (
        <>
            {/* Your navbar component */}


            {/* This Outlet is the place in which react-router will render your components that you need with the navbar */}
            <Outlet />

            {/* You can add a footer to get fancy in here :) */}
        </>
    );
}