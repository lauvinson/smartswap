import { ThemingProps } from '@chakra-ui/react'
import { mainnet, sepolia, polygon, optimism, arbitrum, bsc, localhost, Chain } from '@wagmi/chains'

export const SITE_NAME = 'Byte Pools'
export const SITE_DESCRIPTION =
  'A Decentralised Finance (DeFi) app with features such as swap, cross chain swap, streaming, vesting, and permissionless market making for liquidity providers.'
export const SITE_URL = 'https://byte.exchange'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'

export const SECOND_COLOR_SCHEME: ThemingProps['colorScheme'] = 'pink'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'vinsonlauvinson'
export const SOCIAL_GITHUB = 'wslyvh/nexth'

// 创建一个自定义个Chain

export const local = {
  id: 1337,
  name: 'hk',
  network: 'hk',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://chain.buhuibaidu.ma/'],
    },
    public: {
      http: ['https://chain.buhuibaidu.ma/'],
    },
  },
}
export const ETH_CHAINS = [local, mainnet, sepolia, polygon, optimism, arbitrum, bsc]

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
