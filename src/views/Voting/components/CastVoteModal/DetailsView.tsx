import React from 'react'
import { Text, Flex } from 'opsoba-uikit'
import { useTranslation } from 'contexts/Localization'
import { formatNumber } from 'utils/formatBalance'
import { VotingBox, ModalInner } from './styles'

interface DetailsViewProps {
  total: number
  sobaBalance: number
  sobaVaultBalance: number
  sobaPoolBalance: number
  poolsBalance: number
  sobaBnbLpBalance: number
  ifoPoolBalance: number
}

const DetailsView: React.FC<DetailsViewProps> = ({
  total,
  sobaBalance,
  sobaVaultBalance,
  sobaPoolBalance,
  poolsBalance,
  sobaBnbLpBalance,
  ifoPoolBalance,
}) => {
  const { t } = useTranslation()

  return (
    <ModalInner mb="0">
      <Text as="p" mb="24px" fontSize="14px" color="textSubtle">
        {t(
          'Your voting power is determined by the amount of SOBA you held at the block detailed below. SOBA held in other places does not contribute to your voting power.',
        )}
      </Text>
      <Text color="secondary" textTransform="uppercase" mb="4px" bold fontSize="14px">
        {t('Overview')}
      </Text>
      <VotingBox>
        <Text color="secondary">{t('Your Voting Power')}</Text>
        <Text bold fontSize="20px">
          {formatNumber(total, 0, 3)}
        </Text>
      </VotingBox>
      <Text color="secondary" textTransform="uppercase" mb="4px" bold fontSize="14px">
        {t('Your Soba Held Now')}
      </Text>
      <Flex alignItems="center" justifyContent="space-between" mb="4px">
        <Text color="textSubtle" fontSize="16px">
          {t('Wallet')}
        </Text>
        <Text textAlign="right">{formatNumber(sobaBalance, 0, 3)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="4px">
        <Text color="textSubtle" fontSize="16px">
          {t('Manual SOBA Pool')}
        </Text>
        <Text textAlign="right">{formatNumber(sobaPoolBalance, 0, 3)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="4px">
        <Text color="textSubtle" fontSize="16px">
          {t('Auto SOBA Pool')}
        </Text>
        <Text textAlign="right">{formatNumber(sobaVaultBalance, 0, 3)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="4px">
        <Text color="textSubtle" fontSize="16px">
          {t('IFO Pool')}
        </Text>
        <Text textAlign="right">{formatNumber(ifoPoolBalance, 0, 3)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="4px">
        <Text color="textSubtle" fontSize="16px">
          {t('Other Syrup Pools')}
        </Text>
        <Text textAlign="right">{formatNumber(poolsBalance, 0, 3)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="4px">
        <Text color="textSubtle" fontSize="16px">
          {t('SOBA BNB LP')}
        </Text>
        <Text textAlign="right">{formatNumber(sobaBnbLpBalance, 0, 3)}</Text>
      </Flex>
    </ModalInner>
  )
}

export default DetailsView
