import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import style from './sidebar.module.scss'

import CreatePost from '@/features/create-post'
import { Logout } from '@/features/logout/ui/logout/logout'
import favoritesImage from '@/shared/assets/icons/side-bar/favorites.svg'
import homeImage from '@/shared/assets/icons/side-bar/home.svg'
import messengerImage from '@/shared/assets/icons/side-bar/messenger.svg'
import myProfileImage from '@/shared/assets/icons/side-bar/my-profile.svg'
import paymentsImage from '@/shared/assets/icons/side-bar/payments.svg'
import postsImage from '@/shared/assets/icons/side-bar/posts.svg'
import searchImage from '@/shared/assets/icons/side-bar/search.svg'
import statisticsImage from '@/shared/assets/icons/side-bar/statistics.svg'
import userListImage from '@/shared/assets/icons/side-bar/user-list.svg'
import { RoutersPath } from '@/shared/constants/paths'
import { ButtonTheme } from '@/shared/ui'

export const SideBar = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const mainPath = router.pathname.split('/')

  return (
    <aside className={style.sideBarContainer}>
      {mainPath[1] === 'super-admin' ? (
        <div className={style.superAdminContainer}>
          <div
            className={style.linkWrapper}
            onClick={() => router.push(RoutersPath.superAdminUsersList)}
          >
            <Image src={userListImage} alt={''} />
            {t('UserList')}
          </div>
          <div
            className={style.linkWrapper}
            onClick={() => router.push(RoutersPath.superAdminStatistics)}
          >
            <Image src={statisticsImage} alt={''} />
            {t('Statistics')}
          </div>
          <div
            className={style.linkWrapper}
            onClick={() => router.push(RoutersPath.superAdminPaymentsList)}
          >
            <Image src={paymentsImage} alt={''} />
            {t('PaymentsList')}
          </div>
          <div
            className={`${style.linkWrapper} ${style.linkWrapperLast}`}
            onClick={() => router.push(RoutersPath.superAdminPostsList)}
          >
            <Image src={postsImage} alt={''} />
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
            <Image src={homeImage} alt={''} />
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
            <Image src={myProfileImage} alt={''} />
            {t('MyProfile')}
          </div>
          <div className={style.linkWrapper}>
            <Image src={messengerImage} alt={''} />
            {t('Messenger')}
          </div>
          <div className={style.linkWrapper}>
            <Image src={searchImage} alt={''} />
            {t('Search')}
          </div>
          <div className={style.linkWrapper}>
            <Image src={statisticsImage} alt={''} />
            {t('Statistics')}
          </div>
          <div className={style.linkWrapper}>
            <Image src={favoritesImage} alt={''} />
            {t('Favorites')}
          </div>
          <div className={style.linkWrapper}>
            <Logout className={style.logoutBtn} theme={ButtonTheme.CLEAR} />
          </div>
        </>
      )}
    </aside>
  )
}
