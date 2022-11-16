import { ConnectButton } from "@rainbow-me/rainbowkit";

export const ConnectWallet = (props) => {
    return (
        <div className="connect-wallet-container">
            <ConnectButton {...props} />
        </div>
    );
};
