const SOBA_EXTENDED = 'https://raw.githubusercontent.com/0xNeit/@pancakeswap/uikit/master/packages/token-lists/lists/pancakeswap-extended.json'
const SOBA_TOP100 = 'https://raw.githubusercontent.com/0xNeit/@pancakeswap/uikit/master/packages/token-lists/lists/pancakeswap-top-100.json'

export const UNSUPPORTED_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  SOBA_TOP100,
  SOBA_EXTENDED,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = []
