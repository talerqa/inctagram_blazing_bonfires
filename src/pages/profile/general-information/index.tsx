import React, { useEffect } from 'react'

import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { GeneralInfo } from '@/features/profile-setting/'
import { settingLayout } from '@/shared/layouts/profile-layout/setting-layout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

function GeneralInformation() {
  return (
    <>
      <GeneralInfo />
    </>
  )
}

GeneralInformation.getLayout = settingLayout
export default GeneralInformation
