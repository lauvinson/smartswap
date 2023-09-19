import React, { Key, useCallback, useEffect, useMemo, useState } from 'react'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Selection,
  Skeleton,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaFilterCircleDollar } from 'react-icons/fa6'
import { txColumns, typeOptions } from '@/constants/data'
import { capitalize } from '@/utils'
import { useProtocolTransactions } from '@/state/protocol/hooks'
import { Transaction, TransactionType } from '@/types'
import { getTimeAgo } from '@/utils/data'
import { formatAmount, formatDollarAmount } from '@/utils/numbers'
import { BeatLoader } from 'react-spinners'
import { useThemeModeValue } from '@/providers/NextUI'
import CurrencyLogo from '@/components/CurrencyLogo'
import { useMediaQuery } from 'usehooks-ts'

const INITIAL_VISIBLE_COLUMNS = ['', 'type', 'amountToken0', 'amountToken1', 'amountUSD', 'timestamp', 'sender']

const TableSkeleton: React.FC = () => {
  return (
    <div className="max-w-full w-full flex flex-col items-center gap-3">
      <Skeleton className="flex rounded-lg w-full h-8" />
      <Skeleton className="flex rounded-lg w-full h-32" />
    </div>
  )
}

export default function Index() {
  const [txs = []] = useProtocolTransactions()
  const spinnerColor = useThemeModeValue('black', 'white')
  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS))
  const [typeFilter, setTypeFilter] = useState<Selection>('all')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  })
  const inputVariant = useThemeModeValue('flat', 'flat')
  const scrollbarColor = useThemeModeValue('scrollbar-thumb-gray-300', 'scrollbar-thumb-gray-500')
  const contentIconColor = useThemeModeValue('#71717a', '#71717a')
  const md = useMediaQuery('(min-width: 768px)')

  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return txColumns

    return txColumns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  const filteredItems = useMemo(() => {
    let filteredTxs = [...txs]

    if (hasSearchFilter) {
      filteredTxs = filteredTxs.filter((tx) => tx.sender.toLowerCase().includes(filterValue.toLowerCase()))
    }

    if (typeFilter !== 'all' && Array.from(typeFilter).length !== typeOptions.length) {
      filteredTxs = filteredTxs.filter((tx) => Array.from(typeFilter).includes(tx.type.toString()))
    }
    return filteredTxs
  }, [txs, hasSearchFilter, typeFilter, filterValue])

  useEffect(() => {
    if (txs.length > 0) {
      setIsLoading(false)
    }
  }, [txs])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Transaction, b: Transaction) => {
      const first = a[sortDescriptor.column as keyof Transaction] as number
      const second = b[sortDescriptor.column as keyof Transaction] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = useCallback((tx: Transaction, columnKey: Key) => {
    const cellValue = tx[columnKey as keyof Transaction]

    switch (columnKey) {
      case '':
        return (
          <div className="flex space-x-2 items-center">
            <div className="flex -space-x-2 space-y-2">
              <CurrencyLogo address={tx.token0Address} className="w-7 h-7 text-tiny flex-shrink-0" alt={tx.token0Symbol} />
              <CurrencyLogo address={tx.token1Address} className="w-7 h-7 text-tiny flex-shrink-0" alt={tx.token1Symbol} />
            </div>
            <span className={'font-bold'}>
              {tx.token0Symbol} <span className={'font-light opacity-50'}>/</span> {tx.token1Symbol}
            </span>
          </div>
        )
      case 'type':
        return <p>{cellValue === TransactionType.MINT ? `Mint` : cellValue === TransactionType.SWAP ? `Swap` : `Burn`}</p>
      case 'sender':
        return <p>{cellValue}</p>
      case 'hash':
        return <p>{cellValue}</p>
      case 'timestamp':
        return getTimeAgo(cellValue as number)
      case 'amountUSD':
        return formatDollarAmount(Math.abs(cellValue as number))
      case 'amountToken0':
      case 'amountToken1':
        return (
          <p className={'flex justify-start space-x-2'}>
            <span>{formatAmount(Math.abs(cellValue as number))} </span>
          </p>
        )
      default:
        return cellValue
    }
  }, [])

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-large">Transactions</span>
        </div>
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            size={'sm'}
            className="w-full sm:max-w-[30%]"
            placeholder="Search"
            startContent={<FaFilterCircleDollar color={contentIconColor} />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            variant={inputVariant}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button size={'sm'} endContent={<FaChevronDown className="text-small" />} variant={inputVariant}>
                  Type
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={typeFilter}
                selectionMode="multiple"
                onSelectionChange={setTypeFilter}>
                {typeOptions.map((type) => (
                  <DropdownItem key={type.uid} className="capitalize">
                    {capitalize(type.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button size={'sm'} endContent={<FaChevronDown className="text-small" />} variant={inputVariant}>
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}>
                {txColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    )
  }, [contentIconColor, filterValue, onSearchChange, inputVariant, typeFilter, visibleColumns, onClear])

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          Page {page} of {pages}
        </span>
        {/*<Pagination isCompact showControls showShadow color="primary" page={page} total={pages} onChange={setPage} />*/}
        <div className="flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1 || page === 1} size="sm" variant="light" onPress={onPreviousPage}>
            <FaChevronLeft />
          </Button>
          <Button isDisabled={pages === 1 || page === pages} size="sm" variant="light" onPress={onNextPage}>
            <FaChevronRight />
          </Button>
        </div>
      </div>
    )
  }, [page, pages, onPreviousPage, onNextPage])

  const classNames = useMemo(
    () => ({
      wrapper: ['max-h-[auto]', md ? 'scrollbar' : '', md ? scrollbarColor : scrollbarColor, 'bg-background/70 backdrop-blur-lg'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    [md, scrollbarColor]
  )

  return (
    <div>
      {sortedItems ? (
        <Table
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={classNames}
          selectedKeys={selectedKeys}
          // selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}>
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn key={column.uid} align={'start'} allowsSorting={column.sortable}>
                {column.uid}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody isLoading={isLoading} loadingContent={<BeatLoader size={20} color={spinnerColor} />} emptyContent={' '} items={sortedItems}>
            {(item) => (
              <TableRow key={item.uuid}>
                {(columnKey) => (
                  <TableCell className={'overflow-hidden overflow-ellipsis whitespace-nowrap'}>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <TableSkeleton />
      )}
    </div>
  )
}
