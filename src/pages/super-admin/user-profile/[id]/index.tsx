import React from 'react'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ProfilePostsImages from '@/features/user-management/ui/profile-posts-images/profile-posts-images'
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

const UploadedPostsImages = () => {
  const router = useRouter()

  return (
    <AdminUserProfileLayout>
      <ProfilePostsImages userId={Number(router.query.id)} />
    </AdminUserProfileLayout>
  )
}

UploadedPostsImages.getLayout = getAdminLayout
export default UploadedPostsImages
