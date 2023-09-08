import React from 'react'
import { Button, Image } from '@nextui-org/react'
import { SITE_NAME } from 'utils/config'
import { ThemeSwitcher } from './ThemeSwitcher'
// import { PassportScore } from './PassportScore'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import Logo from '../../assets/logo/color.svg'
import Router from 'next/router'
import { useAccount } from 'wagmi'
import { BeatLoader } from 'react-spinners'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

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
    <div className="flex justify-between p-4 md:pl-16 md:pr-16 mb-8">
      <Image width={35} height={35} onClick={Home} draggable={false} src={Logo.src} alt={SITE_NAME} />

      <div className="flex justify-center gap-4">
        {/*<PassportScore />*/}
        <Button variant="flat" onClick={() => open()} isLoading={isConnecting || isReconnecting} spinner={<BeatLoader size={8} color="white" />}>
          {isConnected && <Jazzicon diameter={14} seed={jsNumberForAddress(address as string)} />}
          {!isConnecting && !isReconnecting && <div className="text-base">{isConnected ? shortenAddress(address as `0x${string}`) : 'Connect'}</div>}
        </Button>
        {/*<Web3NetworkSwitch />*/}
        <ThemeSwitcher />
      </div>
    </div>
  )
}
