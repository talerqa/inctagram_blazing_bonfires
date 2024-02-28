export function capitalizeString(str: string | undefined | null) {
  if (!str) return 'undefined string'

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
