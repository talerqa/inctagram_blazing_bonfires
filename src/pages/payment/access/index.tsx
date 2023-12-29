import React, { useEffect } from 'react'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import styles from '@/pages/payment/access/Payment.module.scss'
import { getLayout } from '@/shared/layouts/mainLayout/MainLayout'
import { CircularLoader } from '@/shared/ui/loaders/CircularLoader'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const PaymentAccess = () => {
  const router = useRouter()
  const { token } = router.query

  useEffect(() => {
    if (token) {
      localStorage.setItem('paymentAccessToken', token as string)
      router.push(`/profile/account-management?success=true`)
    }
  }, [token])

  return (
    <div className={styles.loaderWrapper}>
      <CircularLoader />
    </div>
  )
}

PaymentAccess.getLayout = getLayout
export default PaymentAccess
