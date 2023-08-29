import React from 'react'
import { useRouter } from 'next/router'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { Menu as UikitMenu } from 'opsoba-uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { usePriceSobaBusd } from 'state/farms/hooks'
import config from './config/config'
import UserMenu from './UserMenu'
import GlobalSettings from './GlobalSettings'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import { footerLinks } from './config/footerConfig'

const Menu = (props) => {
  const { isDark, toggleTheme } = useTheme()
  const sobaPriceUsd = usePriceSobaBusd()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useRouter()
  // const [showPhishingWarningBanner] = usePhishingBannerManager()

  const activeMenuItem = getActiveMenuItem({ menuConfig: config(t), pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

  return (
    <UikitMenu
      linkComponent={(linkProps) => {
        return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} />
      }}
      userMenu={<UserMenu />}
      globalMenu={<GlobalSettings />}
      // banner={showPhishingWarningBanner && <PhishingWarningBanner />}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      cakePriceUsd={sobaPriceUsd.toNumber()}
      links={config(t)}
      subLinks={activeMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
      footerLinks={footerLinks(t)}
      activeItem={activeMenuItem?.href}
      activeSubItem={activeSubMenuItem?.href}
      buySobaLabel={t('Buy SOBA')}
      {...props}
    />
  )
}

export default Menu
