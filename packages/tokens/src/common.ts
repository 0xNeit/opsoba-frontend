import { ChainId, Token } from '@pancakeswap/sdk'

export const SOBA_MAINNET = new Token(
  ChainId.MAINNET,
  '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
  18,
  'SOBA',
  'SobaSwap Token',
  'https://pancakeswap.finance/',
)

export const SOBA_TESTNET = new Token(
  ChainId.TESTNET,
  '0x5643b96d07e49DECc24D8b559a00d63498AEa47B',
  18,
  'SOBA',
  'SobaSwap Token',
  'https://pancakeswap.finance/',
)

export const USDC_MAINNET = new Token(
  ChainId.MAINNET,
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  18,
  'USDC',
  'Binance-Peg USD Coin',
  'https://www.centre.io/usdc',
)

export const USDC_TESTNET = new Token(
  ChainId.TESTNET,
  '0x64544969ed7EBf5f083679233325356EbE738930',
  18,
  'USDC',
  'Binance-Peg USD Coin',
  'https://www.centre.io/usdc',
)

export const USDT_MAINNET = new Token(
  ChainId.MAINNET,
  '0x55d398326f99059fF775485246999027B3197955',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const BUSD_MAINNET = new Token(
  ChainId.MAINNET,
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_TESTNET = new Token(
  ChainId.TESTNET,
  '0xb1A54003bF3D37F12c6b78a6b75F951199800ad0',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)


export const BUSD: Record<ChainId, Token> = {
  [ChainId.MAINNET]: BUSD_MAINNET,
  [ChainId.TESTNET]: BUSD_TESTNET,
}

export const SOBA = {
  [ChainId.MAINNET]: SOBA_MAINNET,
  [ChainId.TESTNET]: SOBA_TESTNET,
}

export const USDC = {
  [ChainId.MAINNET]: USDC_MAINNET,
  [ChainId.TESTNET]: USDC_TESTNET,
}

export const USDT = {
  [ChainId.MAINNET]: USDT_MAINNET,
}

export const WBTC_TESTNET = new Token(
  ChainId.TESTNET,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC',
)
