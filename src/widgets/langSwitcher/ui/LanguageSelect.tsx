import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { RoutersPath } from '@/shared/constants/paths'
import { Flags, FullLangs, ShortLangs } from '@/shared/types/langSwitcherTypes'
import { optionsType } from '@/shared/types/optionSwitcherTypes'
import { Switcher } from '@/shared/ui'

export const LanguageSelect = () => {
  const router = useRouter()
  const { pathname, asPath, query } = router

  const [initialValue, setInitialValue] = useState<string>('')

  useEffect(() => {
    const langFromLocal = localStorage.getItem('i18nextLng')

    const browserLang = window.navigator.language.slice(0, 2)
    const defaultLang =
      browserLang === (ShortLangs.RU || ShortLangs.EN) ? browserLang : ShortLangs.EN

    if (langFromLocal) {
      setInitialValue(langFromLocal)
      if (
        pathname !==
        (RoutersPath.authRegistrationConfirmation || RoutersPath.authExpiredVerificationLink)
      ) {
        router.push({ pathname, query }, asPath, { locale: langFromLocal })
      }
    } else {
      setInitialValue(defaultLang)
      localStorage.setItem('i18nextLng', defaultLang)
      router.push({ pathname, query }, asPath, { locale: defaultLang })
    }
  }, [])

  const langOptions: optionsType[] = [
    { shortDescription: ShortLangs.EN, description: FullLangs.EN, icon: Flags.EN },
    { shortDescription: ShortLangs.RU, description: FullLangs.RU, icon: Flags.RU },
  ]

  const changeHandlerExtraFn = (argChangeHandler: string) => {
    localStorage.setItem('i18nextLng', argChangeHandler)
    router.push({ pathname, query }, asPath, { locale: argChangeHandler })
  }

  return (
    <>
      {!!initialValue && (
        <Switcher
          initialValue={initialValue}
          options={langOptions}
          changeHandlerExtraFn={changeHandlerExtraFn}
        />
      )}
    </>
  )
}
