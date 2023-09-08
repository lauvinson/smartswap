import React, { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { HomeBanner } from './Banner'

interface Props {
  children: ReactNode
}

const Container = (props: any) => <div className="flex flex-col flex-1 m-0 max-w-[90%] md:max-w-[80%] mx-auto" {...props} />

export function Layout(props: Props) {
  return (
    <div className="container m-0 max-w-full">
      <Header className={'mb-10 md:mb-20'} />
      <Container>
        <HomeBanner />
        {props.children}
        <Footer />
      </Container>
    </div>
  )
}
