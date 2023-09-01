import { useState, useEffect, useMemo } from 'react'
import { usePriceSobaBusd } from 'state/farms/hooks'
import { useAppDispatch } from 'state'
import orderBy from 'lodash/orderBy'
import { DeserializedPool } from 'state/types'
import { fetchSobaVaultFees, fetchPoolsPublicDataAsync } from 'state/pools'
import { simpleRpcProvider } from 'utils/providers'
import { useSobaVault, usePools } from 'state/pools/hooks'
import { getAprData } from 'views/Pools/helpers'
import { FetchStatus } from 'config/constants/types'

export function usePoolsWithVault() {
  const { pools: poolsWithoutAutoVault } = usePools()
  const {
    fees: { performanceFee },
  } = useSobaVault()
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100
  const pools = useMemo(() => {
    const activePools = poolsWithoutAutoVault.filter((pool) => !pool.isFinished)
    const sobaPool = activePools.find((pool) => pool.sousId === 0)
    const sobaAutoVault = { ...sobaPool, isAutoVault: true }
    const sobaAutoVaultWithApr = {...sobaAutoVault, apr: getAprData(sobaAutoVault, performanceFeeAsDecimal).apr}
    return [sobaAutoVaultWithApr, ...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault, performanceFeeAsDecimal])

  return pools
}

const useGetTopPoolsByApr = (isIntersecting: boolean) => {
  const dispatch = useAppDispatch()

  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle)
  const [topPools, setTopPools] = useState<DeserializedPool[]>([null, null, null, null, null])

  const pools = usePoolsWithVault()

  const sobaPriceBusd = usePriceSobaBusd()

  useEffect(() => {
    const fetchPoolsPublicData = async () => {
      setFetchStatus(FetchStatus.Fetching)
      const blockNumber = await simpleRpcProvider.getBlockNumber()

      try {
        await dispatch(fetchSobaVaultFees())
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
  }, [setTopPools, pools, fetchStatus, sobaPriceBusd, topPools])

  return { topPools }
}

export default useGetTopPoolsByApr
