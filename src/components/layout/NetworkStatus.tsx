import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { useBlockNumber, useNetwork } from 'wagmi'
import { LinkComponent } from './LinkComponent'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { random } from 'lodash'
import { ChainId } from '@uniswap/sdk-core'

export function NetworkStatus() {
  const network = useNetwork()
  const block = useBlockNumber({ watch: true, chainId: network?.chain?.id || ChainId.MAINNET })
  const [lastBlockNumber, setLastBlockNumber] = useState<bigint>(0 as unknown as bigint)
  const [direction, setDirection] = useState<string>('upward')
  const [key, setKey] = useState<any>(0)
  useEffect(() => {
    if (block.data === lastBlockNumber) return
    setDirection((block.data as bigint) > lastBlockNumber ? 'upward' : 'downward')
    setKey(random()) // 引产生成新的key使动画重新触发
    setLastBlockNumber(block.data as bigint)
  }, [block, key, lastBlockNumber])
  const slidingAnimation = {
    upward: { y: [-10, 0], opacity: [0, 1] },
    downward: { y: [10, 0], opacity: [0, 1] },
  }
  const explorerUrl = network.chain?.blockExplorers?.default.url

  return (
    <div className={clsx('flex align-middle gap-2 z-2 p-0')}>
      <Button className={'p-0'} as={LinkComponent} href={explorerUrl ? explorerUrl : ''} color="success" variant="light" size={'sm'}>
        <span className={'text-xs'}>{network.chain?.name ?? 'Ethereum'}</span>
        {
          <span>
            #
            <motion.span
              key={key}
              className={'text-xs'}
              initial={{ y: direction === 'upward' ? -10 : 10 }}
              animate={(slidingAnimation as any)[direction]}
              transition={{ type: 'spring', duration: 2 }}>
              {lastBlockNumber?.toString()}
            </motion.span>
          </span>
        }
      </Button>
    </div>
  )
}
