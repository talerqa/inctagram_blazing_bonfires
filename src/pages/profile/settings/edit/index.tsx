import React, { useEffect } from 'react'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import styles from '@/pages/payment/access/Payment.module.scss'
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

const StripePayment = () => {
  const router = useRouter()
  const { query } = router

  useEffect(() => {
    if (query.success === 'true') {
      router.push(`/profile/account-management?success=true`)
    }
  }, [query.success])

  return (
    <div className={styles.loaderWrapper}>
      <CircularLoader />
    </div>
  )
}

StripePayment.getLayout = getLayout
export default StripePayment
