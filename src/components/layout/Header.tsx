import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react'
// import { PassportScore } from './PassportScore'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import Router from 'next/router'
import { useAccount } from 'wagmi'
import { BeatLoader } from 'react-spinners'
import { getJazziconDataUrl } from '@/utils/jazzicon'
import { useActiveNetworkVersion } from '@/state/application/hooks'
import { NetworkStatus } from '@/components/layout/NetworkStatus'
import { AppLogo } from '@/components/layout/AppLogo'
import { useOnlineStatus } from '@/components/layout/OnlineStatus'
import { RiWifiOffLine } from 'react-icons/ri'
import { LinkComponent } from '@/components/layout/LinkComponent'
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

const menuItems = ['Swap', 'Pools', 'Pay', 'Analytics', 'Partner With Byte', 'Deployments', 'Buy Crypto']

export function Header(props: Props) {
  const isOnline = useOnlineStatus()
  const spinnerColor = useThemeModeValue('black', 'white')
  const className = props.className ?? ''
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { open } = useWeb3Modal()
  const [activeNetwork] = useActiveNetworkVersion()
  const { address, isConnected, isConnecting, isReconnecting } = useAccount()
  const divRef = useRef<HTMLDivElement>(null)
  const [maxWidth, setMaxWidth] = useState('')
  useEffect(() => {
    if (divRef.current && divRef.current?.firstElementChild) {
      const computedStyle = getComputedStyle(divRef.current?.firstElementChild)

      setMaxWidth(computedStyle.width)
    }
  }, [])
  useEffect(() => {
    // 跟随主题变更meta color
    let metaThemeColor = document.querySelector('meta[name=theme-color]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', activeNetwork.bgColor)
    }

    // Change background color
    let metaBackgroundColor = document.querySelector('meta[name=background-color]')
    if (metaBackgroundColor) {
      metaBackgroundColor.setAttribute('content', activeNetwork.bgColor)
    }
  }, [activeNetwork])

  function Home() {
    Router.push('/').then()
  }

  return (
    <>
      <div className={'z-40 h-auto items-center justify-center top-0 inset-x-0 bg-background/70 overflow-auto'}>
        <div className={'z-40 flex px-6 gap-4 flex-row relative flex-nowrap justify-center md:justify-end w-[' + maxWidth + ']'}>
          {isOnline ? (
            <NetworkStatus />
          ) : (
            <Button className={'p-0 justify-start pointer-events-none'} as={LinkComponent} href={'#'} color="default" variant="light" size={'sm'}>
              <span className={'text-xs flex items-center text-warning'}>
                <RiWifiOffLine /> &nbsp; Offline, please check the network.
              </span>
            </Button>
          )}
        </div>
      </div>
      <Navbar ref={divRef} maxWidth={'2xl'} className={className} isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <AppLogo width={35} height={35} onClick={Home} draggable={false} />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4 font-bold" justify="center">
          <NavbarBrand>
            <AppLogo width={35} height={35} onClick={Home} draggable={false} />
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
                spinner={<BeatLoader size={8} color={spinnerColor} />}>
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
