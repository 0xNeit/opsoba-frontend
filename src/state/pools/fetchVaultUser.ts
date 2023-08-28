import BigNumber from 'bignumber.js'
import { getSobaVaultContract } from 'utils/contractHelpers'

const sobaVaultContract = getSobaVaultContract()

const fetchVaultUser = async (account: string) => {
  try {
    const userContractResponse = await sobaVaultContract.userInfo(account)
    return {
      isLoading: false,
      userShares: new BigNumber(userContractResponse.shares.toString()).toJSON(),
      lastDepositedTime: userContractResponse.lastDepositedTime.toString(),
      lastUserActionTime: userContractResponse.lastUserActionTime.toString(),
      sobaAtLastUserAction: new BigNumber(userContractResponse.sobaAtLastUserAction.toString()).toJSON(),
    }
  } catch (error) {
    return {
      isLoading: true,
      userShares: null,
      lastDepositedTime: null,
      lastUserActionTime: null,
      sobaAtLastUserAction: null,
    }
  }
}

export default fetchVaultUser
