import { Head } from 'components/layout/Head'
import Examples from './applications'

export default function Home() {
  return (
    <>
      <Head />

      <main>
        {/*<HeadingComponent as="h2">Super Node</HeadingComponent>*/}
        {/*<Text>Robust capital and return data</Text>*/}
        {/*<Text py={4}>*/}
        {/*  <LinkComponent href="applications">View applications</LinkComponent> to bootstrap development.*/}
        {/*</Text>*/}
        <Examples />
      </main>
    </>
  )
}
