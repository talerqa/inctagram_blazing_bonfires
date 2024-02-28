import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ContentWrapper } from '@/features/user-management'
import ProfilePostsImages from '@/features/user-management/ui/profile-posts-images/profile-posts-images'
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

const UploadedPostsImages = () => {
  const router = useRouter()

  return (
    <ContentWrapper>
      <ProfilePostsImages userId={Number(router.query.id)} />
    </ContentWrapper>
  )
}

UploadedPostsImages.getLayout = getAdminOnlyHeaderLayout
export default UploadedPostsImages
