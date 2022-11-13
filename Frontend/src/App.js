import * as React from "react";
import { Outlet, Route, Routes, Link } from "react-router-dom";
// your components here

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Container } from "react-bootstrap";




import Home from './pages/Home.js';
import Raffle from './pages/Raffle.js';
import { ShowNFT } from "./pages/ShowNFT";
import { NftMintNew } from "./pages/Nft_Mint_new";
import NavBar from "./components/NavBar";
import Homenew from "./pages/Home2";


const { chains, provider } = configureChains(
    [chain.polygonMumbai],
    [publicProvider()]
);



const { connectors } = getDefaultWallets({
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
                <NavBar />
                <Container>
                    <Routes>
                        <Route path="/" element={<Homenew />} />
                        <Route path="/your-LoveLock" element={<ShowNFT />} />
                        <Route path="/mint" element={<NftMintNew />} />
                        <Route path="/raffle" element={<Raffle />} />
                    </Routes>
                </Container>

            </RainbowKitProvider>
        </WagmiConfig>
    )
}