import type { AstroNodeList } from '@custom-types/global'

enum CardState {
  HIDE = 'hidden',
  SHOW = 'block',
}

export function markActiveLink(element: Element | null | undefined, isActive: boolean) {
  if (!element) return

  if (!isActive) {
    element.classList.remove('decoration-gray-50')
    element.classList.replace('text-gray-50', 'text-gray-50/50')
    element.classList.replace('underline', 'no-underline')
  }

  if (isActive) {
    element.classList.replace('text-gray-50/50', 'text-gray-50')
    element.classList.replace('no-underline', 'underline')
    element.classList.replace('decoration-gray-50/50', 'decoration-gray-50')
  }
}

export function syncLinkWithUrlPathName({
  links,
  dataAttr,
}: {
  links: AstroNodeList
  dataAttr: string
}) {
  if (!links || links.length === 0) return

  const currentPathName = new URL(window.location.href).pathname.split('/')
  currentPathName.shift()

  links.forEach(link => {
    const dataLink = link.dataset[dataAttr] ?? ''
    const isActive = currentPathName.includes(dataLink)
    markActiveLink(link, isActive)
  })
}

export function checkVisibleCards(nodes: AstroNodeList) {
  if (!(nodes && nodes.length !== 0)) return

  const isDisabled = Array.from(nodes).every(node => node.classList.contains(CardState.HIDE))
  const component = document.querySelector('#NoContent')

  if (isDisabled) {
    component?.classList.remove('hidden')
    component?.classList.add('block')
  } else {
    component?.classList.remove('block')
    component?.classList.add('hidden')
  }
}

export function toggleActiveCard(nodes: AstroNodeList, currentFilter: string | null | undefined) {
  if (!(nodes && nodes.length !== 0)) return

  nodes.forEach(node => {
    const cardCategory = node.getAttribute('data-card-category')?.toLowerCase()

    if (!currentFilter || currentFilter === 'latest') {
      node.classList.replace(CardState.HIDE, CardState.SHOW)
      return
    }

    if (!currentFilter && currentFilter !== 'latest' && cardCategory === 'no-content') {
      node.classList.replace(CardState.SHOW, CardState.HIDE)
      return
    }

    if (currentFilter === cardCategory) {
      node.classList.replace(CardState.HIDE, CardState.SHOW)
      return
    }

    if (currentFilter !== cardCategory) {
      node.classList.replace(CardState.SHOW, CardState.HIDE)
      return
    }
  })
}
