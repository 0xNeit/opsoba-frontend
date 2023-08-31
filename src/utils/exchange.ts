import { JSBI, Percent } from '@pancakeswap/sdk'
import IPancakeRouter02ABI from 'config/abi/IPancakeRouter02.json'
import { IPancakeRouter02 } from 'config/abi/types/IPancakeRouter02'
import {
  BIPS_BASE,
  // INPUT_FRACTION_AFTER_FEE,
  ROUTER_ADDRESS_BY_CHAIN,
} from 'config/constants'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useContract } from 'hooks/useContract'

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(num), BIPS_BASE)
}


export function useRouterContract() {
  const { chainId } = useActiveChainId()
  return useContract<IPancakeRouter02>(ROUTER_ADDRESS_BY_CHAIN[chainId], IPancakeRouter02ABI, true)
}
