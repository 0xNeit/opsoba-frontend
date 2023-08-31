import React from 'react'
import { Flex, Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { usePriceSobaBusd } from 'state/farms/hooks'
import { useSobaVault } from 'state/pools/hooks'
import { getSobaVaultEarnings } from 'views/Pools/helpers'
import RecentSobaProfitBalance from './RecentSobaProfitBalance'

const RecentSobaProfitCountdownRow = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const {
    pricePerFullShare,
    userData: { sobaAtLastUserAction, userShares, lastUserActionTime },
  } = useSobaVault()
  const sobaPriceBusd = usePriceSobaBusd()
  const { hasAutoEarnings, autoSobaToDisplay, autoUsdToDisplay } = getSobaVaultEarnings(
    account,
    sobaAtLastUserAction,
    userShares,
    pricePerFullShare,
    sobaPriceBusd.toNumber(),
  )

  const lastActionInMs = lastUserActionTime && parseInt(lastUserActionTime) * 1000
  const dateTimeLastAction = new Date(lastActionInMs)
  const dateStringToDisplay = dateTimeLastAction.toLocaleString()

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="14px">{`${t('Recent SOBA profit')}:`}</Text>
      {hasAutoEarnings && (
        <RecentSobaProfitBalance
          sobaToDisplay={autoSobaToDisplay}
          dollarValueToDisplay={autoUsdToDisplay}
          dateStringToDisplay={dateStringToDisplay}
        />
      )}
    </Flex>
  )
}

export default RecentSobaProfitCountdownRow
