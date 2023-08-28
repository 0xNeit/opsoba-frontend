import BigNumber from 'bignumber.js'
import { convertSharesToSoba } from 'views/Pools/helpers'
import { multicallv2 } from 'utils/multicall'
import sobaVaultAbi from 'config/abi/sobaVault.json'
import { getSobaVaultAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'

export const fetchPublicVaultData = async () => {
  try {
    const calls = [
      'getPricePerFullShare',
      'totalShares',
      'calculateHarvestSobaRewards',
      'calculateTotalPendingSobaRewards',
    ].map((method) => ({
      address: getSobaVaultAddress(),
      name: method,
    }))

    const [[sharePrice], [shares], [estimatedSobaBountyReward], [totalPendingSobaHarvest]] = await multicallv2(
      sobaVaultAbi,
      calls,
    )

    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    const totalSobaInVaultEstimate = convertSharesToSoba(totalSharesAsBigNumber, sharePriceAsBigNumber)
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalSobaInVault: totalSobaInVaultEstimate.sobaAsBigNumber.toJSON(),
      estimatedSobaBountyReward: new BigNumber(estimatedSobaBountyReward.toString()).toJSON(),
      totalPendingSobaHarvest: new BigNumber(totalPendingSobaHarvest.toString()).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      pricePerFullShare: null,
      totalSobaInVault: null,
      estimatedSobaBountyReward: null,
      totalPendingSobaHarvest: null,
    }
  }
}

export const fetchVaultFees = async () => {
  try {
    const calls = ['performanceFee', 'callFee', 'withdrawFee', 'withdrawFeePeriod'].map((method) => ({
      address: getSobaVaultAddress(),
      name: method,
    }))

    const [[performanceFee], [callFee], [withdrawalFee], [withdrawalFeePeriod]] = await multicallv2(sobaVaultAbi, calls)

    return {
      performanceFee: performanceFee.toNumber(),
      callFee: callFee.toNumber(),
      withdrawalFee: withdrawalFee.toNumber(),
      withdrawalFeePeriod: withdrawalFeePeriod.toNumber(),
    }
  } catch (error) {
    return {
      performanceFee: null,
      callFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

export default fetchPublicVaultData
