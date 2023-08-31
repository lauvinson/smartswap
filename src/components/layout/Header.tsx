import React from 'react'
import { Flex, useColorModeValue, Spacer, Heading, Img, Image } from '@chakra-ui/react'
import { SITE_NAME, THEME_COLOR_SCHEME } from 'utils/config'
import { LinkComponent } from './LinkComponent'
import { ThemeSwitcher } from './ThemeSwitcher'
import { PassportScore } from './PassportScore'
import { Web3Button, Web3NetworkSwitch } from '@web3modal/react'
import Logo from '../../assets/logo/stroke.svg'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const className = props.className ?? ''

  return (
    <Flex
      as="header"
      className={className}
      borderBottom="1px"
      borderColor={useColorModeValue(`${THEME_COLOR_SCHEME}.200`, `${THEME_COLOR_SCHEME}.700`)}
      px={4}
      py={4}
      pl={['4', '4', '16', '16']}
      pr={['4', '4', '16', '16']}
      mb={8}
      alignItems="center">
      <LinkComponent href="/">
        <Image draggable={false} objectFit="contain" maxW="35px" src={Logo.src} alt={SITE_NAME} />
      </LinkComponent>

      <Spacer />

      <Flex alignItems="center" gap={4}>
        <PassportScore />
        <Web3Button icon="hide" avatar="show" label="Connect" />
        {/*<Web3NetworkSwitch />*/}
        <ThemeSwitcher />
      </Flex>
    </Flex>
  )
}
