import React from 'react'

import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { getAdminLayout } from '@/shared/layouts/admin-layout/admin-layout'
import { AdminUserProfileLayout } from '@/shared/layouts/admin-user-profile-layout/admin-user-profile-layout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

const Following = () => {
  return <AdminUserProfileLayout>following</AdminUserProfileLayout>
}

Following.getLayout = getAdminLayout
export default Following
