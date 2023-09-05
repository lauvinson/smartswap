import React from 'react'
import { Flex, Image, Spacer, Text } from '@chakra-ui/react'
import { Button } from '@nextui-org/react'
import { SITE_NAME, THEME_COLOR_SCHEME } from 'utils/config'
import { ThemeSwitcher } from './ThemeSwitcher'
import { PassportScore } from './PassportScore'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import Logo from '../../assets/logo/color.svg'
import Router from 'next/router'
import { useAccount } from 'wagmi'
import { BeatLoader } from 'react-spinners'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { useThemeModeValue } from '@/providers/NextUI'

interface Props {
  className?: string
}

function shortenAddress(str: `0x${string}`, startLength: number = 4, endLength: number = 4): string {
  if (str.length <= startLength + endLength) {
    return str
  }

  const start = str.substring(0, startLength)
  const end = str.substring(str.length - endLength)

  return `${start}...${end}`
}

export function Header(props: Props) {
  const className = props.className ?? ''
  const { open } = useWeb3Modal()
  const { address, isConnected, isConnecting, isReconnecting } = useAccount()
  function Home() {
    Router.push('/').then()
  }

  return (
    <Flex
      as="header"
      className={className}
      borderBottom="1px"
      borderColor={useThemeModeValue(`${THEME_COLOR_SCHEME}.200`, `${THEME_COLOR_SCHEME}.700`)}
      px={4}
      py={4}
      pl={['4', '4', '16', '16']}
      pr={['4', '4', '16', '16']}
      mb={8}
      alignItems="center">
      <Image onClick={Home} draggable={false} objectFit="contain" maxW="35px" src={Logo.src} alt={SITE_NAME} />

      <Spacer />

      <Flex alignItems="center" gap={4}>
        <PassportScore />
        <Button variant="flat" onClick={() => open()} isLoading={isConnecting || isReconnecting} spinner={<BeatLoader size={8} color="white" />}>
          {isConnected && <Jazzicon diameter={14} seed={jsNumberForAddress(address as string)} />}
          {!isConnecting && !isReconnecting && <Text ml={2}>{isConnected ? shortenAddress(address as `0x${string}`) : 'Connect'}</Text>}
        </Button>
        {/*<Web3NetworkSwitch />*/}
        <ThemeSwitcher />
      </Flex>
    </Flex>
  )
}
