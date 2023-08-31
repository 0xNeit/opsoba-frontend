import { Token } from "@pancakeswap/sdk"

const getTokenLogoURL = (address: string) =>
  `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${address}/logo.png`

export default getTokenLogoURL

export const getTokenPath = (token?: Token) => {
  return `/images/tokens/${token.address}.png`
}
