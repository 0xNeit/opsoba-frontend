import { useWeb3React } from '@pancakeswap/wagmi'
import BigNumber from 'bignumber.js'
import tokens from 'config/constants/tokens'
import { FAST_INTERVAL, SLOW_INTERVAL } from 'contexts/RefreshContext'
import { ethers } from 'ethers'
import useSWR from 'swr'
import { BIG_ZERO } from 'utils/bigNumber'
import { simpleRpcProvider } from 'utils/providers'
import { useSoba, useTokenContract } from './useContract'
import { useSWRContract } from './useSWRContract'

const useTokenBalance = (tokenAddress: string) => {
  const { account } = useWeb3React()

  const contract = useTokenContract(tokenAddress, false)
  const { data, status, ...rest } = useSWRContract(
    account
      ? {
          contract,
          methodName: 'balanceOf',
          params: [account],
        }
      : null,
    {
      refreshInterval: FAST_INTERVAL,
    },
  )

  return {
    ...rest,
    fetchStatus: status,
    balance: data ? new BigNumber(data.toString()) : BIG_ZERO,
  }
}

export const useTotalSupply = () => {
  const sobaContract = useSoba()
  const { data } = useSWRContract([sobaContract, 'totalSupply'], {
    refreshInterval: SLOW_INTERVAL,
  })

  return data ? new BigNumber(data.toString()) : null
}

export const useBurnedBalance = (tokenAddress: string) => {
  const contract = useTokenContract(tokenAddress, false)
  const { data } = useSWRContract([contract, 'balanceOf', ['0x000000000000000000000000000000000000dEaD']], {
    refreshInterval: SLOW_INTERVAL,
  })

  return data ? new BigNumber(data.toString()) : BIG_ZERO
}

export const useGetBnbBalance = () => {
  const { account } = useWeb3React()
  const { status, data, mutate } = useSWR([account, 'bnbBalance'], async () => {
    return simpleRpcProvider.getBalance(account)
  })

  return { balance: data || ethers.constants.Zero, fetchStatus: status, refresh: mutate }
}

export const useGetSobaBalance = () => {
  const { balance, fetchStatus } = useTokenBalance(tokens.soba.address)

  // TODO: Remove ethers conversion once useTokenBalance is converted to ethers.BigNumber
  return { balance: ethers.BigNumber.from(balance.toString()), fetchStatus }
}

export default useTokenBalance
