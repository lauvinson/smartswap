import { ReactNode } from 'react'
import clsx from 'clsx'

interface Props {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  children: ReactNode
  className?: string
}

export function HeadingComponent(props: Props) {
  const className = props.className ?? ''
  let size
  switch (props.as) {
    case 'h1':
      size = props.size ?? '2xl'
      break
    case 'h2':
      size = props.size ?? 'lg'
      break
    case 'h3':
      size = props.size ?? 'medium'
      break
    case 'h4':
      size = props.size ?? 'base'
      break
    case 'h5':
      size = props.size ?? 'sm'
      break
    case 'h6':
      size = props.size ?? 'xs'
      break
  }

  return <props.as className={clsx(className, 'mb-2', 'text-' + size)}>{props.children}</props.as>
}
