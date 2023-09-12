import dynamic from 'next/dynamic'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
const NoSSR = (props: Props) => <React.Fragment>{props.children}</React.Fragment>

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
})
