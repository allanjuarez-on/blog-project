import type { AstroComponent, AstroModule } from '@custom-types/global'

// \\. Escapa el caracter punto.
// $ Espera que la coincidencia se encuentre al final.
// i Espera que la coincidencia sea mayusculas o minusculas.
const defaultRegExp = new RegExp('\\.astro$', 'i')

// Busca y devuelve un icono en especifico.
export function getIconByName({
  iconName,
  modules,
  customExp,
}: {
  iconName: string
  modules: AstroModule
  customExp?: RegExp
}): AstroComponent {
  const cleanIconName = iconName.trim().toLocaleLowerCase()
  let iconComponent = null

  Object.entries(modules).forEach(([path, value]) => {
    const newRegExp = customExp ?? defaultRegExp
    const fileName = path.split('/').at(-1)?.trim().toLocaleLowerCase().replace(newRegExp, '')
    if (fileName === cleanIconName) {
      iconComponent = value.default
      return
    }
  })

  return iconComponent
}
