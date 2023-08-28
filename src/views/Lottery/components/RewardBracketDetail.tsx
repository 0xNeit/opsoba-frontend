import React from 'react'
import BigNumber from 'bignumber.js'
import { Flex, Skeleton, Text } from 'opsoba-uikit'
import { useTranslation } from 'contexts/Localization'
import { usePriceSobaBusd } from 'state/farms/hooks'
import Balance from 'components/Balance'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'

interface RewardBracketDetailProps {
  sobaAmount: BigNumber
  rewardBracket?: number
  numberWinners?: string
  isBurn?: boolean
  isHistoricRound?: boolean
  isLoading?: boolean
}

const RewardBracketDetail: React.FC<RewardBracketDetailProps> = ({
  rewardBracket,
  sobaAmount,
  numberWinners,
  isHistoricRound,
  isBurn,
  isLoading,
}) => {
  const { t } = useTranslation()
  const sobaPriceBusd = usePriceSobaBusd()

  const getRewardText = () => {
    const numberMatch = rewardBracket + 1
    if (isBurn) {
      return t('Burn')
    }
    if (rewardBracket === 5) {
      return t('Match all %numberMatch%', { numberMatch })
    }
    return t('Match first %numberMatch%', { numberMatch })
  }

  return (
    <Flex flexDirection="column">
      {isLoading ? (
        <Skeleton mb="4px" mt="8px" height={16} width={80} />
      ) : (
        <Text bold color={isBurn ? 'failure' : 'secondary'}>
          {getRewardText()}
        </Text>
      )}
      <>
        {isLoading || sobaAmount.isNaN() ? (
          <Skeleton my="4px" mr="10px" height={20} width={110} />
        ) : (
          <Balance fontSize="20px" bold unit=" SOBA" value={getBalanceNumber(sobaAmount)} decimals={0} />
        )}
        {isLoading || sobaAmount.isNaN() ? (
          <>
            <Skeleton mt="4px" mb="16px" height={12} width={70} />
          </>
        ) : (
          <Balance
            fontSize="12px"
            color="textSubtle"
            prefix="~$"
            value={getBalanceNumber(sobaAmount.times(sobaPriceBusd))}
            decimals={0}
          />
        )}
        {isHistoricRound && sobaAmount && (
          <>
            {numberWinners !== '0' && (
              <Text fontSize="12px" color="textSubtle">
                {getFullDisplayBalance(sobaAmount.div(parseInt(numberWinners, 10)), 18, 2)} SOBA {t('each')}
              </Text>
            )}
            <Text fontSize="12px" color="textSubtle">
              {numberWinners} {t('Winners')}
            </Text>
          </>
        )}
      </>
    </Flex>
  )
}

export default RewardBracketDetail
