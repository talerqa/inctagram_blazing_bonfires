import React from 'react'

import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import style from './sidebar-mobile.module.scss'

import CreatePost from '@/features/create-post'
import {
  HomeIcon,
  MessengerIcon,
  PaymentsIcon,
  PostsIcon,
  ProfileIcon,
  SearchIcon,
  StatisticsIcon,
  UserIcon,
} from '@/shared/assets/icons'
import { RoutersPath } from '@/shared/constants/paths'

export const SidebarMobile = () => {
  const router = useRouter()
  const mainPath = router.pathname.split('/')

  const classNames = {
    myProfile: clsx(
      router.pathname === RoutersPath.profile ? style.linkWrapperActive : style.linkWrapper
    ),
    search: clsx(router.pathname === 'replace' ? style.linkWrapperActive : style.linkWrapper),
    messenger: clsx(router.pathname === 'replace' ? style.linkWrapperActive : style.linkWrapper),
    createPost: style.linkWrapper,
    home: clsx(router.pathname === RoutersPath.home ? style.linkWrapperActive : style.linkWrapper),
    usersList: clsx(
      router.pathname === RoutersPath.superAdminUsersList
        ? style.linkWrapperActive
        : style.linkWrapper
    ),
  }

  return (
    <aside className={style.sideBarContainer}>
      {mainPath[1] === 'super-admin' ? (
        <div className={style.superAdminContainer}>
          <div
            className={classNames.usersList}
            onClick={() => router.push(RoutersPath.superAdminUsersList)}
          >
            <UserIcon />
          </div>
          <div
            className={style.linkWrapper}
            onClick={() => router.push(RoutersPath.superAdminStatistics)}
          >
            <StatisticsIcon />
          </div>
          <div
            className={style.linkWrapper}
            onClick={() => router.push(RoutersPath.superAdminPaymentsList)}
          >
            <PaymentsIcon />
          </div>
          <div
            className={`${style.linkWrapper} ${style.linkWrapperLast}`}
            onClick={() => router.push(RoutersPath.superAdminPostsList)}
          >
            <PostsIcon />
          </div>
        </div>
      ) : (
        <>
          <div className={classNames.home} onClick={() => router.push('/')}>
            <HomeIcon />
          </div>
          <div className={classNames.createPost}>
            <CreatePost />
          </div>
          <div className={classNames.messenger}>
            <MessengerIcon />
          </div>
          <div className={classNames.search}>
            <SearchIcon />
          </div>
          <div className={classNames.myProfile} onClick={() => router.push(RoutersPath.profile)}>
            <ProfileIcon />
          </div>
        </>
      )}
    </aside>
  )
}
