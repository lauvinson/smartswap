import { Head } from 'components/layout/Head'
import Applications from './applications'
import Transactions from '@/pages/infos'

export default function Home() {
  return (
    <>
      <Head />
      <main>
        <Applications />
        <Transactions />
      </main>
    </>
  )
}
