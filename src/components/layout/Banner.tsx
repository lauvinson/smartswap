import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useActiveNetworkVersion } from '@/state/application/hooks'
import styled from '@emotion/styled'

interface Props {
  className?: string
}

const words = ['Put your funds', 'Impl your decision', 'With the family']

const variants = {
  initial: { y: '-50%', opacity: 0 },
  animate: { y: '0%', opacity: 1 },
  exit: { y: '50%', opacity: 0 },
}

const GradientText = styled.span<{ c1: string; c2: string; c3: string }>`
  display: inline-block;
  background: linear-gradient(to right, ${({ c1 }) => c1}, ${({ c2 }) => c2}, ${({ c3 }) => c3});
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
`

export function HomeBanner(props: Props) {
  const className = props.className ?? ''
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [activeNetwork] = useActiveNetworkVersion()

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % words.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  if (router.pathname !== '/') {
    return <></>
  }

  return (
    <div className={clsx('grid gap-4 md:grid-cols-3 grid-cols-1 grid-rows-2', className)}>
      <div className="inline-grid col-start-1 col-end-4 row-start-1 row-end-2 text-center md:text-left">
        <div className="text-3xl md:text-5xl font-bold overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={words[index]} initial="initial" animate="animate" exit="exit" variants={variants} transition={{ duration: 0.5 }}>
              <GradientText c1={activeNetwork.secondaryColor} c2={activeNetwork.primaryColor} c3={activeNetwork.bgColor}>
                {words[index]}
              </GradientText>
            </motion.span>
          </AnimatePresence>
          <br /> to work by <br /> providing liquidity.
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
