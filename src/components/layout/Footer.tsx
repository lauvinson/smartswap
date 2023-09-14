import React from 'react'
import { FaGithub, FaTwitter, FaWallet } from 'react-icons/fa'
import { LinkComponent } from './LinkComponent'
import Logo from '../../assets/logo/hollow.svg'
import { SITE_NAME } from '@/utils/config'
import { useThemeModeValue } from '@/providers/NextUI'
import { Image } from '@nextui-org/react'
import clsx from 'clsx'
import { NetworkStatus } from '@/components/layout/NetworkStatus'
import { PriceStatus } from '@/components/layout/PriceStatus'

interface Props {
  className?: string
}

export function Footer(props: Props) {
  const className = props.className ?? ''
  const filterValue = useThemeModeValue('invert-0', 'invert')

  return (
    <div className={'flex justify-items-center align-middle py-10 lg:py-20'}>
      <div className={'container leading-normal'}>
        <div className={'flex gap-2 align-middle mb-5'}>
          <Image draggable={false} className={clsx('lg:10 ', filterValue)} width={35} height={35} src={Logo.src} alt={SITE_NAME} />
        </div>
        <span>Byte Swap Labs</span>
        <span>
          Contact us by{' '}
          <LinkComponent href="mailto:chat@byte.exchange" isExternal={true}>
            <p className={'italic'}>chat@byte.exchange</p>
          </LinkComponent>
        </span>
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
        </div>
        <NetworkStatus />
        <PriceStatus />
      </div>
    </div>
  )
}
