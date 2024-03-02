import React from 'react'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ProfileFollowers } from '@/features/super-admin-user-profile/ui/profile-followers/profile-followers'
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

const Followers = () => {
  const router = useRouter()

  return (
    <AdminUserProfileLayout>
      <ProfileFollowers userId={Number(router.query.id)} />
    </AdminUserProfileLayout>
  )
}

Followers.getLayout = getAdminLayout
export default Followers
