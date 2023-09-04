import { Head } from 'components/layout/Head'
import { CardList } from 'components/layout/CardList'
import { Container, Input, InputGroup, InputLeftElement, Text, useColorModeValue } from '@chakra-ui/react'
import TokenIcon from 'assets/icons/token.png'
import { pools } from '../../pools'
import React from 'react'
import { SECOND_COLOR_SCHEME } from '../../utils/config'
import { SearchIcon } from '@chakra-ui/icons'

export const ExampleItems = [
  // {
  //   title: "Sign-in with Ethereum",
  //   description: "Sign-in with Ethereum is a new form of authentication that enables users to control their identity with their Ethereum account.",
  //   image: [AuthIcon.src],
  //   url: "/applications/siwe"
  // },
  // {
  //   title: "Gitcoin Passport",
  //   description:
  //     "Gitcoin Passport is an identity protocol that proves your trustworthiness without needing to collect personally identifiable information.",
  //   image: [PassportIcon.src],
  //   url: "/applications/passport"
  // },
  // {
  //   title: "Custom Contract",
  //   description: "This example shows a custom Solidity smart contract deployed using Hardhat. You can find sample contract under /contracts.",
  //   image: [CustomIcon.src],
  //   url: "/applications/custom-message"
  // },
  // {
  //   title: "Send Ether",
  //   description: "Sending Ether to another address is the most basic, common transaction that you can do.",
  //   image: [EtherIcon.src],
  //   url: "/applications/send-ether"
  // },
  // {
  //   title: "Send ERC20 Token",
  //   description: "ERC20 introduces a standard interface for fungible tokens. Use this example to send any ERC20 to another address.",
  //   image: [TokenIcon.src],
  //   url: "/applications/send-erc20"
  // },
  // {
  //   title: "Mint NFT",
  //   description: "A Non-Fungible Token (NFT) is used to identify something or someone in a unique way. Use this ERC721 example to mint your own NFT.",
  //   image: [NFTIcon.src],
  //   url: "/applications/mint-nft"
  // },
  {
    title: 'More support soon',
    description: "We're putting more pools on the shelves. Follow our official account to get discounts and airdrops first",
    image: [TokenIcon.src],
    url: '/',
  },
]

export default function Examples() {
  const tdHoverTextColor = useColorModeValue(`${SECOND_COLOR_SCHEME}.500`, `${SECOND_COLOR_SCHEME}.300`)
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
      </main>
    </>
  )
}
