import React, { useState } from 'react'

import { clsx } from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import style from './sidebar.module.scss'

import CreatePost from '@/features/create-post'
import { Logout } from '@/features/logout/ui/logout/logout'
import {
  HomeIcon,
  MessengerIcon,
  PaymentsIcon,
  PostsIcon,
  ProfileIcon,
  SearchIcon,
  StatisticsIcon,
} from '@/shared/assets/icons'
import favoritesImage from '@/shared/assets/icons/side-bar/favorites.svg'
import { RoutersPath } from '@/shared/constants/paths'
import { ButtonTheme } from '@/shared/ui'

export const SideBar = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const mainPath = router.pathname.split('/')
  const [isModalOpen, setIsModalOpen] = useState(false)

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
          <div
            className={classNames.usersList}
            onClick={() => router.push(RoutersPath.superAdminUsersList)}
          >
            <ProfileIcon />
            {t('UserList')}
          </div>
          <div
            className={classNames.statistics}
            onClick={() => router.push(RoutersPath.superAdminStatistics)}
          >
            <StatisticsIcon />
            {t('Statistics')}
          </div>
          <div
            className={classNames.payments}
            onClick={() => router.push(RoutersPath.superAdminPaymentsList)}
          >
            <PaymentsIcon />
            {t('PaymentsList')}
          </div>
          <div
            className={classNames.posts}
            onClick={() => router.push(RoutersPath.superAdminPostsList)}
          >
            <PostsIcon />
            {t('PostsList')}
          </div>
        </div>
      ) : (
        <div className={style.publicContainer}>
          <div className={classNames.home} onClick={() => router.push('/')}>
            <HomeIcon />
            {t('Home')}
          </div>
          <div className={classNames.createPost}>
            <CreatePost />
          </div>
          <div className={classNames.myProfile} onClick={() => router.push(RoutersPath.profile)}>
            <ProfileIcon />
            {t('MyProfile')}
          </div>
          <div className={classNames.messenger}>
            <MessengerIcon />
            {t('Messenger')}
          </div>
          <div className={classNames.search}>
            <SearchIcon />
            {t('Search')}
          </div>
          <div className={style.linkWrapper}>
            <StatisticsIcon />
            {t('Statistics')}
          </div>
          <div className={style.linkWrapper}>
            <Image src={favoritesImage} alt={''} />
            {t('Favorites')}
          </div>
          <div className={style.linkWrapper}>
            <Logout
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              className={style.logoutBtn}
              theme={ButtonTheme.CLEAR}
            />
          </div>
        </div>
      )}
    </aside>
  )
}
