import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Flex, LogoutIcon, useModal, UserMenu as UIKitUserMenu, UserMenuDivider, UserMenuItem } from 'opsoba-uikit'
import useAuth from 'hooks/useAuth'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useGetBnbBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
// import { nftsBaseUrl } from 'views/Nft/market/constants'
import { FetchStatus } from 'config/constants/types'
import WalletModal, { WalletView, LOW_BNB_BALANCE } from './WalletModal'
// import ProfileUserMenuItem from './ProfileUserMenutItem'
import WalletUserMenuItem from './WalletUserMenuItem'

const UserMenu = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { logout } = useAuth()
  const { balance, fetchStatus } = useGetBnbBalance()
  // const { profile } = useProfile()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  // const hasProfile = isInitialized && !!profile
  // const avatarSrc = profile?.nft?.image?.thumbnail
  const hasLowBnbBalance = fetchStatus === FetchStatus.Fetched && balance.lte(LOW_BNB_BALANCE)

  if (!account) {
    return <ConnectWalletButton scale="sm" />
  }

  return (
    <UIKitUserMenu account={account} >
      <WalletUserMenuItem hasLowBnbBalance={hasLowBnbBalance} onPresentWalletModal={onPresentWalletModal} />
      <UserMenuItem as="button" onClick={onPresentTransactionModal}>
        {t('Transactions')}
      </UserMenuItem>
      <UserMenuDivider />
      <UserMenuItem as="button" onClick={logout}>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          {t('Disconnect')}
          <LogoutIcon />
        </Flex>
      </UserMenuItem>
    </UIKitUserMenu>
  )
}

export default UserMenu
