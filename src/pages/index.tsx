import { Text } from '@chakra-ui/react'
import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { LinkComponent } from 'components/layout/LinkComponent'
import Examples from './examples'

export default function Home() {
  return (
    <>
      <Head />

      <main>
        {/*<HeadingComponent as="h2">Super Node</HeadingComponent>*/}
        {/*<Text>Robust capital and return data</Text>*/}
        {/*<Text py={4}>*/}
        {/*  <LinkComponent href="examples">View examples</LinkComponent> to bootstrap development.*/}
        {/*</Text>*/}
        <Examples />
      </main>
    </>
  )
}
