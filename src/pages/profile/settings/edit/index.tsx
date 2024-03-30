import React, { useEffect } from 'react'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import styles from '@/pages/payment/access/payment.module.scss'
import { getLayout } from '@/shared/layouts/main-layout/main-layout'
import { CircularLoader } from '@/shared/ui'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const StripePayment = () => {
  const router = useRouter()
  const { query } = router

  useEffect(() => {
    if (router.asPath.endsWith('?error')) {
      void router.replace(router.asPath.replace('?error', ''), undefined, { shallow: true })
    }

    if (query.success === 'true') {
      router.push(`/profile/account-management?success=true`)
    }
  }, [query.success, router.asPath, router])

  return (
    <div className={styles.loaderWrapper}>
      <CircularLoader />
    </div>
  )
}

StripePayment.getLayout = getLayout
export default StripePayment
