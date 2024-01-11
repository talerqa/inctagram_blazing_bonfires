import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useVerifyEmailMutation } from '@/shared/api'
import { getLayout } from '@/shared/layouts/mainLayout/MainLayout'
import { ShortLangs } from '@/shared/types/langSwitcherTypes'
import { CircularLoader } from '@/shared/ui'

export const RegistrationConfirmation = () => {
  const [verifyEmail] = useVerifyEmailMutation()
  const router = useRouter()
  const { query } = router
  const { code, email } = query

  useEffect(() => {
    const langFromLocal = localStorage.getItem('i18nextLng')

    if (code) {
      const lang = langFromLocal === ShortLangs.RU ? `/ru` : ''

      verifyEmail(code)
        .unwrap()
        .then(() => router.push(`/auth/confirmed-email`))
        .catch(e => {
          router.push(`/auth/expired-verification-link?email=${email}`)
        })
    }
  }, [code])

  return <CircularLoader />
}

RegistrationConfirmation.getLayout = getLayout
export default RegistrationConfirmation
