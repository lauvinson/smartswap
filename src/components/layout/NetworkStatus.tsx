import React from 'react'
import { Button } from '@nextui-org/react'
import { useBlockNumber, useNetwork } from 'wagmi'
import { LinkComponent } from './LinkComponent'
import clsx from 'clsx'

export function NetworkStatus() {
  const block = useBlockNumber({ watch: true })
  const network = useNetwork()
  const explorerUrl = network.chain?.blockExplorers?.default.url

  return (
    <div className={clsx('flex align-middle gap-2 z-2 p-1')}>
      <Button as={LinkComponent} href={explorerUrl ? explorerUrl : ''} color="success" variant="light">
        <p className={'text-xs'}>{network.chain?.name ?? 'Ethereum'}</p>
        {explorerUrl && <p className={'text-xs'}># {block.data?.toString()}</p>}
      </Button>
    </div>
  )
}
