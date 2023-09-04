import React, { ReactNode } from 'react'
import { Box, Container, Grid, GridItem, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { Header } from './Header'
import { Footer } from './Footer'
import { NetworkStatus } from './NetworkStatus'
import { THEME_COLOR_SCHEME } from '../../utils/config'

interface Props {
  children: ReactNode
}

export function Layout(props: Props) {
  const bgColor = useColorModeValue(`${THEME_COLOR_SCHEME}.50`, `${THEME_COLOR_SCHEME}.900`)
  const colSpanValue = useBreakpointValue({ base: 5, sm: 5, md: 3, lg: 3, xl: 3 })
  return (
    <Box margin="0 auto" minH="100vh" bg={useColorModeValue(`${THEME_COLOR_SCHEME}.100`, `${THEME_COLOR_SCHEME}.800`)}>
      <Header />
      <Container m={0} maxW="100%">
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
      <Container m={0} maxW="100%" pb={['10', '10', '10', '20']} bg={bgColor}>
        <Container maxW="container.lg">{props.children}</Container>
      </Container>
      <Box position="fixed" bottom={2} right={2}>
        <NetworkStatus />
      </Box>
      <Container m={0} maxW="100%">
        <Footer />
      </Container>
    </Box>
  )
}
