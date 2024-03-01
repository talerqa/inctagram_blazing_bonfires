import React from 'react'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ContentWrapper } from '../../../../../features/super-admin-user-management'

import { getAdminOnlyHeaderLayout } from '@/shared/layouts'

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
    <ContentWrapper>
      following
      {/*<ProfileFollowers userId={Number(router.query.id)} />*/}
    </ContentWrapper>
  )
}

Following.getLayout = getAdminOnlyHeaderLayout
export default Following
