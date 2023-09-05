import { getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useProtocolTransactions } from '@/state/protocol/hooks'
import { useEffect, useMemo, useState } from 'react'

export default function Infos() {
  const [transactions = []] = useProtocolTransactions()
  const [page, setPage] = useState(1)
  const [isLoading, setLoading] = useState(true)

  const rowsPerPage = 10
  const pages = Math.ceil(transactions.length / rowsPerPage)

  useEffect(() => {
    if (transactions.length > 0) {
      setLoading(false)
    }
  }, [transactions])

  const items = useMemo(() => {
    if (isLoading) {
      // Data is still loading, return empty array
      return []
    }
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return transactions.slice(start, end)
  }, [page, transactions, isLoading]) // Depend on isLoading state

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination isCompact showShadow color="secondary" page={page} total={pages} onChange={(page) => setPage(page)} />
        </div>
      }
      classNames={{
        wrapper: 'min-h-[222px]',
      }}>
      <TableHeader>
        <TableColumn key="-">-</TableColumn>
        <TableColumn key="amountUSD">Total Value</TableColumn>
        <TableColumn key="amountToken0">Token Amount</TableColumn>
        <TableColumn key="amountToken1">Token Amount</TableColumn>
        <TableColumn key="sender">Account</TableColumn>
        <TableColumn key="timestamp">Time</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => {
          console.log(item)
          return <TableRow key={item.hash}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>
        }}
      </TableBody>
    </Table>
  )
}
