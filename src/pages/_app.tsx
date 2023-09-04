import type { AppProps } from 'next/app'
import { Layout } from 'components/layout'
import { Web3Provider } from 'providers/Web3'
import { ChakraProvider } from 'providers/Chakra'
import { useIsMounted } from 'hooks/useIsMounted'
import { Seo } from 'components/layout/Seo'
import { client } from '../providers/Apollo'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'
import { ApolloProvider } from 'react-apollo'

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()
  loadErrorMessages()
  loadDevMessages()

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Seo />
        <Web3Provider>
          {isMounted && (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </Web3Provider>
      </ChakraProvider>
    </ApolloProvider>
  )
}
