import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { getAdminLayout } from '@/shared/layouts/admin-layout/admin-layout'

const SuperAdminHome = () => {
  return <div>SuperAdmin home</div>
}

SuperAdminHome.getLayout = getAdminLayout
export default SuperAdminHome
