import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ETH_CHAINS } from 'utils/config'
import { useColorModeValue } from '@chakra-ui/react'
import { ReactNode, useEffect, useState } from 'react'
import { createWeb3Modal, useWeb3ModalTheme } from '@web3modal/wagmi/react'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { InjectedConnector } from '@wagmi/core'
import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet'

interface Props {
  children: ReactNode
}

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''
if (!projectId) {
  console.warn('You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable')
}
const { chains, publicClient, webSocketPublicClient } = configureChains(ETH_CHAINS, [publicProvider()])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({ chains, options: { projectId, showQrModal: false } }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({ chains, options: { appName: 'ByteExchange' } }),
  ],
  publicClient,
  webSocketPublicClient,
})

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains: ETH_CHAINS,
})

export function Web3Provider(props: Props) {
  const [ready, setReady] = useState(false)
  const { themeMode, setThemeMode } = useWeb3ModalTheme()
  const themeColor = useColorModeValue('light', 'dark')

  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    setThemeMode(themeColor)
  }, [setThemeMode, themeColor])

  return <>{ready && <WagmiConfig config={wagmiConfig}>{props.children}</WagmiConfig>}</>
}
