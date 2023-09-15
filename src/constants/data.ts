import { TransactionType } from '@/types'

const txColumns = [
  { name: '', uid: '', ignore: true },
  { name: 'UUID', uid: 'uuid' },
  { name: 'TYPE', uid: 'type' },
  { name: 'HASH', uid: 'hash', sortable: true },
  { name: 'TIMESTAMP', uid: 'timestamp', sortable: true },
  { name: 'TOKEN0SYMBOL', uid: 'token0Symbol', sortable: true },
  { name: 'TOKEN1SYMBOL', uid: 'token1Symbol', sortable: true },
  { name: 'TOKEN0ADDRESS', uid: 'token0Address' },
  { name: 'TOKEN1ADDRESS', uid: 'token1Address' },
  { name: 'AMOUNTUSD', uid: 'amountUSD', sortable: true },
  { name: 'AMOUNTTOKEN0', uid: 'amountToken0', sortable: true },
  { name: 'AMOUNTTOKEN1', uid: 'amountToken1', sortable: true },
  { name: 'SENDER', uid: 'sender', sortable: true },
]

const typeOptions = [
  { name: 'Mint', uid: TransactionType.MINT },
  { name: 'Burn', uid: TransactionType.BURN },
  { name: 'Swap', uid: TransactionType.SWAP },
]

export { txColumns, typeOptions }
