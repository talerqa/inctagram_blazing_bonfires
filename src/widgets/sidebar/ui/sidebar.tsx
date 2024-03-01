import React, { useState } from 'react'

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
  UserIcon,
} from '@/shared/assets/icons'
import favoritesImage from '@/shared/assets/icons/side-bar/favorites.svg'
import { RoutersPath } from '@/shared/constants/paths'
import { ButtonTheme } from '@/shared/ui'

export const SideBar = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const mainPath = router.pathname.split('/')
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <aside className={style.sideBarContainer}>
      {mainPath[1] === 'super-admin' ? (
        <div className={style.superAdminContainer}>
          <div
            className={style.linkWrapper}
            onClick={() => router.push(RoutersPath.superAdminUsersList)}
          >
            <UserIcon />
            {t('UserList')}
          </div>
          <div
            className={style.linkWrapper}
            onClick={() => router.push(RoutersPath.superAdminStatistics)}
          >
            <StatisticsIcon />
            {t('Statistics')}
          </div>
          <div
            className={style.linkWrapper}
            onClick={() => router.push(RoutersPath.superAdminPaymentsList)}
          >
            <PaymentsIcon />
            {t('PaymentsList')}
          </div>
          <div
            className={`${style.linkWrapper} ${style.linkWrapperLast}`}
            onClick={() => router.push(RoutersPath.superAdminPostsList)}
          >
            <PostsIcon />
            {t('PostsList')}
          </div>
        </div>
      ) : (
        <>
          <div
            style={router.pathname === '/' ? { color: '#397DF6' } : {}}
            className={style.linkWrapper}
            onClick={() => router.push('/')}
          >
            <HomeIcon />
            {t('Home')}
          </div>
          <div className={style.linkWrapper}>
            <CreatePost />
          </div>
          <div
            style={router.pathname === RoutersPath.profile ? { color: '#397DF6' } : {}}
            className={style.linkWrapper}
            onClick={() => router.push(RoutersPath.profile)}
          >
            <ProfileIcon />
            {t('MyProfile')}
          </div>
          <div className={style.linkWrapper}>
            <MessengerIcon />
            {t('Messenger')}
          </div>
          <div className={style.linkWrapper}>
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
        </>
      )}
    </aside>
  )
}
