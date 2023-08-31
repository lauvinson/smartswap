import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ETH_CHAINS, SECOND_COLOR_SCHEME, THEME_COLOR_SCHEME } from 'utils/config'
import { useColorMode, useColorModeValue } from '@chakra-ui/react'
import { ReactNode, useEffect, useState } from 'react'
import { Web3Modal } from '@web3modal/react'

interface Props {
  children: ReactNode
}

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''
if (!projectId) {
  console.warn('You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable')
}
const { chains, publicClient, webSocketPublicClient } = configureChains(ETH_CHAINS, [publicProvider(), w3mProvider({ projectId: projectId })])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId: projectId }),
  publicClient,
  webSocketPublicClient,
})

const ethereumClient = new EthereumClient(wagmiConfig, chains)

export function Web3Provider(props: Props) {
  const { colorMode } = useColorMode()
  const [ready, setReady] = useState(false)
  const accentColor = useColorModeValue(`${THEME_COLOR_SCHEME}`, `${SECOND_COLOR_SCHEME}`)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      {ready && <WagmiConfig config={wagmiConfig}>{props.children}</WagmiConfig>}

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode={colorMode}
        themeVariables={{
          '--w3m-accent-color': accentColor,
          '--w3m-background-color': accentColor,
        }}
      />
    </>
  )
}
