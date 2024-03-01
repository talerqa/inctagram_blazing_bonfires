import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ProfilePayments } from '@/features/user-management/ui/profile-payments/profile-payments'
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

const Payments = () => {
  const router = useRouter()

  return (
    <AdminUserProfileLayout>
      <ProfilePayments userId={Number(router.query.id)} />
    </AdminUserProfileLayout>
  )
}

Payments.getLayout = getAdminLayout
export default Payments
