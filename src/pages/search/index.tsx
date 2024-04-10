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
      <Text as={'p'} size={'medium'} weight={'semi_bold'} style={{ marginTop: '30px' }}>
        {t('RecentRequests')}
      </Text>
      <Text as={'p'} size={'medium'} className={style.auxiliaryInfo} weight={'bold'}>
        {t('EmptyPlace')}
      </Text>
      <Text as={'p'} size={'small'} className={style.auxiliaryInfoNext}>
        {t('NoRecentRequests')}
      </Text>
      {/*<IndexSearchList />*/}
    </div>
  )
}

Search.getLayout = getLayout
export default Search
