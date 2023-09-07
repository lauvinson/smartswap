import React, { ReactNode } from 'react'
import NextLink from 'next/link'
import { Link } from '@nextui-org/react'

interface Props {
  href: string
  children: ReactNode
  isExternal?: boolean
  className?: string
}

export function LinkComponent(props: Props) {
  const className = props.className ?? ''
  const isExternal = props.href.match(/^([a-z0-9]*:|.{0})\/\/.*$/) || props.isExternal

  if (isExternal) {
    return (
      <Link className={className} color="foreground" href={props.href} target="_blank" rel="noopener noreferrer">
        {props.children}
      </Link>
    )
  }

  return (
    <Link as={NextLink} className={className} color="foreground" href={props.href}>
      {props.children}
    </Link>
  )
}
