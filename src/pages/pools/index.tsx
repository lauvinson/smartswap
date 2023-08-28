import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { CardList } from 'components/layout/CardList'
import { Code, Text } from '@chakra-ui/react'

import SignIcon from 'assets/icons/fingerprint.png'
import AuthIcon from 'assets/icons/auth.png'
import PassportIcon from 'assets/icons/passport.png'
import CustomIcon from 'assets/icons/custom.png'
import EtherIcon from 'assets/icons/ethereum.png'
import TokenIcon from 'assets/icons/token.png'
import NFTIcon from 'assets/icons/nft.png'
import ENSIcon from 'assets/icons/ens.png'

export const ExampleItems = [
  {
    title: 'DAI - WETH',
    description: '3.58% APR, 0.05% Fee',
    image: SignIcon.src,
    url: '/examples/sign',
  },
]

export default function Examples() {
  return (
    <>
      <Head />

      <main>
        <HeadingComponent as="h2">Pools</HeadingComponent>
        <Text pb={4}>Start earning passive crypto income with our automated V3 liquidity pools.</Text>

        <CardList title="Examples" items={ExampleItems} />
      </main>
    </>
  )
}
