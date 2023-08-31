import React from 'react'
import { Text, TooltipText, useTooltip } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import Balance from 'components/Balance'

interface RecentSobaProfitBalanceProps {
  sobaToDisplay: number
  dollarValueToDisplay: number
  dateStringToDisplay: string
}

const RecentSobaProfitBalance: React.FC<RecentSobaProfitBalanceProps> = ({
  sobaToDisplay,
  dollarValueToDisplay,
  dateStringToDisplay,
}) => {
  const { t } = useTranslation()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Balance fontSize="16px" value={sobaToDisplay} decimals={3} bold unit=" SOBA" />
      <Balance fontSize="16px" value={dollarValueToDisplay} decimals={2} bold prefix="~$" />
      {t('Earned since your last action')}
      <Text>{dateStringToDisplay}</Text>
    </>,
    {
      placement: 'bottom-end',
    },
  )

  return (
    <>
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef} small>
        <Balance fontSize="14px" value={sobaToDisplay} />
      </TooltipText>
    </>
  )
}

export default RecentSobaProfitBalance
