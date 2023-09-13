import tokens from './tokens'
import { SerializedFarmConfig } from './types'

const priceHelperLps: SerializedFarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absence of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  {
    pid: null,
    lpSymbol: 'QSD-BNB LP',
    lpAddresses: {
      5611: '0x4c4b9a2b2f85bc938b8b1da9d9f71878c6bf137f',
      204: '0x5950332b3c61f9c322557e1cc41ff3ca168b41b3',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
]

export default priceHelperLps
