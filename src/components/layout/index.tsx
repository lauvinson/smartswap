import React, { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { NetworkStatus } from './NetworkStatus'
import { HomeBanner } from './Banner'

interface Props {
  children: ReactNode
}

export function Layout(props: Props) {
  return (
    <div className="container m-0 max-w-full">
      <Header />
      <HomeBanner />
      <div className="container m-0 max-w-[80%] mx-auto md:pb-10 ">
        <div>{props.children}</div>
      </div>
      <div className="fixed bottom-2 right-2">
        <NetworkStatus />
      </div>
      <div className="container m-0 max-w-3/4 mx-auto">
        <Footer />
      </div>
    </div>
  )
}
