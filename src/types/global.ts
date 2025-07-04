import type { GetImageResult } from 'astro'

export type AstroModule = Record<
  string,
  {
    default: (_props: Record<string, any>) => any
  }
>

export type AstroComponent = ((_props: Record<string, any>) => any) | null

export interface PrimitiveImageResponsive {
  type: string
  breakpoint: string
  img: GetImageResult
}

export interface PrimitiveLink {
  type: string
  href: string
  label: string
  ctx: string
  description: string
}

export interface MainMenuLink {
  id: string
  href: string
  label: string
  banner?: ((_props: Record<string, any>) => any) | null
}

export interface UrlChangeEventData {
  payload: string | null
}
