import { ApolloClient, InMemoryCache } from "@apollo/client";
import gql from "graphql-tag";

export const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  cache: new InMemoryCache(),
})

export const DAI_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

export const ETH_PRICE_QUERY = gql`
  query ethPrice {
    bundle(id: "1") {
      ethPrice
    }
  }
`
