import React from 'react'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ContentWrapper } from '@/features/user-management'
import { ProfileFollowers } from '@/features/user-management/ui/profile-followers/profile-followers'
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

const Followers = () => {
  const router = useRouter()

  return (
    <ContentWrapper>
      <ProfileFollowers userId={Number(router.query.id)} />
    </ContentWrapper>
  )
}

Followers.getLayout = getAdminOnlyHeaderLayout
export default Followers
