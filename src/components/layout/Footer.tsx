import React from 'react'
import { Container, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react'
import { FaGithub, FaTwitter, FaWallet } from 'react-icons/fa'
import { LinkComponent } from './LinkComponent'
import Logo from '../../assets/logo/hollow.svg'
import { SITE_NAME } from '../../utils/config'
import { useThemeModeValue } from '@/providers/NextUI'

interface Props {
  className?: string
}

export function Footer(props: Props) {
  const className = props.className ?? ''
  const filterValue = useThemeModeValue('invert(0%)', 'invert(100%)')

  return (
    <Flex as="footer" className={className} flexDirection="column" justifyContent="center" alignItems="center" py={['10', '10', '10', '20']}>
      <Container maxW="container.lg" lineHeight="taller">
        <Image draggable={false} filter={filterValue} mb={['5', '5', '10', '10']} objectFit="contain" maxW="35px" src={Logo.src} alt={SITE_NAME} />
        <Text>Byte Swap Labs</Text>
        <Text>
          Contact us by{' '}
          <LinkComponent href="mailto:chat@byte.exchange" isExternal={true}>
            <Text as="cite">chat@byte.exchange</Text>
          </LinkComponent>
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
