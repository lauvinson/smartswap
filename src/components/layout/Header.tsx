import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react'
import { SITE_NAME } from 'utils/config'
// import { PassportScore } from './PassportScore'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import Logo from '@/assets/logo/hollow.svg'
import Router from 'next/router'
import { useAccount } from 'wagmi'
import { BeatLoader } from 'react-spinners'
import { useThemeModeValue } from '@/providers/NextUI'
import clsx from 'clsx'
import { getJazziconDataUrl } from '@/utils/jazzicon'
import { useActiveNetworkVersion } from '@/state/application/hooks'
import { NetworkStatus } from '@/components/layout/NetworkStatus'

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

const menuItems = ['Swap', 'Pools', 'Pay', 'Analytics', 'Partner With Byte', 'Deployments', 'Buy Crypto']

export function Header(props: Props) {
  const className = props.className ?? ''
  const filterValue = useThemeModeValue('invert-0', 'invert')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { open } = useWeb3Modal()
  const [activeNetwork] = useActiveNetworkVersion()
  const { address, isConnected, isConnecting, isReconnecting } = useAccount()
  function Home() {
    Router.push('/').then()
  }

  return (
    <>
      <div className={'flex z-40 w-full h-auto items-center justify-center top-0 inset-x-0 bg-background/70'}>
        <div className={'z-40 flex px-6 gap-4 w-full flex-row relative flex-nowrap justify-center md:justify-end max-w-screen-2xl'}>
          <NetworkStatus />
        </div>
      </div>
      <Navbar maxWidth={'2xl'} className={className} isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Image className={clsx(filterValue)} width={35} height={35} onClick={Home} draggable={false} src={Logo.src} alt={SITE_NAME} />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4 font-bold" justify="center">
          <NavbarBrand>
            <Image className={clsx(filterValue)} width={35} height={35} onClick={Home} draggable={false} src={Logo.src} alt={SITE_NAME} />
          </NavbarBrand>
          <NavbarItem>
            <Link color="foreground" href="#">
              Swap
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#" aria-current="page">
              Pools
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Pay
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            {isConnected ? (
              <Avatar
                onClick={() => open()}
                as="button"
                className="transition-transform"
                size="sm"
                title={address}
                style={{ border: '2px solid ' + activeNetwork.primaryColor }}
                src={getJazziconDataUrl(address as string)}
              />
            ) : (
              <Button
                variant="flat"
                onClick={() => open()}
                isLoading={isConnecting || isReconnecting}
                spinner={<BeatLoader size={8} color="white" />}>
                {!isConnecting && !isReconnecting && 'Connect'}
              </Button>
            )}
            {/*{!isConnecting && !isReconnecting && (*/}
            {/*  <div className="text-base">{isConnected ? shortenAddress(address as `0x${string}`) : 'Connect'}</div>*/}
            {/*)}*/}
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="w-full" color={index === 2 ? 'warning' : index === menuItems.length - 1 ? 'danger' : 'foreground'} href="#" size="lg">
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  )
}
