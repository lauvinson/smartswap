import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from 'components/layout'
import { Web3Provider } from 'providers/Web3'
import { useIsMounted } from 'hooks/useIsMounted'
import { Seo } from 'components/layout/Seo'
import { client } from '@/providers/Apollo'
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import store from '../state'
import ProtocolUpdater from '../state/protocol/updater'
import TokenUpdater from '../state/tokens/updater'
import PoolUpdater from '../state/pools/updater'
import NetworkUpdater from '../state/network/updater'
import { UIProviders } from 'providers/NextUI'

function Updaters() {
  return (
    <>
      {/*<ListUpdater />*/}
      {/*<UserUpdater />*/}
      <ProtocolUpdater />
      <TokenUpdater />
      <PoolUpdater />
      {/*<ApplicationUpdater />*/}
      <NetworkUpdater />
    </>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()
  return (
    <UIProviders>
      <Web3Provider>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <Updaters />
            <Seo />
            {isMounted && (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </Provider>
        </ApolloProvider>
      </Web3Provider>
    </UIProviders>
  )
}
