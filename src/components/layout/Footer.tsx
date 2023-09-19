import React from 'react'
import { FaGithub, FaTwitter, FaWallet } from 'react-icons/fa'
import { LinkComponent } from './LinkComponent'
import { NetworkStatus } from '@/components/layout/NetworkStatus'
import { Handjet } from 'next/font/google'
import { TbMailFilled } from 'react-icons/tb'

interface Props {
  className?: string
}

const handjet = Handjet({
  weight: '200',
  subsets: ['latin'],
  display: 'swap',
})

export function Footer(props: Props) {
  const className = props.className ?? ''

  return (
    <div className={'flex py-10 lg:py-20 mx-auto md:mx-0'}>
      <div className={'flex flex-col items-center md:items-start'}>
        <span className={handjet.className}>Byte Swap Labs</span>
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
