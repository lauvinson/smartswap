import React from 'react'
import { SITE_NAME } from 'utils/config'
import ByteLogo from '../../assets/logo/hollow.svg'
import MetamaskLogo from '../../assets/logo/metamask/color.svg'
import { Image } from '@nextui-org/react'
import { useThemeModeValue } from '@/providers/NextUI'
import clsx from 'clsx'
import { getFirstLevelDomain } from '@/utils/window'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  draggable?: boolean
  width?: number
  height?: number
}

const logos = {
  localhost: MetamaskLogo.src,
  'byte.exchange': ByteLogo.src,
  'metamask.digital': MetamaskLogo.src,
}

export function AppLogo({ draggable, width, height, className, ...rest }: Props) {
  const filterValue = useThemeModeValue('invert-0', 'invert')
  const domain = window.location.hostname
  const firstLevelDomain = getFirstLevelDomain(domain)
  const src = logos[firstLevelDomain as any]
  const dynamicClassNames = [className]
  if (firstLevelDomain === 'byte.exchange') {
    dynamicClassNames.push(filterValue)
  }
  return <Image className={clsx(dynamicClassNames)} draggable={draggable} width={width} height={height} src={src} alt={SITE_NAME} {...rest} />
}
