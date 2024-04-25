import React from 'react'

import { useQuery } from '@apollo/client'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { GET_FOLLOWING_USERS } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'
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
  const { data } = useQuery(GET_FOLLOWING_USERS, {
    variables: {
      userId: 48,
      pageSize: 10,
      pageNumber: 1,
      sortBy: 'createdAt',
      // ...sortAndPaginationData,
    },
    context: {
      headers: {
        Authorization: `Basic ${getAdminBasicCredentials()}`,
      },
    },
  })

  // console.log(userFollowing, 'userFollowing')
  console.log(data, 'data')

  return <AdminUserProfileLayout>followings</AdminUserProfileLayout>
}

Following.getLayout = getAdminLayout
export default Following
