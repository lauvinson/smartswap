import React, { ReactElement, ReactNode, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

import horizontalLoop from '@/utils/gsap'
import clsx from 'clsx'

interface Props {
  children: ReactNode
}

const Slider = (props: Props) => {
  const slider = useRef<HTMLDivElement>(null)
  const loop = useRef<any>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const slides = gsap.utils.toArray('.slide')
      loop.current = horizontalLoop(slides, {
        speed: 0.2,
        repeat: -1,
        paddingRight: 24,
      })
    }, slider)
    return () => {
      loop.current && loop.current.kill()
      ctx.revert()
    }
  }, [])

  return (
    <div className="overflow-hidden">
      <div
        ref={slider}
        className="flex gap-[1.5rem] w-auto py-[1rem]"
        onMouseEnter={() => {
          loop.current && loop.current.pause()
        }}
        onMouseLeave={() => {
          loop.current && loop.current.resume()
        }}>
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as ReactElement, {
              className: clsx(child.props.className, 'slide'),
            })
          }
          return child
        })}
      </div>
    </div>
  )
}

export default Slider
