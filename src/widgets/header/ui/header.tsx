import React, { useState } from 'react'

import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import styles from './header.module.scss'

import { Logout } from '@/features/logout'
import { DeletePost } from '@/features/post/ui/icons/delete-post'
import { EditPost } from '@/features/post/ui/icons/edit-post'
import { NotificationIcon } from '@/shared/assets/icons'
import logoutImg from '@/shared/assets/icons/logout/logout.svg'
import { ThreeDots } from '@/shared/assets/icons/three-dots/icon/three-dots'
import { RoutersPath } from '@/shared/constants/paths'
import { DropdownMenu } from '@/shared/ui'
import { LanguageSelect } from '@/widgets/lang-switcher'

export const Header = ({ isMobile }: { isMobile?: boolean }) => {
  const [count, setCounter] = useState(3)
  const { t } = useTranslation('common')
  const router = useRouter()
  const mainPath = router.pathname.split('/')
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link href="/" className={styles.logo}>
            Inctagram
            {mainPath[1] === 'super-admin' && (
              <span className={styles.adminDescription}>
                <span className={styles.adminDescriptionThin}>Super</span>Admin
              </span>
            )}
          </Link>
          <div className={styles.option}>
            {mainPath[1] !== 'super-admin' && (
              <div className={styles.ball}>
                <NotificationIcon />
                <div className={styles.count}>{count}</div>
              </div>
            )}
            <div className={styles.langSwitcherContainer}>
              <LanguageSelect />
            </div>
            {isMobile && (
              <>
                <DropdownMenu triggerIcon={<ThreeDots />}>
                  <RDropdownMenu.Item
                    onSelect={() => router.push(RoutersPath.profileGeneralInformation)}
                  >
                    <EditPost />
                    <p>{t('ProfileSetting')}</p>
                  </RDropdownMenu.Item>
                  <RDropdownMenu.Item onSelect={() => {
                  }}>
                    <DeletePost />
                    <p>{t('Statistics')}</p>
                  </RDropdownMenu.Item>
                  <RDropdownMenu.Item onSelect={() => {
                  }}>
                    <EditPost />
                    <p>{t('Favorites')}</p>
                  </RDropdownMenu.Item>
                  <RDropdownMenu.Item onSelect={() => setIsModalOpen(true)}>
                    <Image src={logoutImg} alt={''} />
                    <span className={styles.description}>{t('Auth.LogOut')}</span>
                  </RDropdownMenu.Item>
                </DropdownMenu>
                <Logout hidden={true} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
              </>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
