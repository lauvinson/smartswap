import React, { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { HomeBanner } from './Banner'
import styled from '@emotion/styled'
import { useActiveNetworkVersion } from '@/state/application/hooks'
import { keyframes } from '@emotion/react'

interface Props {
  children: ReactNode
}

const opacityAnimation = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.2; }
`

export const ThemedBackgroundGlobal = styled.div<{ backgroundColor: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  max-width: 100vw !important;
  height: 200vh;
  mix-blend-mode: normal;
  background: ${({ backgroundColor }) => `radial-gradient(50% 50% at 50% 50%, ${backgroundColor} 0%, rgba(255, 255, 255, 0) 70%)`};
  transform: translateY(-80vh) translateX(-50vh);
  opacity: 0.3;
  z-index: -1;
  animation: ${opacityAnimation} 5s ease-in-out infinite;
`

const Container = (props: any) => <div className="flex flex-col flex-1 m-0 max-w-[90%] md:max-w-[80%] mx-auto" {...props} />

export function Layout(props: Props) {
  const [activeNetwork] = useActiveNetworkVersion()
  return (
    <div className="container m-0 max-w-full">
      <Header className={'mb-10 md:mb-20'} />
      <Container>
        <ThemedBackgroundGlobal className="hidden md:block" backgroundColor={activeNetwork.bgColor} />
        <HomeBanner />
        {props.children}
        <Footer />
      </Container>
    </div>
  )
}
