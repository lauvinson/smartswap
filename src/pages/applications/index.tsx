import { Head } from '@/components/layout/Head'
import { CardList } from '@/components/layout/CardList'
import { pools } from '@/pools'
import React from 'react'

export default function Applications() {
  return (
    <>
      <Head />

      <main>
        {/*<HeadingComponent as="h2">Nexth Examples</HeadingComponent>*/}
        <CardList
          title={
            <>
              <p className={'font-bold text-large md:text-2xl mx-3.5'}>
                Pools <span className={'opacity-50 text-base'}>({pools.length})</span>
              </p>
            </>
          }
          intro={
            <p className={'opacity-50'}>Only the pools with the current network will be displayed. Please switch the network for other pools.</p>
          }
          items={pools}
        />
      </main>
    </>
  )
}
