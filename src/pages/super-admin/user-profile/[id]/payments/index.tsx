import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ContentWrapper } from '@/features/super-admin-user-management'
import { ProfilePayments } from '@/features/super-admin-user-profile/ui/profile-payments/profile-payments'
import ProfilePostsImages from '@/features/super-admin-user-profile/ui/profile-posts-images/profile-posts-images'
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

const Payments = () => {
  const router = useRouter()

  return (
    <ContentWrapper>
      <ProfilePayments userId={Number(router.query.id)} />
    </ContentWrapper>
  )
}

Payments.getLayout = getAdminOnlyHeaderLayout
export default Payments
