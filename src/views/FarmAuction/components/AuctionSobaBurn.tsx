import React, { useState, useEffect } from 'react'
import { Text, Flex, Skeleton, Image } from 'opsoba-uikit'
import { useFarmAuctionContract } from 'hooks/useContract'
import { useTranslation } from 'contexts/Localization'
import { usePriceSobaBusd } from 'state/farms/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { ethersToBigNumber } from 'utils/bigNumber'
import Balance from 'components/Balance'
import styled from 'styled-components'

const BurnedText = styled(Text)`
  font-size: 52px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 64px;
  }
`

const AuctionSobaBurn: React.FC = () => {
  const [burnedSobaAmount, setBurnedSobaAmount] = useState(0)
  const { t } = useTranslation()
  const farmAuctionContract = useFarmAuctionContract(false)
  const sobaPriceBusd = usePriceSobaBusd()

  const burnedAmountAsUSD = sobaPriceBusd.times(burnedSobaAmount)

  useEffect(() => {
    const fetchBurnedSobaAmount = async () => {
      try {
        const amount = await farmAuctionContract.totalCollected()
        const amountAsBN = ethersToBigNumber(amount)
        setBurnedSobaAmount(getBalanceNumber(amountAsBN))
      } catch (error) {
        console.error('Failed to fetch burned auction soba', error)
      }
    }
    if (burnedSobaAmount === 0) {
      fetchBurnedSobaAmount()
    }
  }, [burnedSobaAmount, farmAuctionContract])
  return (
    <Flex flexDirection={['column-reverse', null, 'row']}>
      <Flex flexDirection="column" flex="2">
        {burnedSobaAmount !== 0 ? (
          <Balance fontSize="64px" bold value={burnedSobaAmount} decimals={0} unit=" SOBA" />
        ) : (
          <Skeleton width="256px" height="64px" />
        )}
        <BurnedText textTransform="uppercase" bold color="secondary">
          {t('Burned')}
        </BurnedText>
        <Text fontSize="24px" bold>
          {t('through community auctions so far!')}
        </Text>
        {!burnedAmountAsUSD.isNaN() && !burnedAmountAsUSD.isZero() ? (
          <Text color="textSubtle">
            ~${burnedAmountAsUSD.toNumber().toLocaleString('en', { maximumFractionDigits: 0 })}
          </Text>
        ) : (
          <Skeleton width="128px" />
        )}
      </Flex>
      <Image width={350} height={320} src="/images/burnt-cake.png" alt={t('Burnt SOBA')} />
    </Flex>
  )
}

export default AuctionSobaBurn
