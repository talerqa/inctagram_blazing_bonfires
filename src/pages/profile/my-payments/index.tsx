import * as React from 'react'

import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Payments } from '@/features/profile-setting/ui/payments/payments'
import { settingLayout } from '@/shared/layouts/profile-layout/setting-layout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

function MyPayments() {
  return (
    <>
      <Payments />
    </>
  )
}

MyPayments.getLayout = settingLayout
export default MyPayments
