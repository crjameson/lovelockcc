import * as React from "react";
import { Outlet, Route, Routes, Link } from "react-router-dom";
// your components here

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Container } from "react-bootstrap";



import Raffle from './pages/Raffle.js';
import { ShowNFT } from "./pages/ShowNFT";
import { NftMintNew } from "./pages/MintNft";
import NavBar from "./components/NavBar";
import Home from "./pages/LandingPage";


const { chains, provider } = configureChains(
    [chain.polygonMumbai],
    [publicProvider()]
);



const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains
});

const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider
});


export default function App() {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/showroom" element={<ShowNFT />} />
                        <Route path="/mint" element={<NftMintNew />} />
                        <Route path="/raffle" element={<Raffle />} />
                    </Routes>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}