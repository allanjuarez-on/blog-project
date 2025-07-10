export function formatPubDate(
  date: string | Date,
  options?: { locales: string | undefined; style: Intl.DateTimeFormatOptions },
) {
  if (typeof date === 'string') {
    const convertStringToDate = new Date(date)
    const locales = options ? options.locales : undefined
    const style = options ? { ...options.style } : {}
    return new Intl.DateTimeFormat(locales, style).format(convertStringToDate)
  }

  if (!(date instanceof Date && !isNaN(date.getTime()))) return

  if (options) {
    return new Intl.DateTimeFormat(options.locales, { ...options.style }).format(date)
  }

  return new Intl.DateTimeFormat(undefined, { dateStyle: 'full' }).format(date)
}
