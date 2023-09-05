import { useNetwork } from 'wagmi'
import { useEffect } from 'react'
import { SUPPORTED_NETWORK_VERSIONS } from '@/constants/networks'
import { useDispatch } from 'react-redux'
import { updateActiveNetworkVersion } from '../application/actions'
import { useActiveNetworkVersion } from '../application/hooks'

export default function Updater(): null {
  const dispatch = useDispatch()
  const { chain } = useNetwork()
  const [activeNetwork, update] = useActiveNetworkVersion()
  useEffect(() => {
    if (!chain) return
    const networkInfo = SUPPORTED_NETWORK_VERSIONS.filter((e) => e.chainId === chain.id)?.[0]
    if (networkInfo) {
      dispatch(updateActiveNetworkVersion({ activeNetworkVersion: networkInfo }))
    }
  }, [chain, dispatch])

  useEffect(() => {
    activeNetwork && console.log(activeNetwork)
  }, [activeNetwork])

  return null
}
