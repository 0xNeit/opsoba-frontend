import { createAction } from '@reduxjs/toolkit'
import { ChainId } from '@pancakeswap/sdk'

export type TransactionType =
  | 'approve'
  | 'swap'
  | 'wrap'
  | 'add-liquidity'
  | 'remove-liquidity'
  | 'non-bsc-farm'


export interface SerializableTransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  blockHash: string
  transactionHash: string
  blockNumber: number
  status?: number
}

export enum FarmTransactionStatus {
  PENDING = -1,
  FAIL = 0,
  SUCCESS = 1,
}

export enum NonBscFarmStepType {
  STAKE = 'STAKE',
  UNSTAKE = 'UNSTAKE',
}

export enum MsgStatus {
  MS_UNKNOWN = 0,
  MS_WAITING_FOR_SGN_CONFIRMATIONS = 1,
  MS_WAITING_FOR_DESTINATION_EXECUTION = 2,
  MS_COMPLETED = 3,
  MS_FAIL = 4,
  MS_FALLBACK = 5,
}

export interface NonBscFarmTransactionStep {
  step: number
  chainId: number
  status: FarmTransactionStatus
  tx: string
  isFirstTime?: boolean
  msgStatus?: MsgStatus
}

export interface NonBscFarmTransactionType {
  type: NonBscFarmStepType
  status: FarmTransactionStatus
  amount: string
  lpAddress: string
  lpSymbol: string
  steps: NonBscFarmTransactionStep[]
}

export const addTransaction = createAction<{
  chainId: ChainId
  hash: string
  from: string
  approval?: { tokenAddress: string; spender: string }
  claim?: { recipient: string }
  summary?: string
}>('transactions/addTransaction')
export const clearAllTransactions = createAction<{ chainId: ChainId }>('transactions/clearAllTransactions')
export const finalizeTransaction = createAction<{
  chainId: ChainId
  hash: string
  receipt: SerializableTransactionReceipt
}>('transactions/finalizeTransaction')
export const checkedTransaction = createAction<{
  chainId: ChainId
  hash: string
  blockNumber: number
}>('transactions/checkedTransaction')
