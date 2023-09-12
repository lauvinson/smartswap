import React, { useState } from 'react'
import { HelpCircle } from 'react-feather'
import { Avatar } from '@nextui-org/react'

const BAD_SRCS: { [tokenAddress: string]: true } = {}

export interface LogoProps {
  alt: string
  srcs: string[]
  size: 'sm' | 'md' | 'lg'
  className: string
  style: React.CSSProperties
}

/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
export default function Logo({ srcs, alt, size, className, ...rest }: LogoProps) {
  const [, refresh] = useState<number>(0)

  const src: string | undefined = srcs.find((src) => !BAD_SRCS[src])

  if (src) {
    return (
      <Avatar
        {...rest}
        alt={alt}
        className={className}
        size={size}
        src={src}
        onError={() => {
          if (src) BAD_SRCS[src] = true
          refresh((i) => i + 1)
        }}
      />
    )
  }

  return <HelpCircle size={'32'} {...rest} />
}
