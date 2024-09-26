import React from 'react'

import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import style from './sidebar-mobile.module.scss'

import CreatePost from '@/features/create-post'
import { selectAdminLoading, setAdminLoading } from '@/pages/super-admin/modal/slices/admin-reducer'
import {
  HomeIcon,
  MessengerIcon,
  PaymentsIcon,
  PostsIcon,
  ProfileIcon,
  SearchIcon,
  StatisticsIcon,
} from '@/shared/assets/icons'
import { RoutersPath } from '@/shared/constants/paths'
import { RootState } from '@/shared/providers/store-provider'
import { CircularLoader } from '@/shared/ui'

export const SidebarMobile = () => {
  const router = useRouter()
  const mainPath = router.pathname.split('/')
  const isAdminLoading = useSelector(selectAdminLoading)

  const classNames = {
    myProfile: clsx(
      router.pathname === RoutersPath.profile ? style.linkWrapperActive : style.linkWrapper
    ),
    search: clsx(
      router.pathname === RoutersPath.search ? style.linkWrapperActive : style.linkWrapper
    ),
    messenger: clsx(router.pathname === 'replace' ? style.linkWrapperActive : style.linkWrapper),
    createPost: style.linkWrapper,
    home: clsx(router.pathname === RoutersPath.home ? style.linkWrapperActive : style.linkWrapper),
    usersList: clsx(
      router.pathname === RoutersPath.superAdminUsersList
        ? style.linkWrapperActive
        : style.linkWrapper
    ),
    statistics: clsx(
      router.pathname === RoutersPath.superAdminStatistics
        ? style.linkWrapperActive
        : style.linkWrapper
    ),
    payments: clsx(
      router.pathname === RoutersPath.superAdminPaymentsList
        ? style.linkWrapperActive
        : style.linkWrapper
    ),
    posts: clsx(
      style.linkWrapperLast,
      router.pathname === RoutersPath.superAdminPostsList
        ? style.linkWrapperActive
        : style.linkWrapper
    ),
  }

  return (
    <aside className={style.sideBarContainer}>
      {mainPath[1] === 'super-admin' ? (
        <div className={style.superAdminContainer}>
          {isAdminLoading ? (
            <CircularLoader />
          ) : (
            <>
              <div
                className={classNames.usersList}
                onClick={() => router.push(RoutersPath.superAdminUsersList)}
              >
                <ProfileIcon />
              </div>
              <div
                className={classNames.statistics}
                onClick={() => router.push(RoutersPath.superAdminStatistics)}
              >
                <StatisticsIcon />
              </div>
              <div
                className={classNames.payments}
                onClick={() => router.push(RoutersPath.superAdminPaymentsList)}
              >
                <PaymentsIcon />
              </div>
              <div
                className={classNames.posts}
                onClick={() => router.push(RoutersPath.superAdminPostsList)}
              >
                <PostsIcon />
              </div>
            </>
          )}
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
          <div className={classNames.search} onClick={() => router.push(RoutersPath.search)}>
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
