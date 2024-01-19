import React from 'react'

import { useGoogleLogin } from '@react-oauth/google'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'

import styles from '@/features/auth-register/ui/oAuth/OAuth.module.scss'
import { selectIsLoggedIn } from '@/shared/api'
import { useLoginViaGoogleMutation } from '@/shared/api/services/auth/auth.api'
import githubIcon from '@/shared/assets/icons/socialIcons/github-icon.svg'
import googleIcon from '@/shared/assets/icons/socialIcons/google-icon.svg'
import { RoutersPath } from '@/shared/constants/paths'

export const OAuth = () => {
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })
  const router = useRouter()
  const [loginViaGoogle] = useLoginViaGoogleMutation()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const loginGoogle = useGoogleLogin({
    // UseGoogleLogin handles login via Google. After we send request to log in via Google we
    // call send request to our server Code provided by google. Server responds with AccessToken and email.
    // We set accessToken to localStorage and redirect to ProfilePage, which handles further logic of fetching data
    onSuccess: async tokenResponse => {
      // @ts-ignore ignore TS typization
      const { data } = await loginViaGoogle(tokenResponse)

      if (data.accessToken && data.email) {
        localStorage.setItem('accessToken', data.accessToken as string)
        router.push(`/profile`)
      } else {
        router.push(`/sign-in`)
      }
    },
    onError: () => toast.error(tError('SomethingWentWrong')),
    flow: 'auth-code',
  })

  const onGithubLogin = () => {
    router.push(RoutersPath.apiAuthGithubLogin)
  }

  if (isLoggedIn) {
    return <Link href={RoutersPath.profile} />
  }

  return (
    <div className={styles.socialIconContainer}>
      <Image
        onClick={loginGoogle}
        className={styles.socialIcon}
        src={googleIcon}
        alt="google icon"
      />
      <Image
        onClick={onGithubLogin}
        className={styles.socialIcon}
        src={githubIcon}
        alt="github icon"
      />
    </div>
  )
}
