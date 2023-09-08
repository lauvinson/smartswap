import { Head } from 'components/layout/Head'
import Applications from '../deprecated'
import Infos from '@/pages/infos'

export default function Home() {
  return (
    <>
      <Head />
      <main>
        <Applications />
        <Infos />
      </main>
    </>
  )
}
