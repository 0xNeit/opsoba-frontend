import { ChainId } from 'opsoba-sdk'

const NETWORK_URLS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: 'https://opbnb-mainnet-rpc.bnbchain.org',
  [ChainId.TESTNET]: 'https://opbnb-testnet.nodereal.io/v1/9989d39cb7484ee9abcec2132a242315',
}

export default NETWORK_URLS
