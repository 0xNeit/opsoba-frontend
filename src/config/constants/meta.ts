import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'SobaSwap',
  description:
    'The most popular AMM on opBNB by user count! Earn SOBA through yield farming or win it in the Lottery, then stake it in Staking Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by SobaSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://SobaSwap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('SobaSwap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('SobaSwap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('SobaSwap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('SobaSwap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('SobaSwap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('SobaSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('SobaSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('SobaSwap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('SobaSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('SobaSwap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('SobaSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('SobaSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('SobaSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('SobaSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('SobaSwap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('SobaSwap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('SobaSwap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('SobaSwap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('SobaSwap Info & Analytics')}`,
        description: 'View statistics for SobaSwap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('SobaSwap Info & Analytics')}`,
        description: 'View statistics for SobaSwap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('SobaSwap Info & Analytics')}`,
        description: 'View statistics for SobaSwap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('SobaSwap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('SobaSwap')}`,
      }
    case '/nfts/activity':
      return {
        title: `${t('Activity')} | ${t('SobaSwap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Profile')} | ${t('SobaSwap')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Soba Squad')} | ${t('SobaSwap')}`,
      }
    default:
      return null
  }
}
