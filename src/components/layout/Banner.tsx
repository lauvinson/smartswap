import React from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

interface Props {
  className?: string
}

export function HomeBanner(props: Props) {
  const className = props.className ?? ''
  const router = useRouter()

  if (router.pathname !== '/') {
    return <></>
  }

  return (
    <div className={clsx('grid gap-4 md:grid-cols-3 grid-cols-1 grid-rows-2', className)}>
      <div className="inline-grid col-start-1 col-end-4 row-start-1 row-end-2 text-center md:text-left">
        <div className="text-3xl md:text-5xl font-bold">
          Put your funds <br /> to work by <br /> providing liquidity.
        </div>
      </div>
      <div className="inline-grid col-start-1 col-end-3 row-start-2 row-end-3 text-center md:text-left">
        <div className="text-large md:text-2xl font-light">
          Providing liquidity to a pool allows you to earn a percentage of the pools traded volume as well as any extra rewards if the pool is
          incentivized.
        </div>
      </div>
    </div>
  )
}
