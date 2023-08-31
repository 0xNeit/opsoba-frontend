import { configureScope } from '@sentry/nextjs'
import { Dispatch } from '@reduxjs/toolkit'
import { connectorLocalStorageKey } from '@pancakeswap/uikit'
import { resetUserState, toggleFarmTransactionModal } from 'state/global/actions'

export const clearUserStates = (
  dispatch: Dispatch<any>,
  {
    chainId,
    newChainId,
    isDeactive = false,
  }: {
    chainId?: number
    newChainId?: number
    isDeactive?: boolean
  },
) => {
  dispatch(resetUserState({ chainId, newChainId }))
  dispatch(toggleFarmTransactionModal({ showModal: false }))
  configureScope((scope) => scope.setUser(null))
  // Only clear localStorage when user disconnect,switch address no need clear it.
  if (isDeactive) {
    window?.localStorage?.removeItem(connectorLocalStorageKey)
  }
}
