import React, { ReactNode } from 'react'
import { Box, Container, useColorModeValue } from '@chakra-ui/react'
import { Header } from './Header'
import { Footer } from './Footer'
import { NetworkStatus } from './NetworkStatus'
import { THEME_COLOR_SCHEME } from '../../utils/config'

interface Props {
  children: ReactNode
}

export function Layout(props: Props) {
  return (
    <Box margin="0 auto" minH="100vh" bg={useColorModeValue(`${THEME_COLOR_SCHEME}.100`, `${THEME_COLOR_SCHEME}.900`)}>
      <Header />

      <Container maxW="container.lg">{props.children}</Container>

      <Box position="fixed" bottom={2} right={2}>
        <NetworkStatus />
      </Box>

      <Footer />
    </Box>
  )
}
