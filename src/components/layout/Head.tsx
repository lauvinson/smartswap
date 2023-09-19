import React, { useEffect, useState } from 'react'
import { default as NextHead } from 'next/head'
import { SITE_DESCRIPTION, SITE_NAME } from 'utils/config'
import IconHead from 'next/head'
import { getFirstLevelDomain } from '@/utils/window'

interface Props {
  title?: string
  description?: string
}

const logos: { [key: string]: string } = {
  localhost: '/metamask.png',
  'byte.exchange': '/favicon.png',
  'metamask.digital': '/metamask.png',
}

interface IconProps {
  rel: string
  sizes?: string
  type?: string
}

export const IconHandling = (props: IconProps) => {
  const [icon, setIcon] = useState<string>('/favicon.png')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIcon(logos[getFirstLevelDomain(window.location.hostname)])
    }
  }, [])

  return (
    <IconHead>
      <link type={props.type} rel={props.rel} sizes={props.sizes} href={icon} />
    </IconHead>
  )
}

export function Head(props: Props) {
  return (
    <NextHead>
      <title>{props.title ?? SITE_NAME}</title>
      <meta name="description" content={props.description ?? SITE_DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </NextHead>
  )
}
