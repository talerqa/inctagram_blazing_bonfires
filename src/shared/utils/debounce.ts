export function debounce(func: { apply: (arg0: any, arg1: any[]) => void }, timeout = 500) {
  let timer: string | number | NodeJS.Timeout | undefined

  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args)
    }, timeout)
  }
}
