import React from 'react'
import { FaGithub, FaTwitter, FaWallet } from 'react-icons/fa'
import { LinkComponent } from './LinkComponent'
import { AppLogo } from './AppLogo'
import clsx from 'clsx'
import { NetworkStatus } from '@/components/layout/NetworkStatus'
import { TbMailFilled } from 'react-icons/tb'

interface Props {
  className?: string
}

export function Footer(props: Props) {
  const className = props.className ?? ''

  return (
    <div className={'flex py-10 lg:py-20 mx-auto md:mx-0'}>
      <div className={'flex flex-col items-center md:items-start'}>
        <div className={'gap-2 align-middle mb-5 hidden md:block'}>
          <AppLogo draggable={false} className={clsx('lg:10 ')} width={35} height={35} />
        </div>
        <span>Byte Swap Labs</span>
        <div className={'flex gap-2 align-middle my-2'}>
          <LinkComponent href={`/`}>
            <FaTwitter />
          </LinkComponent>
          <LinkComponent href={`/`}>
            <FaGithub />
          </LinkComponent>
          <LinkComponent href={`/`}>
            <FaWallet />
          </LinkComponent>
          <LinkComponent href={`mailto:chat@byte.exchange`} isExternal={true}>
            <TbMailFilled />
          </LinkComponent>
        </div>
        <NetworkStatus />
      </div>
    </div>
  )
}
