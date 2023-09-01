import React from 'react'
import { Container, Flex, Image, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { FaGithub, FaTwitter, FaWallet } from 'react-icons/fa'
import { LinkComponent } from './LinkComponent'
import { SECOND_COLOR_SCHEME, THEME_COLOR_SCHEME } from 'utils/config'
import Logo from '../../assets/logo/hollow.svg'

interface Props {
  className?: string
}

export function Footer(props: Props) {
  const className = props.className ?? ''
  const bgColor = useColorModeValue(`${THEME_COLOR_SCHEME}.50`, `${THEME_COLOR_SCHEME}.900`)
  const filterValue = useColorModeValue('invert(0%)', 'invert(100%)')

  return (
    <Flex as="footer" className={className} bg={bgColor} flexDirection="column" justifyContent="center" alignItems="center" mt={20} py={20}>
      <Container maxW="container.lg" lineHeight="taller">
        <Image draggable={false} filter={filterValue} mb={10} objectFit="contain" maxW="35px" src={Logo.src} />
        <Text>Byte Swap Labs</Text>
        <Text>
          Contact us by{' '}
          <Link href="mailto:chat@byte.exchange" as="cite">
            chat@byte.exchange
          </Link>
        </Text>
        <Flex gap={2} alignItems="center" mt={2}>
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
