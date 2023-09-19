import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { client } from '@/providers/Apollo'
import { ApolloProvider } from '@apollo/client'
import store from '../state'
import { Provider } from 'react-redux'
import React from 'react'
import { useIsMounted } from '@/hooks/useIsMounted'
import { LoadingPage } from '@/components/Loading'
// Dynamic imports
const NextSeo = dynamic(() => import('next-seo').then((mod) => mod.NextSeo), { loading: () => <LoadingPage /> })
const UIProviders = dynamic(() => import('providers/NextUI').then((mod) => mod.UIProviders), { loading: () => <LoadingPage /> })
const IconHandling = dynamic(() => import('@/components/layout/Head').then((mod) => mod.IconHandling), { loading: () => <LoadingPage /> })
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
                  <Layout>
                    <Component {...pageProps} />
                    <Updaters />
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
