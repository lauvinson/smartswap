import { useNetwork } from 'wagmi'
import { useEffect } from 'react'
import { SUPPORTED_NETWORK_VERSIONS } from '../../constants/networks'
import { useDispatch } from 'react-redux'
import { updateActiveNetworkVersion } from '../application/actions'
import { useActiveNetworkVersion } from '../application/hooks'
import { useProtocolData, useProtocolTransactions } from '../protocol/hooks'

export default function Updater(): null {
  const dispatch = useDispatch()
  const { chain } = useNetwork()
  const [activeNetwork, update] = useActiveNetworkVersion()
  const [protocolData] = useProtocolData()
  const [transactions] = useProtocolTransactions()
  useEffect(() => {
    if (!chain) return
    const networkInfo = SUPPORTED_NETWORK_VERSIONS.filter((e) => e.chainId === chain.id)?.[0]
    if (networkInfo) {
      dispatch(updateActiveNetworkVersion({ activeNetworkVersion: networkInfo }))
    }
  }, [chain])

  useEffect(() => {
    activeNetwork && console.log(activeNetwork)
  }, [activeNetwork])

  useEffect(() => {
    protocolData && console.log(protocolData)
  }, [protocolData])

  useEffect(() => {
    transactions && console.log(transactions)
  }, [transactions])

  return null
}
