import { ChainId, Token, WBNB } from '@pancakeswap/sdk'
import { BUSD_TESTNET, SOBA_TESTNET } from './common'

export const bscTestnetTokens = {
  wbnb: WBNB[ChainId.TESTNET],
  cake: SOBA_TESTNET,
  busd: BUSD_TESTNET,
  syrup: new Token(
    ChainId.TESTNET,
    '0x97c8c4f6C41Eb0ff135aD0270Ddd4EB2b00931e3',
    18,
    'SYRUP',
    'SyrupBar Token',
    'https://pancakeswap.finance/',
  ),
}
