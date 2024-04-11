import React, { SetStateAction, useEffect, useState } from 'react'

import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import style from './search.module.scss'

import UserItem from '@/pages/search/user-item'
import { useLazyGetUsersQuery } from '@/shared/api/services/search/search.api'
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
  const [searchParams, setSearchParams] = useState<string>('')
  const { t } = useTranslation('common', { keyPrefix: 'SearchPage' })

  const [trigger, { data }] = useLazyGetUsersQuery()
  const onSetInput = (e: string) => {
    trigger({ str: e })
    setSearchParams(e)
  }

  return (
    <div>
      <Text as={'h1'} size={'xl'}>
        {t('Search')}
      </Text>
      <Input
        type={InputType.SEARCH}
        placeholder={t('Search')}
        onInput={event => onSetInput(event.currentTarget.value)}
      />
      <Text as={'p'} size={'medium'} weight={'semi_bold'} style={{ marginTop: '30px' }}>
        {t('RecentRequests')}
      </Text>
      <Text as={'p'} size={'medium'} className={style.auxiliaryInfo} weight={'bold'}>
        {t('EmptyPlace')}
      </Text>
      <Text as={'p'} size={'small'} className={style.auxiliaryInfoNext}>
        {t('NoRecentRequests')}
      </Text>
      {data && searchParams && data.items.map(user => <UserItem key={user.id} user={user} />)}
    </div>
  )
}

Search.getLayout = getLayout
export default Search
