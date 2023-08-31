import { Currency, Token } from '@pancakeswap/sdk'

export function currencyId(currency: Currency): string {
  if (currency?.isNative) return 'BNB'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
