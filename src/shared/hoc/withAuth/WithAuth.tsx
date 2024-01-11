import { PropsWithChildren } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useMeQuery } from '@/shared/api'
import { RoutersPath } from '@/shared/constants/paths'
import { ShortLangs } from '@/shared/types/langSwitcherTypes'

// const publicPaths = []

const emailConfirmationPaths = [
  RoutersPath.authExpiredVerificationLink,
  RoutersPath.authRegistrationConfirmation,
]

export const WithAuth: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { pathname } = router
  const { i18n } = useTranslation()

  // check weather url contains private paths
  if (emailConfirmationPaths.some(paths => paths === pathname)) {
    return children
  }
  // if (publicPaths.some(paths => paths === pathname)) {
  //   return children
  // }
  const { data, error, isLoading, isError } = useMeQuery()

  if (isError) {
    // if to use router.push will be infinite rerenders. Instead of it needs to use window.history.pushState to prevent rerenders

    let pageUnautorization = RoutersPath.signIn

    switch (pathname) {
      case RoutersPath.signUp:
        pageUnautorization = RoutersPath.signUp
        break
      case RoutersPath.forgotPassword:
        pageUnautorization = RoutersPath.forgotPassword
        break
      case RoutersPath.authTermsOfService:
        pageUnautorization = RoutersPath.authTermsOfService
        break
      case RoutersPath.authPrivacyPolicy:
        pageUnautorization = RoutersPath.authPrivacyPolicy
        break
      case RoutersPath.authConfirmedEmail:
        pageUnautorization = RoutersPath.authConfirmedEmail
        break
      case RoutersPath.authExpiredVerificationLink:
        pageUnautorization = RoutersPath.authExpiredVerificationLink
        break
    }

    const newUrl =
      window.location.origin +
      `${i18n.language === ShortLangs.RU ? '/ru' : ''}` +
      `${pageUnautorization}`

    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl)
  }

  return children
}
