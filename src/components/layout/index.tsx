import React, { ReactNode } from 'react'
import { Box, Container, useColorModeValue } from '@chakra-ui/react'
import { Header } from './Header'
import { Footer } from './Footer'
import { NetworkStatus } from './NetworkStatus'
import { THEME_COLOR_SCHEME } from '../../utils/config'
import { HomeBanner } from './Banner'
import { useThemeModeValue } from '@/providers/NextUI'

interface Props {
  children: ReactNode
}

export function Layout(props: Props) {
  const bgColor = useThemeModeValue(`${THEME_COLOR_SCHEME}.50`, `${THEME_COLOR_SCHEME}.900`)
  return (
    <Box margin="0 auto" minH="100vh" bg={useThemeModeValue(`${THEME_COLOR_SCHEME}.100`, `${THEME_COLOR_SCHEME}.800`)}>
      <Header />
      <HomeBanner />
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
