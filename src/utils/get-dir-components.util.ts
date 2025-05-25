import type { AstroComponent, AstroModule } from '@custom-types/global'

const customIconExp = new RegExp('\\.custom.astro$', 'i')

// Busca y devuelve un banner (imagen / svg) de acuerdo al argumento de busqueda.
export function getBannerByName(bannerName: string, modules: AstroModule): AstroComponent {
  if (!modules || Object.keys(modules).length === 0) return null
  if (bannerName.length === 0) return null

  for (const path in modules) {
    const fileName = path.split('/').pop()?.replace(customIconExp, '')

    if (fileName === bannerName) {
      return modules[path].default
    }
  }

  return null
}

// \\. Escapa el caracter punto.
// $ Espera que la coincidencia se encuentre al final.
// i Espera que la coincidencia sea mayusculas o minusculas.
const exp = new RegExp('\\.astro$', 'i')

// Busca y devuelve un icono en especifico.
export function getIconByName({
  iconName,
  modules,
}: {
  iconName: string
  modules: AstroModule
}): AstroComponent {
  const cleanIconName = iconName.trim().toLocaleLowerCase()

  let iconComponent = null

  Object.entries(modules).forEach(([path, value]) => {
    const fileName = path.split('/').at(-1)?.trim().toLocaleLowerCase().replace(exp, '')

    if (fileName === cleanIconName) {
      iconComponent = value.default
      return
    }
  })

  return iconComponent
}
