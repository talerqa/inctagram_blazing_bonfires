import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Management } from '@/features/profile-setting/ui/management/Management'
import { settingLayout } from '@/shared/layouts/profileLayout/SettingLayout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

function AccountManagement() {
  return <Management />
}

AccountManagement.getLayout = settingLayout
export default AccountManagement
