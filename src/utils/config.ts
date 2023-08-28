import { ThemingProps } from '@chakra-ui/react'
import { mainnet, sepolia, polygon, optimism, arbitrum, bsc, localhost, Chain } from '@wagmi/chains'

export const SITE_NAME = 'Smart Swap'
export const SITE_DESCRIPTION = 'turns V3 liquidity pools into hassle-free V2 liquidity pools.'
export const SITE_URL = 'https://nexth.vercel.app'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'x'
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
