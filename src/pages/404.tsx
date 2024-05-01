import React from 'react'

import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import styles from './404.module.scss'

import { Error404 } from '@/shared/assets/icons/error-404/error-404'
import { RoutersPath } from '@/shared/constants/paths'
import { Button, Text } from '@/shared/ui'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}
const NotFound = () => {
  const router = useRouter()

  const mainPath = router.asPath.split('/')

  const { t } = useTranslation('common', { keyPrefix: 'Page404' })

  return (
    <div className={styles.wrapper}>
      <div className={styles.errorImage}>
        <Error404></Error404>
      </div>
      <Text>{t('Sorry! Page not found!')}</Text>
      <Link href={mainPath[1] === 'super-admin' ? RoutersPath.superAdmin : RoutersPath.home}>
        <Button>{t('Back to home page')}</Button>
      </Link>
    </div>
  )
}

export default NotFound
