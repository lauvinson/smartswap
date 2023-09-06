import { Head } from 'components/layout/Head'
import { CardList } from 'components/layout/CardList'
import { Container, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { pools } from '@/pools'
import React from 'react'
import { SECOND_COLOR_SCHEME } from '@/utils/config'
import { SearchIcon } from '@chakra-ui/icons'
import { useThemeModeValue } from '@/providers/NextUI'

export default function Applications() {
  const tdHoverTextColor = useThemeModeValue(`${SECOND_COLOR_SCHEME}.500`, `${SECOND_COLOR_SCHEME}.300`)

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
