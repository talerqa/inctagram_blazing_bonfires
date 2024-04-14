import React, { SetStateAction, useEffect, useLayoutEffect, useState } from 'react'

import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import style from './search.module.scss'

import AdditionalText from '@/pages/search/additional-text'
import AuxiliaryText from '@/pages/search/auxiliary-text'
import RecentRequestText from '@/pages/search/recent-request-text'
import UserItem from '@/pages/search/user-item'
import { useLazyGetUsersQuery } from '@/shared/api/services/search/search.api'
import { UsersResponseType, UserType } from '@/shared/api/services/search/users.api.types'
import { getLayout } from '@/shared/layouts/main-layout/main-layout'
import { Text, Input, InputType } from '@/shared/ui'
import { debounce } from '@/shared/utils/debounce'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const Search = () => {
  console.log('render')
  const [searchParams, setSearchParams] = useState<string>('')
  const { t } = useTranslation('common', { keyPrefix: 'SearchPage' })
  const [recentUsers, setRecentUsers] = useState<UserType[]>()

  console.log(searchParams, 'searchparams')
  const [trigger, { data }] = useLazyGetUsersQuery()
  const onSetInput = debounce((e: string) => {
    setSearchParams(prevState => e)
    trigger({ str: e, pageSize: 14, pageNumber: 1 })
    if (!searchParams) {
      setInfUsers([])
    }
  })

  const [infUsers, setInfUsers] = useState<UserType[]>()
  const [infCurrentPage, setInfCurrentPage] = useState<number>(1)
  const infScrollHandler = (e: any) => {
    trigger({ str: searchParams, pageSize: 14, pageNumber: 2 })
    setInfUsers(data?.items)
  }

  console.log(infUsers, 'infUsers')

  useEffect(() => {
    setInfUsers(data?.items)
  }, [data])

  useEffect(() => {
    document.addEventListener('scroll', infScrollHandler)

    return () => {
      document.removeEventListener('scroll', infScrollHandler)
    }
  }, [searchParams])

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const recentUsersInside = localStorage.getItem('recentRequestUsers')

      if (recentUsersInside !== null) {
        setRecentUsers(JSON.parse(recentUsersInside))
      }
    }
  }, [])

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
      <div className={style.userList}>
        {data && searchParams && infUsers?.map(user => <UserItem key={user.id} user={user} />)}
      </div>
      {searchParams && data?.totalCount === 0 && <AuxiliaryText />}
      {!recentUsers && <AdditionalText />}
      {!searchParams && recentUsers && <RecentRequestText />}

      {!searchParams && recentUsers?.map(user => <UserItem key={user.id} user={user} />)}
    </div>
  )
}

Search.getLayout = getLayout
export default Search
