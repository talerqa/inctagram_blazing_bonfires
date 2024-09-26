import enFlag from '@/shared/assets/icons/lang-select/british-flag.svg'
import ruFlag from '@/shared/assets/icons/lang-select/russian-flag.svg'

enum ShortLangs {
  RU = 'ru',
  EN = 'en',
}

enum FullLangs {
  RU = 'Русский',
  EN = 'English',
}

enum Flags {
  RU = ruFlag,
  EN = enFlag,
}

type LangOptionType = {
  shortLang: ShortLangs
  fullLang: FullLangs
  flag: Flags
}

export { Flags, FullLangs, ShortLangs }
export type { LangOptionType }
