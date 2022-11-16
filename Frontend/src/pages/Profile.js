import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
    useNetwork,
    useSwitchNetwork
} from 'wagmi'
import App from "./App";

export function Profile() {
    const { address, connector, isConnected } = useAccount()
    //const { data: ensAvatar } = useEnsAvatar({ addressOrName: address })
    //const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()
    const { disconnect } = useDisconnect()
    const { chain, chains } = useNetwork()
    const network = useSwitchNetwork({
        chainId: 80001,
    })

    if (isConnected) {
        return (
            <div>
                {/*<div>{ensName ? `${ensName} (${address})` : address}</div>*/}
                <div>Connected to {connector.name}</div>
                <button onClick={disconnect}>Disconnect</button>
                {chain && <div>Connected to {chain.name}</div>}
                {chains && (
                    <div>Available chains: {chains.map((chain) => chain.name)}</div>
                )}

            </div>
        )
    }

    return (
        <div>
            {connectors.map((connector) => (
                <button
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                >
                    {connector.name}
                    {!connector.ready && ' (unsupported)'}
                    {isLoading &&
                        connector.id === pendingConnector?.id &&
                        ' (connecting)'}
                </button>
            ))}

            {error && <div>{error.message}</div>}
        </div>
    )
};
export default Profile;