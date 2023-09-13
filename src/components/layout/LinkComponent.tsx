import React, { ReactNode } from 'react'
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
        <div>{props.children}</div>
      </Link>
    )
  }

  return (
    <Link className={className} color="foreground" href={props.href}>
      <div>{props.children}</div>
    </Link>
  )
}
