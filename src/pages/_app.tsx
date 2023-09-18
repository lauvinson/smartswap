import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { client } from '@/providers/Apollo'
import { ApolloProvider } from '@apollo/client'
import store from '../state'
import { LoadingPage } from '@/components/Loading'
import { useIsMounted } from '@/hooks/useIsMounted'
import { Provider } from 'react-redux'
import { UIProviders } from 'providers/NextUI'
import { NextSeo } from 'next-seo'
import React from 'react'
import { IconHandling } from '@/components/layout/Head'
// const Seo = dynamic(() => import('components/layout/Seo').then((mod) => mod.Seo), { loading: () => <LoadingPage /> })
const Web3Provider = dynamic(() => import('providers/Web3').then((mod) => mod.Web3Provider), { loading: () => <LoadingPage /> })
const ProtocolUpdater = dynamic(() => import('../state/protocol/updater').then((mod) => mod.default), { loading: () => <LoadingPage /> })
const TokenUpdater = dynamic(() => import('../state/tokens/updater').then((mod) => mod.default), { loading: () => <LoadingPage /> })
const PoolUpdater = dynamic(() => import('../state/pools/updater').then((mod) => mod.default), { loading: () => <LoadingPage /> })
const NetworkUpdater = dynamic(() => import('../state/network/updater').then((mod) => mod.default), { loading: () => <LoadingPage /> })
const Layout = dynamic(() => import('components/layout').then((mod) => mod.Layout), { loading: () => <LoadingPage /> })

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
    <>
      <IconHandling rel="icon" />
      <UIProviders themeProps={{ attribute: 'class', storageKey: 'nightwind-mode', defaultTheme: 'system', enableSystem: true }}>
        <Web3Provider>
          <ApolloProvider client={client}>
            <Provider store={store}>
              {/*<Seo />*/}
              <NextSeo noindex={true} nofollow={true} />
              {isMounted && (
                <>
                  <Updaters />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </>
              )}
            </Provider>
          </ApolloProvider>
        </Web3Provider>
      </UIProviders>
    </>
  )
}
