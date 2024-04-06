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
import { useGetNotificationsQuery } from '@/shared/api/services/profile/profile.api'
import { NotificationIcon } from '@/shared/assets/icons'
import logoutImg from '@/shared/assets/icons/logout/logout.svg'
import { ThreeDots } from '@/shared/assets/icons/three-dots/icon/three-dots'
import { RoutersPath } from '@/shared/constants/paths'
import { DropdownMenu, Text } from '@/shared/ui'
import { Card } from '@/shared/ui/card/Card'
import { LanguageSelect } from '@/widgets/lang-switcher'

export const Header = ({ isMobile }: { isMobile?: boolean }) => {
  const [count, setCounter] = useState(3)
  const [showNotifications, setShowNotifications] = useState(false)
  const { t } = useTranslation('common')
  const router = useRouter()
  const mainPath = router.pathname.split('/')
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const messages = useNotificationsQuery()
  const notifications = useGetNotificationsQuery({ sortBy: 'notifyAt', sortDirection: 'desc' })

  // console.log(messages, 'WEBSOCKET')
  console.log(notifications, 'Notifications')

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
              <>
                <div className={styles.ball}>
                  <NotificationIcon onClick={() => setShowNotifications(!showNotifications)} />
                  {showNotifications && (
                    <Card headerText={'notifications'}>
                      {notifications.data.items.map(item => (
                        <div key={item.id} className={styles.notification}>
                          <Text as={'h6'} color={'light'}>
                            New notification!
                          </Text>
                          <Text as={'p'} color={'light'}>
                            {item.message}{' '}
                            <span style={{ color: 'lightblue' }}>{item.isRead && 'New'}</span>
                          </Text>
                          <Text as={'p'} color={'light'}>
                            {item.notifyAt}
                          </Text>
                        </div>
                      ))}
                    </Card>
                  )}
                  <div className={styles.count}>{count}</div>
                </div>
              </>
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
                  <RDropdownMenu.Item onSelect={() => {}}>
                    <DeletePost />
                    <p>{t('Statistics')}</p>
                  </RDropdownMenu.Item>
                  <RDropdownMenu.Item onSelect={() => {}}>
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
