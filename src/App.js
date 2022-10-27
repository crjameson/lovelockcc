import "@rainbow-me/rainbowkit/styles.css";
import {getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {chain, configureChains, createClient, WagmiConfig} from "wagmi";
import {alchemyProvider} from "wagmi/providers/alchemy";
import {publicProvider} from "wagmi/providers/public";
import {YourComponent} from "./YourComponent";
import Container from 'react-bootstrap/Container';
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Formular} from "./Forumlar";
import {Benefits} from "./Benefits";
import {MintNFT} from "./Mint";
import {ShowNFT} from "./ShowNFT";
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
                        <svg className="bi me-2" width="40" height="32">

                        </svg>
                        <span className="fs-4">Lovelock.cc</span>
                    </a>
                    <ul className="nav nav-pills">
                        <li className="nav-item"><YourComponent/></li>
                    </ul>
                </header>
                <div className="p-5 mb-4 bg-light rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold">Mint your Lovelock</h1>
                        <p className="col-md-8 fs-4">Prove your Love by minting an unbreakable Padlock to show your Love to your Partner.</p>
                        <MintNFT></MintNFT>
                    </div>
                </div>
                <div className="p-5 mb-4 bg-light rounded-3">
                    <div className="container-fluid py-5">
                        <ShowNFT></ShowNFT>
                    </div>
                </div>


            </Container>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
