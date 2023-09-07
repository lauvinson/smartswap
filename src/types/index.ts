export interface State<T> {
  loading: boolean
  data?: T
  error?: string
}

export interface PassportStamp {
  version: string
  credential: {
    type: string[]
    proof: {
      jws: string
      type: string
      created: string
      proofPurpose: string
      verificationMethod: string
    }
    issuer: string
    '@context': string[]
    issuanceDate: string
    expirationDate: string
    credentialSubject: {
      id: string
      hash: string
      '@context': [
        {
          hash: string
          provider: string
        }
      ]
      provider: string
    }
  }
  metadata?: {
    description: string
    group: string
    hash: string
    name: string
    platform: {
      id: string
      icon: string
      name: string
      description: string
      connectMessage: string
    }
  }
}

export interface Block {
  number: number
  timestamp: string
}

export enum VolumeWindow {
  daily,
  weekly,
  monthly,
}

export interface ChartDayData {
  date: number
  volumeUSD: number
  tvlUSD: number
}

export interface GenericChartEntry {
  time: string
  value: number
}

export enum TransactionType {
  SWAP,
  MINT,
  BURN,
}

export type Transaction = {
  uuid: string
  type: TransactionType
  hash: string
  timestamp: string
  sender: string
  token0Symbol: string
  token1Symbol: string
  token0Address: string
  token1Address: string
  amountUSD: number
  amountToken0: number
  amountToken1: number
}

/**
 * Formatted type for Candlestick charts
 */
export type PriceChartEntry = {
  time: number // unix timestamp
  open: number
  close: number
  high: number
  low: number
}
