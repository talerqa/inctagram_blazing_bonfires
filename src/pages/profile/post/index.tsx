import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { settingLayout } from '@/shared/layouts/profileLayout/SettingLayout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}
function Post() {
  return <div>Пост</div>
}

Post.getLayout = settingLayout
export default Post
