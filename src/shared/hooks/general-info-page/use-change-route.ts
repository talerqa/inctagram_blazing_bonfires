import { SetStateAction, useEffect } from 'react'

import { NextRouter } from 'next/router'

import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import { RoutersPath } from '@/shared/constants/paths'
import { ShortLangs } from '@/shared/types/lang-switcher-types'

type Props = {
  router: NextRouter
  isDirty: boolean
  isLeftPage: boolean
  isFormChanged: boolean
  formCache: ProfileUserType
  setIsModal: (value: SetStateAction<boolean>) => void
  setForwardURL: (value: SetStateAction<string>) => void
}
export const useChangeRoute = ({
  router,
  isDirty,
  isLeftPage,
  isFormChanged,
  formCache,
  setIsModal,
  setForwardURL,
}: Props) => {
  const handleRouteChange = (url: string, { shallow }: { shallow: boolean }) => {
    const langPrefix = router.locale === ShortLangs.EN ? '' : '/' + router.locale
    const urlWithoutQuery = url.split('?')[1] ? url.split('?')[0] : url
    const currentURL = langPrefix + router.asPath
    const privacyPolicyURL = langPrefix + RoutersPath.authPrivacyPolicy
    const urlAfterChangeLang =
      router.locale === ShortLangs.EN ? '/' + ShortLangs.RU + router.asPath : router.asPath

    const isBreakLeftPage =
      urlWithoutQuery !== currentURL &&
      urlWithoutQuery !== privacyPolicyURL &&
      url !== urlAfterChangeLang

    if (isBreakLeftPage) {
      setIsModal(true)
      setForwardURL(urlWithoutQuery)

      if (!shallow) {
        router.events.emit('routeChangeError')
        throw 'Abort route change. Please ignore this error.'
      }
    }
  }

  useEffect(() => {
    if ((isDirty || isFormChanged || !!formCache) && !isLeftPage) {
      router.events.on('routeChangeStart', handleRouteChange)

      return () => {
        router.events.off('routeChangeStart', handleRouteChange)
      }
    }
  }, [isDirty, isLeftPage, isFormChanged, formCache])
}
