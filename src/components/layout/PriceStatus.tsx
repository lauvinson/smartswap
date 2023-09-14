import React from 'react'
import { Button } from '@nextui-org/react'
import { LinkComponent } from './LinkComponent'
import clsx from 'clsx'
import { useActiveNetworkVersion } from '@/state/application/hooks'
import { useEthPrices } from '@/hooks/useEthPrices'
import { SupportedNetwork } from '@/constants/networks'
import { formatDollarAmount } from '@/utils/numbers'

export function PriceStatus() {
  const ethPrices = useEthPrices()
  const [activeNetwork] = useActiveNetworkVersion()

  return (
    <div className={clsx('flex align-middle gap-2 z-2 p-0')}>
      <Button className={'p-0 justify-start'} color="success" variant="light" size={'sm'}></Button>
    </div>
  )
}
