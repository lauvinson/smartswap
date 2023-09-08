import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { isAddress } from 'utils'
import { useCombinedActiveList } from 'state/lists/hooks'
import useHttpLocations from 'hooks/useHttpLocations'
import { useActiveNetworkVersion } from 'state/application/hooks'
import { OptimismNetworkInfo } from 'constants/networks'
import EthereumLogo from '../../assets/images/ethereum-logo.svg'
import { ChainId } from '@uniswap/sdk-core'
import Logo from '@/components/Logo'

export function chainIdToNetworkName(networkId: ChainId) {
  switch (networkId) {
    case ChainId.MAINNET:
      return 'ethereum'
    case ChainId.ARBITRUM_ONE:
      return 'arbitrum'
    case ChainId.OPTIMISM:
      return 'optimism'
    case ChainId.POLYGON:
      return 'polygon'
    case ChainId.BNB:
      return 'smartchain'
    case ChainId.BASE:
      return 'base'
    default:
      return 'ethereum'
  }
}

const getTokenLogoURL = ({ address, chainId }: { address: string; chainId: ChainId }) => {
  return `https://raw.githubusercontent.com/uniswap/assets/master/blockchains/${chainIdToNetworkName(chainId)}/assets/${address}/logo.png`
}

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
  address,
  size = 'md',
  style,
  className = '',
  alt = 'sm',
  ...rest
}: {
  address?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  alt?: string
  style?: React.CSSProperties
}) {
  // useOptimismList()
  const optimismList = useCombinedActiveList()?.[10]
  const arbitrumList = useCombinedActiveList()?.[42161]
  const polygon = useCombinedActiveList()?.[137]
  const celo = useCombinedActiveList()?.[42220]
  const bnbList = useCombinedActiveList()?.[ChainId.BNB]
  const baseList = useCombinedActiveList()?.[ChainId.BASE]

  const [activeNetwork] = useActiveNetworkVersion()

  const checkSummed = isAddress(address)

  const optimismURI = useMemo(() => {
    if (checkSummed && optimismList?.[checkSummed]) {
      return optimismList?.[checkSummed].token.logoURI
    }
    return undefined
  }, [checkSummed, optimismList])
  const uriLocationsOptimism = useHttpLocations(optimismURI)

  const arbitrumURI = useMemo(() => {
    if (checkSummed && arbitrumList?.[checkSummed]) {
      return arbitrumList?.[checkSummed].token.logoURI
    }
    return undefined
  }, [checkSummed, arbitrumList])
  const uriLocationsArbitrum = useHttpLocations(arbitrumURI)

  const BNBURI = useMemo(() => {
    if (checkSummed && bnbList?.[checkSummed]) {
      return bnbList?.[checkSummed].token.logoURI
    }
    return undefined
  }, [checkSummed, bnbList])
  const uriLocationsBNB = useHttpLocations(BNBURI)

  const BaseURI = useMemo(() => {
    if (checkSummed && baseList?.[checkSummed]) {
      return baseList?.[checkSummed].token.logoURI
    }
    return undefined
  }, [checkSummed, baseList])
  const uriLocationsBase = useHttpLocations(BaseURI)

  const polygonURI = useMemo(() => {
    if (checkSummed && polygon?.[checkSummed]) {
      return polygon?.[checkSummed].token.logoURI
    }
    return undefined
  }, [checkSummed, polygon])
  const uriLocationsPolygon = useHttpLocations(polygonURI)

  const celoURI = useMemo(() => {
    if (checkSummed && celo?.[checkSummed]) {
      return celo?.[checkSummed].token.logoURI
    }
    return undefined
  }, [checkSummed, celo])
  const uriLocationsCelo = useHttpLocations(celoURI)

  //temp until token logo issue merged
  const tempSources: { [address: string]: string } = useMemo(() => {
    return {
      ['0x4dd28568d05f09b02220b09c2cb307bfd837cb95']: 'https://assets.coingecko.com/coins/images/18143/thumb/wCPb0b88_400x400.png?1630667954',
    }
  }, [])

  const srcs: string[] = useMemo(() => {
    const checkSummed = isAddress(address)

    if (checkSummed && address) {
      const override = tempSources[address]
      return [
        getTokenLogoURL({ address: checkSummed, chainId: activeNetwork.chainId }),
        ...uriLocationsOptimism,
        ...uriLocationsArbitrum,
        ...uriLocationsPolygon,
        ...uriLocationsCelo,
        ...uriLocationsBNB,
        ...uriLocationsBase,
        override,
      ]
    }
    return []
  }, [
    address,
    tempSources,
    activeNetwork.chainId,
    uriLocationsOptimism,
    uriLocationsArbitrum,
    uriLocationsPolygon,
    uriLocationsCelo,
    uriLocationsBNB,
    uriLocationsBase,
  ])

  if (activeNetwork === OptimismNetworkInfo && address === '0x4200000000000000000000000000000000000006') {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} {...rest} />
  }

  // @ts-ignore
  return <StyledLogo className={className} size={size} srcs={srcs} alt={alt} style={style} {...rest} />
}
