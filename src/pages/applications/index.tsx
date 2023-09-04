import { Head } from 'components/layout/Head'
import { CardList } from 'components/layout/CardList'
import { Container, Input, InputGroup, InputLeftElement, Text, useColorModeValue } from '@chakra-ui/react'
import { pools } from '../../pools'
import React from 'react'
import { SECOND_COLOR_SCHEME } from '../../utils/config'
import { SearchIcon } from '@chakra-ui/icons'
import { useQuery } from "@apollo/client";
import { DAI_QUERY, ETH_PRICE_QUERY } from '../../providers/Apollo'

export default function Examples() {
  const tdHoverTextColor = useColorModeValue(`${SECOND_COLOR_SCHEME}.500`, `${SECOND_COLOR_SCHEME}.300`)
  const { loading: ethLoading, data: ethPriceData, error: ethError } = useQuery(ETH_PRICE_QUERY)
  const { loading: daiLoading, data: daiData } = useQuery(DAI_QUERY, {
    variables: {
      tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    },
  })

  const daiPriceInEth = daiData?.tokens[0]?.derivedETH
  const daiTotalLiquidity = daiData?.tokens[0]?.totalLiquidity
  const ethPriceInUSD = ethPriceData?.bundle?.ethPrice
  return (
    <>
      <Head />

      <main>
        {/*<HeadingComponent as="h2">Nexth Examples</HeadingComponent>*/}
        <Container m={0} maxW="100%" py={['2', '2', '5', '5']}>
          <InputGroup display={{ base: 'none', md: 'block' }} gridColumn="span 1">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input variant="filled" placeholder="Search Token" focusBorderColor={tdHoverTextColor} />
          </InputGroup>
        </Container>
        <CardList
          title={
            <>
              <Text fontWeight="bold" fontSize={{ base: '1xl', md: '2xl' }} mx={3.5}>
                Pools{' '}
                <Text as="span" opacity={0.5} fontSize={{ base: '4xs', md: '5xs' }}>
                  ({pools.length})
                </Text>
              </Text>
            </>
          }
          intro={<Text opacity={0.5}>Only the pools with the current network will be displayed. Please switch the network for other pools.</Text>}
          items={pools}
        />
        <div>
          <div>
            Dai price:{' '}
            {ethLoading || daiLoading
              ? 'Loading token data...'
              : '$' +
              // parse responses as floats and fix to 2 decimals
              (parseFloat(daiPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
          </div>
          <div>
            Dai total liquidity:{' '}
            {daiLoading
              ? 'Loading token data...'
              : // display the total amount of DAI spread across all pools
              parseFloat(daiTotalLiquidity).toFixed(0)}
          </div>
        </div>
      </main>
    </>
  )
}
