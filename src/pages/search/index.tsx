import React, { useEffect, useState } from 'react'

import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import style from './search.module.scss'

import AdditionalText from '@/pages/search/additional-text'
import AuxiliaryText from '@/pages/search/auxiliary-text'
import RecentRequestText from '@/pages/search/recent-request-text'
import UserItem from '@/pages/search/user-item'
import { useLazyGetUsersQuery } from '@/shared/api/services/search/search.api'
import { UserType } from '@/shared/api/services/search/users.api.types'
import { getLayout } from '@/shared/layouts/main-layout/main-layout'
import { Input, InputType, Text } from '@/shared/ui'
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
  const [searchParams, setSearchParams] = useState<string>('')
  const { t } = useTranslation('common', { keyPrefix: 'SearchPage' })
  const [recentUsers, setRecentUsers] = useState<UserType[]>()

  const [trigger, { data }] = useLazyGetUsersQuery()
  const onSetInput = debounce((e: string) => {
    setCurrentPage(1)
    setSearchParams(prevState => e)
    trigger({ str: e, pageSize: 14, pageNumber: 1 })
    if (!searchParams) {
      setUsers([])
    }
  })

  const [users, setUsers] = useState<UserType[]>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalUsersCount, setTotalUsersCount] = useState<number | undefined>(30)
  const infScrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      users &&
      totalUsersCount &&
      users.length < totalUsersCount
    ) {
      trigger({ str: searchParams, pageSize: 14, pageNumber: currentPage + 1 })
    }
  }

  useEffect(() => {
    setTotalUsersCount(data?.totalCount)
    if (data && data?.page > 1) {
      setUsers(users?.concat(data.items))
      setCurrentPage(prevState => prevState + 1)
    } else {
      setUsers(data?.items)
    }
  }, [data])

  useEffect(() => {
    document.addEventListener('scroll', infScrollHandler)

    return () => {
      document.removeEventListener('scroll', infScrollHandler)
    }
  }, [searchParams, currentPage, totalUsersCount])

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
        {data && searchParams && users?.map(user => <UserItem key={user.id} user={user} />)}
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
