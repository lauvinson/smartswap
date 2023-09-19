import { Head } from 'components/layout/Head'
import { InView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'
import { ComponentLoadingPage } from '@/components/Loading'
import React from 'react'

const TokensBanner = dynamic(() => import('../components/Token').then((mod) => mod.TokensBanner), { loading: () => <ComponentLoadingPage /> })
const Transactions = dynamic(() => import('@/components/Transaction').then((mod) => mod.default), {
  loading: () => <ComponentLoadingPage />,
})

export default function Home() {
  return (
    <>
      <Head />
      <main className={'space-y-5'}>
        <InView rootMargin="50px 0px" triggerOnce={true}>
          {({ inView, ref }) => <div ref={ref}>{inView && <TokensBanner />}</div>}
        </InView>
        <InView triggerOnce={true}>{({ inView, ref }) => <div ref={ref}>{inView && <Transactions />}</div>}</InView>
      </main>
    </>
  )
}
