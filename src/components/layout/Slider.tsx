import React, { ReactElement, ReactNode, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

import horizontalLoop from '@/utils/gsap'
import clsx from 'clsx'
import { InView } from 'react-intersection-observer'

let scheduled = false
let value = 0

function adjustAnimation(loop: any) {
  gsap.to(loop, { duration: value === 0 ? 1 : 2, timeScale: value })
  scheduled = false
}

function throttleTimeScaleChange(loop: any, newValue: number) {
  value = newValue
  if (!scheduled) {
    scheduled = true
    requestAnimationFrame(() => adjustAnimation(loop))
  }
}

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
        speed: 0.5,
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
      <InView
        onChange={(inView, entry) => {
          if (!inView) {
            loop.current && throttleTimeScaleChange(loop.current, 0)
          } else {
            loop.current && throttleTimeScaleChange(loop.current, 1)
          }
        }}></InView>
      <div ref={slider} className="flex gap-[1.5rem] w-auto py-[1rem]">
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as ReactElement, {
              className: clsx(child.props.className, 'slide'),
              onMouseEnter: () => {
                loop.current && throttleTimeScaleChange(loop.current, 0)
              },
              onMouseLeave: () => {
                loop.current && throttleTimeScaleChange(loop.current, 1)
              },
            })
          }
          return child
        })}
      </div>
    </div>
  )
}

export default Slider
