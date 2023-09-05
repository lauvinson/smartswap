import React from 'react'
import { Container, Grid, GridItem, Text, useBreakpointValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface Props {
  className?: string
}

export function HomeBanner(props: Props) {
  const router = useRouter()
  const colSpanValue = useBreakpointValue({ base: 5, sm: 5, md: 3, lg: 3, xl: 3 })

  if (router.pathname !== '/') {
    return <></>
  }

  return (
    <Container className={props.className} m={0} maxW="100%">
      <Container maxW="container.lg">
        <Grid templateColumns="repeat(5, 1fr)" gap={4} py={['10', '10', '10', '20']}>
          <GridItem colSpan={5} bg="pink"></GridItem>
          <GridItem rowStart={2} colSpan={colSpanValue} marginTop={{ base: '-10', md: '-10', lg: '-10' }}>
            <Text lineHeight="normal" fontWeight="bold" fontSize={{ base: '3xl', md: '5xl' }}>
              <Text>Put your funds</Text> to work by <br /> providing liquidity.
            </Text>
          </GridItem>
          <GridItem rowStart={3} colSpan={colSpanValue}>
            <Text fontSize={{ base: '1xl', md: '2xl' }} fontWeight="light">
              Providing liquidity to a pool allows you to earn a percentage of the pools traded volume as well as any extra rewards if the pool is
              incentivized.
            </Text>
          </GridItem>
        </Grid>
      </Container>
    </Container>
  )
}
