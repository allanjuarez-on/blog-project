export function markActiveElement(element: Element | null | undefined, isActive: boolean) {
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
