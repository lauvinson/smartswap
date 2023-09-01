import React from 'react'
import { Container, Flex, Image, Text } from '@chakra-ui/react'
import { FaGithub, FaTwitter, FaWallet } from 'react-icons/fa'
import { LinkComponent } from './LinkComponent'
import { THEME_COLOR_SCHEME } from 'utils/config'
import Logo from '../../assets/logo/hollow.svg'

interface Props {
  className?: string
}

export function Footer(props: Props) {
  const className = props.className ?? ''

  return (
    <Flex
      as="footer"
      className={className}
      bg={`${THEME_COLOR_SCHEME}.900`}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt={20}
      py={20}>
      <Container maxW="container.lg" lineHeight="taller">
        <Image draggable={false} filter="invert(100%)" mb={10} objectFit="contain" maxW="30px" src={Logo.src} />
        <Text opacity={0.5}>Byte Swap Labs</Text>
        <Text opacity={0.5}>Contact us by chat@byte.exchange</Text>
        <Flex color="gray.500" gap={2} alignItems="center" mt={2}>
          <LinkComponent href={`/`}>
            <FaTwitter />
          </LinkComponent>
          <LinkComponent href={`/`}>
            <FaGithub />
          </LinkComponent>
          <LinkComponent href={`/`}>
            <FaWallet />
          </LinkComponent>
        </Flex>
      </Container>
    </Flex>
  )
}
