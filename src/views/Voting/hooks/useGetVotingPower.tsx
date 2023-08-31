import { useState, useEffect } from 'react'
import { useWeb3React } from '@pancakeswap/wagmi'
import { getActivePools } from 'utils/calls'
import { getAddress } from 'utils/addressHelpers'
import { simpleRpcProvider } from 'utils/providers'
import { getVotingPower } from '../helpers'

interface State {
  verificationHash: string
  sobaBalance: number
  sobaVaultBalance: number
  sobaPoolBalance: number
  poolsBalance: number
  sobaBnbLpBalance: number
  ifoPoolBalance: number
  total: number
}

const initialState: State = {
  verificationHash: null,
  sobaBalance: 0,
  sobaVaultBalance: 0,
  sobaPoolBalance: 0,
  poolsBalance: 0,
  sobaBnbLpBalance: 0,
  ifoPoolBalance: 0,
  total: 0,
}

const useGetVotingPower = (block?: number, isActive = true): State & { isLoading: boolean } => {
  const { account } = useWeb3React()
  const [votingPower, setVotingPower] = useState(initialState)
  const [isLoading, setIsLoading] = useState(!!account)

  useEffect(() => {
    const fetchVotingPower = async () => {
      setIsLoading(true)

      try {
        const blockNumber = block || (await simpleRpcProvider.getBlockNumber())
        const eligiblePools = await getActivePools(blockNumber)
        const poolAddresses = eligiblePools.map(({ contractAddress }) => getAddress(contractAddress))
        const {
          sobaBalance,
          sobaBnbLpBalance,
          sobaPoolBalance,
          total,
          poolsBalance,
          sobaVaultBalance,
          verificationHash,
          IFOPoolBalance,
        } = await getVotingPower(account, poolAddresses, blockNumber)

        if (isActive) {
          setVotingPower((prevVotingPower) => ({
            ...prevVotingPower,
            verificationHash,
            sobaBalance: parseFloat(sobaBalance),
            sobaBnbLpBalance: parseFloat(sobaBnbLpBalance),
            sobaPoolBalance: parseFloat(sobaPoolBalance),
            poolsBalance: parseFloat(poolsBalance),
            sobaVaultBalance: parseFloat(sobaVaultBalance),
            ifoPoolBalance: IFOPoolBalance ? parseFloat(IFOPoolBalance) : 0,
            total: parseFloat(total),
          }))
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (account && isActive) {
      fetchVotingPower()
    }
  }, [account, block, setVotingPower, isActive, setIsLoading])

  return { ...votingPower, isLoading }
}

export default useGetVotingPower
