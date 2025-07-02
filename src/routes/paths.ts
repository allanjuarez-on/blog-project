import { getBannerByName } from '@utils/get-dir-components.util'
import type { MainMenuLink, PrimitiveLink, AstroModule } from '@custom-types/global'

const modules: AstroModule = import.meta.glob('../components/icons/*.custom.astro', { eager: true })

export const mainMenuLinks: MainMenuLink[] = [
  {
    id: 'blog',
    href: '/blog',
    label: 'Blog',
    // banner: getBannerByName('Word', modules),
  },
  {
    id: 'portfolio',
    href: '/portfolio',
    label: 'Portfolio',
    // banner: getBannerByName('HighShot', modules),
  },
  {
    id: 'lets-talk',
    href: '/lets-talk',
    label: 'Hablemos',
    // banner: getBannerByName('HighShot', modules),
  },
]

export const footerLocalLinks: Omit<PrimitiveLink, 'type' | 'description' | 'ctx'>[] = [
  {
    href: '/blog',
    label: 'Blog',
  },
  {
    href: '/portfolio',
    label: 'Portfolio',
  },
  {
    href: '/lets-talk',
    label: 'Hablemos',
  },
]

export const footerExternalLinks: Omit<PrimitiveLink, 'description'>[] = [
  {
    type: 'external',
    href: 'https://github.com/',
    label: 'Github',
    ctx: '_blank',
  },
  {
    type: 'external',
    href: 'https://www.linkedin.com/',
    label: 'LinkedIn',
    ctx: '_blank',
  },
  {
    type: 'external',
    href: 'https://www.instagram.com/',
    label: 'Instagram',
    ctx: '_blank',
  },
]
