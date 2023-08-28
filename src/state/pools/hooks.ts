import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { simpleRpcProvider } from 'utils/providers'
import { useFastFresh, useSlowFresh } from 'hooks/useRefresh'
import {
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  fetchSobaVaultPublicData,
  fetchSobaVaultUserData,
  fetchSobaVaultFees,
  fetchPoolsStakingLimitsAsync,
} from '.'
import { State, DeserializedPool } from '../types'
import { transformPool } from './helpers'

export const useFetchPublicPoolsData = () => {
  const dispatch = useAppDispatch()
  const slowRefresh = useSlowFresh()

  useEffect(() => {
    const fetchPoolsPublicData = async () => {
      const blockNumber = await simpleRpcProvider.getBlockNumber()
      dispatch(fetchPoolsPublicDataAsync(blockNumber))
    }

    fetchPoolsPublicData()
    dispatch(fetchPoolsStakingLimitsAsync())
  }, [dispatch, slowRefresh])
}

export const useFetchUserPools = (account) => {
  const fastRefresh = useFastFresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])
}

export const usePools = (): { pools: DeserializedPool[]; userDataLoaded: boolean } => {
  const { pools, userDataLoaded } = useSelector((state: State) => ({
    pools: state.pools.data,
    userDataLoaded: state.pools.userDataLoaded,
  }))
  return { pools: pools.map(transformPool), userDataLoaded }
}

export const useFetchSobaVault = () => {
  const { account } = useWeb3React()
  const fastRefresh = useFastFresh()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchSobaVaultPublicData())
  }, [dispatch, fastRefresh])

  useEffect(() => {
    dispatch(fetchSobaVaultUserData({ account }))
  }, [dispatch, fastRefresh, account])

  useEffect(() => {
    dispatch(fetchSobaVaultFees())
  }, [dispatch])
}

export const useSobaVault = () => {
  const {
    totalShares: totalSharesAsString,
    pricePerFullShare: pricePerFullShareAsString,
    totalSobaInVault: totalSobaInVaultAsString,
    estimatedSobaBountyReward: estimatedSobaBountyRewardAsString,
    totalPendingSobaHarvest: totalPendingSobaHarvestAsString,
    fees: { performanceFee, callFee, withdrawalFee, withdrawalFeePeriod },
    userData: {
      isLoading,
      userShares: userSharesAsString,
      sobaAtLastUserAction: sobaAtLastUserActionAsString,
      lastDepositedTime,
      lastUserActionTime,
    },
  } = useSelector((state: State) => state.pools.sobaVault)

  const estimatedSobaBountyReward = useMemo(() => {
    return new BigNumber(estimatedSobaBountyRewardAsString)
  }, [estimatedSobaBountyRewardAsString])

  const totalPendingSobaHarvest = useMemo(() => {
    return new BigNumber(totalPendingSobaHarvestAsString)
  }, [totalPendingSobaHarvestAsString])

  const totalShares = useMemo(() => {
    return new BigNumber(totalSharesAsString)
  }, [totalSharesAsString])

  const pricePerFullShare = useMemo(() => {
    return new BigNumber(pricePerFullShareAsString)
  }, [pricePerFullShareAsString])

  const totalSobaInVault = useMemo(() => {
    return new BigNumber(totalSobaInVaultAsString)
  }, [totalSobaInVaultAsString])

  const userShares = useMemo(() => {
    return new BigNumber(userSharesAsString)
  }, [userSharesAsString])

  const sobaAtLastUserAction = useMemo(() => {
    return new BigNumber(sobaAtLastUserActionAsString)
  }, [sobaAtLastUserActionAsString])

  return {
    totalShares,
    pricePerFullShare,
    totalSobaInVault,
    estimatedSobaBountyReward,
    totalPendingSobaHarvest,
    fees: {
      performanceFee,
      callFee,
      withdrawalFee,
      withdrawalFeePeriod,
    },
    userData: {
      isLoading,
      userShares,
      sobaAtLastUserAction,
      lastDepositedTime,
      lastUserActionTime,
    },
  }
}
