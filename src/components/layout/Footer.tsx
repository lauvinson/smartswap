import React from 'react'
import { FaGithub, FaTwitter, FaWallet } from 'react-icons/fa'
import { LinkComponent } from './LinkComponent'
import Logo from '../../assets/logo/hollow.svg'
import { SITE_NAME } from '@/utils/config'
import { useThemeModeValue } from '@/providers/NextUI'
import { Image } from '@nextui-org/react'
import clsx from 'clsx'

interface Props {
  className?: string
}

export function Footer(props: Props) {
  const className = props.className ?? ''
  const filterValue = useThemeModeValue('invert-0', 'invert')

  return (
    <div className={'flex justify-items-center align-middle py-10 lg:py-20'}>
      <div className={'container leading-normal'}>
        <Image draggable={false} className={clsx('mb-5 lg:10 ', filterValue)} width={35} height={35} src={Logo.src} alt={SITE_NAME} />
        <p>Byte Swap Labs</p>
        <p>
          Contact us by{' '}
          <LinkComponent href="mailto:chat@byte.exchange" isExternal={true}>
            <p className={'italic'}>chat@byte.exchange</p>
          </LinkComponent>
        </p>
        <div className={'flex gap-2 align-middle mt-2'}>
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
      </div>
    </div>
  )
}
