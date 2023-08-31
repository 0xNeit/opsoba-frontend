import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useProviderOrSigner } from 'hooks/useProviderOrSigner'
import {
  getBep20Contract,
  getSobaContract,
  getBunnyFactoryContract,
  getBunnySpecialContract,
  getPancakeRabbitContract,
  getProfileContract,
  getIfoV1Contract,
  getIfoV2Contract,
  getMasterchefContract,
  getPointCenterIfoContract,
  getSouschefContract,
  getClaimRefundContract,
  getTradingCompetitionContract,
  getTradingCompetitionContractV2,
  getEasterNftContract,
  getErc721Contract,
  getSobaVaultContract,
  getIfoPoolContract,
  getPredictionsContract,
  getChainlinkOracleContract,
  getSouschefV2Contract,
  getLotteryV2Contract,
  getBunnySpecialSobaVaultContract,
  getBunnySpecialPredictionContract,
  getFarmAuctionContract,
  getBunnySpecialLotteryContract,
  getAnniversaryAchievementContract,
  getNftMarketContract,
  getNftSaleContract,
  getPancakeSquadContract,
  getErc721CollectionContract,
  getBunnySpecialXmasContract,
} from 'utils/contractHelpers'
import { getMulticallAddress } from 'utils/addressHelpers'
import { VaultKey } from 'state/types'
import {
  Soba,
  SobaVault,
  EnsPublicResolver,
  EnsRegistrar,
  Erc20,
  Erc20Bytes32,
  Erc721collection,
  IfoPool,
  Multicall,
  Weth,
} from 'config/abi/types'
import { useSigner } from 'wagmi'

// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import { ChainId, WNATIVE } from '@pancakeswap/sdk'
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import ENS_PUBLIC_RESOLVER_ABI from '../config/abi/ens-public-resolver.json'
import ENS_ABI from '../config/abi/ens-registrar.json'
import { ERC20_BYTES32_ABI } from '../config/abi/erc20'
import ERC20_ABI from '../config/abi/erc20.json'
import WETH_ABI from '../config/abi/weth.json'
import multiCallAbi from '../config/abi/Multicall.json'
import { getContract } from '../utils'
import { useActiveChainId } from './useActiveChainId'
// import { provider } from 'utils/wagmi'

const IUniswapV2PairABI = IUniswapV2Pair.abi

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoV1Contract = (address: string) => {
  const { data: signer } = useSigner()
  return useMemo(() => getIfoV1Contract(address, signer), [address, signer])
}

export const useIfoV2Contract = (address: string) => {
  const { data: signer } = useSigner()
  return useMemo(() => getIfoV2Contract(address, signer), [address, signer])
}

export const useERC20 = (address: string, withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(
    () => getBep20Contract(address, providerOrSigner), [address, providerOrSigner],
  )
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string, withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getErc721Contract(address, providerOrSigner), [address, providerOrSigner])
}

/* export const useSoba = (): { reader: Soba; signer: Soba } => {
  const providerOrSigner = useProviderOrSigner()
  return useMemo(
    () => ({
      reader: getSobaContract(null),
      signer: getSobaContract(providerOrSigner),
    }),
    [providerOrSigner],
  )
} */

export const useSoba = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getSobaContract(signer), [signer])
}

export const useBunnyFactory = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnyFactoryContract(signer), [signer])
}

export const usePancakeRabbits = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getPancakeRabbitContract(signer), [signer])
}

export const useProfileContract = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(
    () => getProfileContract(providerOrSigner), [providerOrSigner],
  )
}

export const useLotteryV2Contract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getLotteryV2Contract(signer), [signer])
}

export const useMasterchef = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getMasterchefContract(signer), [signer])
}

export const useSousChef = (id) => {
  const { data: signer } = useSigner()
  return useMemo(() => getSouschefContract(id, signer), [id, signer])
}

export const useSousChefV2 = (id) => {
  const { data: signer } = useSigner()
  return useMemo(() => getSouschefV2Contract(id, signer), [id, signer])
}

export const usePointCenterIfoContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getPointCenterIfoContract(signer), [signer])
}

export const useBunnySpecialContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnySpecialContract(signer), [signer])
}

export const useClaimRefundContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getClaimRefundContract(signer), [signer])
}

export const useTradingCompetitionContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getTradingCompetitionContract(signer), [signer])
}

export const useTradingCompetitionContractV2 = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(
    () => getTradingCompetitionContractV2(providerOrSigner), [providerOrSigner],
  )
}

export const useEasterNftContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getEasterNftContract(signer), [signer])
}

export const useVaultPoolContract = (vaultKey: VaultKey): SobaVault | IfoPool => {
  const { data: signer } = useSigner()
  return useMemo(() => {
    return vaultKey === VaultKey.SobaVault
      ? getSobaVaultContract(signer)
      : getIfoPoolContract(signer)
  }, [signer, vaultKey])
}

export const useSobaVaultContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getSobaVaultContract(signer), [signer])
}

export const useIfoPoolContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getIfoPoolContract(signer), [signer])
}

export const usePredictionsContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getPredictionsContract(signer), [signer])
}

export const useChainlinkOracleContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getChainlinkOracleContract(signer), [signer])
}

export const useSpecialBunnyCakeVaultContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnySpecialSobaVaultContract(signer), [signer])
}

export const useSpecialBunnyPredictionContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnySpecialPredictionContract(signer), [signer])
}

export const useBunnySpecialLotteryContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnySpecialLotteryContract(signer), [signer])
}

export const useBunnySpecialXmasContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnySpecialXmasContract(signer), [signer])
}

export const useAnniversaryAchievementContract = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getAnniversaryAchievementContract(providerOrSigner), [providerOrSigner])
}

export const useNftSaleContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getNftSaleContract(signer), [signer])
}

export const usePancakeSquadContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getPancakeSquadContract(signer), [signer])
}

export const useFarmAuctionContract = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getFarmAuctionContract(providerOrSigner), [providerOrSigner])
}

export const useNftMarketContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getNftMarketContract(signer), [signer])
}

export const useErc721CollectionContract = (
  collectionAddress: string,
): { reader: Erc721collection; signer: Erc721collection } => {
  const { data: signer } = useSigner()
  return useMemo(
    () => ({
      reader: getErc721CollectionContract(null, collectionAddress),
      signer: getErc721CollectionContract(signer, collectionAddress),
    }),
    [signer, collectionAddress],
  )
}

// Code below migrated from Exchange useContract.ts

// returns null on errors
export function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { provider } = useActiveWeb3React()

  const providerOrSigner = useProviderOrSigner(withSignerIfPossible) ?? provider

  const canReturnContract = useMemo(() => address && ABI && providerOrSigner, [address, ABI, providerOrSigner])

  return useMemo(() => {
    if (!canReturnContract) return null
    try {
      return getContract(address, ABI, providerOrSigner)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, providerOrSigner, canReturnContract]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveChainId()
  return useContract<Weth>(chainId ? WNATIVE[chainId]?.address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveChainId()
  let address: string | undefined
  if (chainId) {
    // eslint-disable-next-line default-case
    switch (chainId) {
      case ChainId.MAINNET:
      case ChainId.TESTNET:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
        break
    }
  }
  return useContract<EnsRegistrar>(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract<EnsPublicResolver>(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<Erc20Bytes32>(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useMulticallContract() {
  return useContract<Multicall>(getMulticallAddress(), multiCallAbi, false)
}
