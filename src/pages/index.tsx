import { Head } from 'components/layout/Head'
import TokensBanner from './applications'
import Transactions from '@/pages/infos'
import { InView } from 'react-intersection-observer'

export default function Home() {
  return (
    <>
      <Head />
      <main>
        <InView rootMargin="50px 0px" triggerOnce={true}>
          {({ inView, ref }) => <div ref={ref}>{inView && <TokensBanner />}</div>}
        </InView>
        <InView triggerOnce={true}>{({ inView, ref }) => <div ref={ref}>{inView && <Transactions />}</div>}</InView>
      </main>
    </>
  )
}
