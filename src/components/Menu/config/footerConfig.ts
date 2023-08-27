import { FooterLinkType } from 'opsoba-uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.sobaswap.finance/contact-us',
      },
      {
        label: t('Brand'),
        href: 'https://docs.sobaswap.finance/brand',
      },
      {
        label: t('Blog'),
        href: 'https://medium.com/sobaswap',
      },
      {
        label: t('Community'),
        href: 'https://docs.sobaswap.finance/contact-us/telegram',
      },
      {
        label: t('SOBA token'),
        href: 'https://docs.sobaswap.finance/tokenomics/cake',
      },
      {
        label: '—',
      },
      {
        label: t('Online Store'),
        href: 'https://sobaswap.creator-spring.com/',
        isHighlighted: true,
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: 'https://docs.sobaswap.finance/contact-us/customer-support',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://docs.sobaswap.finance/help/troubleshooting',
      },
      {
        label: t('Guides'),
        href: 'https://docs.sobaswap.finance/get-started',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/sobaswap',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.sobaswap.finance',
      },
      {
        label: t('Bug Bounty'),
        href: 'https://docs.sobaswap.finance/code/bug-bounty',
      },
      {
        label: t('Audits'),
        href: 'https://docs.sobaswap.finance/help/faq#is-sobaswap-safe-has-sobaswap-been-audited',
      },
      {
        label: t('Careers'),
        href: 'https://docs.sobaswap.finance/hiring/become-a-chef',
      },
    ],
  },
]
