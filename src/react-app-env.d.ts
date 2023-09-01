/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    isMetaMask?: true
    isTrust?: true
    isCoinbaseWallet?: true
    isTokenPocket?: true
    request?: (...args: any[]) => Promise<void>
  }
  BinanceChain?: {
    bnbSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>
  }
}

type SerializedBigNumber = string
