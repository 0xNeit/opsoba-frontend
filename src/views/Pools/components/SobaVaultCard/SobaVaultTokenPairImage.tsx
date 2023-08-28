import React from 'react'
import { TokenPairImage, ImageProps } from 'opsoba-uikit'
import { mainnetTokens } from 'config/constants/tokens'

const SobaVaultTokenPairImage: React.FC<Omit<ImageProps, 'src'>> = (props) => {
  const primaryTokenSrc = `/images/tokens/${mainnetTokens.soba.address}.svg`

  return <TokenPairImage primarySrc={primaryTokenSrc} secondarySrc="/images/tokens/autorenew.svg" {...props} />
}

export default SobaVaultTokenPairImage
