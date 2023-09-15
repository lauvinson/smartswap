import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { useBlockNumber, useFeeData, useNetwork } from 'wagmi'
import { LinkComponent } from './LinkComponent'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { random } from 'lodash'
import { ChainId } from '@uniswap/sdk-core'
import { SupportedNetwork } from '@/constants/networks'
import { formatDollarAmount } from '@/utils/numbers'
import { useEthPrices } from '@/hooks/useEthPrices'
import { useActiveNetworkVersion } from '@/state/application/hooks'
import { FaEthereum, FaGasPump } from 'react-icons/fa6'
import { SiBinance } from 'react-icons/si'

export function NetworkStatus() {
  const network = useNetwork()
  const ethPrices = useEthPrices()
  const { data, isError, isLoading } = useFeeData()
  const [activeNetwork] = useActiveNetworkVersion()
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
    <div className={clsx('flex align-middle gap-2 z-2 p-0 overflow-auto')}>
      <Button
        className={'p-0 justify-start hidden md:block'}
        as={LinkComponent}
        href={explorerUrl ? explorerUrl : ''}
        color="success"
        variant="light"
        size={'sm'}>
        <span className={'text-xs'}>{network.chain?.name ?? 'Ethereum'}</span>
        &nbsp;
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
      <Button className={'p-0 justify-start pointer-events-none'} as={LinkComponent} href={'#'} color="default" variant="light" size={'sm'}>
        <span className={'text-xs flex items-center'}>
          {activeNetwork.id === SupportedNetwork.CELO ? (
            'Celo Price:'
          ) : activeNetwork.id === SupportedNetwork.BNB ? (
            <>
              <SiBinance /> BNB Price:
            </>
          ) : activeNetwork.id === SupportedNetwork.AVALANCHE ? (
            'AVAX Price:'
          ) : (
            <>
              <FaEthereum /> Eth Price:
            </>
          )}
          &nbsp;
          {formatDollarAmount(ethPrices?.current, 2, true, true)}
          {ethPrices?.oneDay && (
            <span className={ethPrices?.current > ethPrices?.oneDay ? 'text-rose-600' : 'text-green-600'}>
              (+{(((ethPrices?.current - ethPrices?.oneDay) / ethPrices?.oneDay) * 100).toFixed(2)})
            </span>
          )}
          &nbsp;&nbsp;
          <FaGasPump />
          &nbsp;
          {!isLoading && !isError ? (
            <span>Gas Price: {data?.formatted.gasPrice} Gwei</span>
          ) : isLoading ? (
            <span>Fetching fee data…</span>
          ) : (
            <span>Error fetching fee data</span>
          )}
        </span>
      </Button>
    </div>
  )
}
