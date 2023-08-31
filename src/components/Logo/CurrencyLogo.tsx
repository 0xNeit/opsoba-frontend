import { Currency, Token } from '@pancakeswap/sdk'
import { BinanceIcon } from '@pancakeswap/uikit'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import getTokenLogoURL, { getTokenPath } from '../../utils/getTokenLogoURL'
import Logo from './Logo'

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency.isNative) return []

    if (currency?.isToken) {
      // const tokenLogoURL = getTokenLogoURL(currency.address)
      const tokenLogoPath = getTokenPath(currency)

      if (currency instanceof WrappedTokenInfo) {
        if (!tokenLogoPath) return [...uriLocations]
        return [...uriLocations, tokenLogoPath]
      }
      return [tokenLogoPath]
    }
    return []
  }, [currency, uriLocations])

  if (currency.isNative) {
    return <BinanceIcon width={size} style={style} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
