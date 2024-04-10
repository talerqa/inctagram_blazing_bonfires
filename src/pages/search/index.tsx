import React from 'react'

import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import style from './search.module.scss'

import IndexSearchList from '@/pages/search/users-search-list'
import { getLayout } from '@/shared/layouts/main-layout/main-layout'
import { Text, Input, InputType } from '@/shared/ui'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const Search = () => {
  const { t } = useTranslation('common', { keyPrefix: 'SearchPage' })

  return (
    <div>
      <Text as={'h1'} size={'xl'}>
        {t('Search')}
      </Text>
      <Input type={InputType.SEARCH} placeholder={t('Search')} />

      {/*<IndexSearchList />*/}
    </div>
  )
}

Search.getLayout = getLayout
export default Search
