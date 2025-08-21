import type { MenuLink, PrimitiveLink } from '@custom-types/global'

export const menuLinks: MenuLink[] = [
  {
    id: 'blog',
    href: '/blog',
    label: 'Blog',
  },
  {
    id: 'portfolio',
    href: '/portfolio',
    label: 'Portfolio',
  },
]

export const footerLocalLinks: Partial<PrimitiveLink>[] = [
  {
    href: '/blog',
    label: 'Blog',
  },
  {
    href: '/portfolio',
    label: 'Portfolio',
  },
]

export const footerExternalLinks: Partial<PrimitiveLink>[] = [
  {
    type: 'external',
    href: 'https://github.com/allanjuarez-on',
    label: 'Github',
    ctx: '_blank',
  },
  {
    type: 'external',
    href: 'https://www.linkedin.com/in/edgarallanjuarezcanas/',
    label: 'LinkedIn',
    ctx: '_blank',
  },
]
