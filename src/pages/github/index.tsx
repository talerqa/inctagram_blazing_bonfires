import React, { useEffect } from 'react'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import styles from './Github.module.scss'

import { getLayout } from '@/shared/layouts/mainLayout/MainLayout'
import { CircularLoader } from '@/shared/ui'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const GithubLoginPage = () => {
  const router = useRouter()
  const { accessToken, email } = router.query

  useEffect(() => {
    if (accessToken && email) {
      localStorage.setItem('accessToken', accessToken as string)
      router.push(`/profile`)
    } else {
      router.push(`/sign-in`)
    }
  }, [accessToken])

  return (
    <div className={styles.loaderWrapper}>
      <CircularLoader />
    </div>
  )
}

GithubLoginPage.getLayout = getLayout
export default GithubLoginPage
