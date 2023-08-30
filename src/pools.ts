import DaiIcon from './assets/icons/dai.svg'
import EthIcon from './assets/icons/eth.svg'
import UsdtIcon from './assets/icons/usdt.svg'

export const abis = {
  approve: [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
}

export interface Token {
  name: string
  address: string
  icon: string
}

export interface Pool {
  id: number
  token0: Token
  token1: Token
  address: string
  fee: number
  apr: number
}

export const pools: Pool[] = [
  {
    id: 1,
    token0: {
      name: 'DAI',
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      icon: DaiIcon.src,
    },
    token1: {
      name: 'ETH',
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      icon: EthIcon.src,
    },
    address: '0x1df52680C823ceA6A154B3187711f8a4F641c453',
    fee: 500,
    apr: 3.58,
  },
  {
    id: 2,
    token0: {
      name: 'ETH',
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      icon: EthIcon.src,
    },
    token1: {
      name: 'USDT',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      icon: UsdtIcon.src,
    },
    address: '0x228246199Dc09e0643fa92eC8268e175986f4e74',
    fee: 3000,
    apr: 5.01,
  },
]
