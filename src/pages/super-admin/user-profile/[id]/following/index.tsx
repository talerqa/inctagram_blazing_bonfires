import React from 'react'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ProfileFollowing } from '@/features/super-admin-user-profile/ui/profile-following/profile-following'
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
  const router = useRouter()

  return (
    <AdminUserProfileLayout>
      <ProfileFollowing userId={Number(router.query.id)} />
    </AdminUserProfileLayout>
  )
}

Following.getLayout = getAdminLayout
export default Following
