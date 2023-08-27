import { useState, useEffect, useMemo } from 'react'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useAppDispatch } from 'state'
import { orderBy } from 'lodash'
import { DeserializedPool } from 'state/types'
import { fetchCakeVaultFees, fetchPoolsPublicDataAsync } from 'state/pools'
import { simpleRpcProvider } from 'utils/providers'
import { useCakeVault, usePools } from 'state/pools/hooks'
import { getAprData } from 'views/Pools/helpers'
import { FetchStatus } from 'config/constants/types'

export function usePoolsWithVault() {
  const { pools: poolsWithoutAutoVault } = usePools()
  const {
    fees: { performanceFee },
  } = useCakeVault()
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100
  const pools = useMemo(() => {
    const activePools = poolsWithoutAutoVault.filter((pool) => !pool.isFinished)
    const cakePool = activePools.find((pool) => pool.sousId === 0)
    const cakeAutoVault = { ...cakePool, isAutoVault: true }
    const cakeAutoVaultWithApr = {...cakeAutoVault, apr: getAprData(cakeAutoVault, performanceFeeAsDecimal).apr}
    return [cakeAutoVaultWithApr, ...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault, performanceFeeAsDecimal])

  return pools
}

const useGetTopPoolsByApr = (isIntersecting: boolean) => {
  const dispatch = useAppDispatch()

  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle)
  const [topPools, setTopPools] = useState<DeserializedPool[]>([null, null, null, null, null])

  const pools = usePoolsWithVault()

  const cakePriceBusd = usePriceCakeBusd()

  useEffect(() => {
    const fetchPoolsPublicData = async () => {
      setFetchStatus(FetchStatus.Fetching)
      const blockNumber = await simpleRpcProvider.getBlockNumber()

      try {
        await dispatch(fetchCakeVaultFees())
        await dispatch(fetchPoolsPublicDataAsync(blockNumber))
        setFetchStatus(FetchStatus.Fetched)
      } catch (e) {
        console.error(e)
        setFetchStatus(FetchStatus.Failed)
      }
    }

    if (isIntersecting && fetchStatus === FetchStatus.Idle) {
      fetchPoolsPublicData()
    }
  }, [dispatch, setFetchStatus, fetchStatus, topPools, isIntersecting])

  useEffect(() => {
    const getTopPoolsByApr = (activePools: DeserializedPool[]) => {
      const sortedByApr = orderBy(activePools, (pool: DeserializedPool) => pool.apr || 0, 'desc')
      setTopPools(sortedByApr.slice(0, 5))
    }
    if (fetchStatus === FetchStatus.Fetched && !topPools[0]) {
      getTopPoolsByApr(pools)
    }
  }, [setTopPools, pools, fetchStatus, cakePriceBusd, topPools])

  return { topPools }
}

export default useGetTopPoolsByApr
