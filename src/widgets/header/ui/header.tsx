import React, { useState } from 'react'

import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useGetNotificationsSocket } from '../api/use-get-notifications'

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
import { useFindDateDifference } from '@/shared/utils/useFindDateDifference'
import { getNumberOfNewNotifications } from '@/widgets/header/ui/helpers/get-number-of-new-notifications'
import { useTranslateNotificationMessage } from '@/widgets/header/ui/helpers/use-translate-notification-message'
import { LanguageSelect } from '@/widgets/lang-switcher'

export const Header = ({ isMobile }: { isMobile?: boolean }) => {
  const { data: notifications } = useGetNotificationsQuery({
    cursor: 214,
    sortBy: 'notifyAt',
    sortDirection: 'desc',
  })
  const [showNotifications, setShowNotifications] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const { translateNotificationMessage } = useTranslateNotificationMessage()
  const { findDateDifference } = useFindDateDifference()
  const { t } = useTranslation('common')
  const router = useRouter()
  const mainPath = router.pathname.split('/')
  const getNotific = useGetNotificationsSocket()

  // const messages = useNotificationsQuery()

  // console.log(messages, 'WEBSOCKET')
  console.log(notifications, 'Notifications')

  if (!notifications) return null

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
                  <Card
                    isOpen={showNotifications}
                    headerText={`${t('Notifications.notifications')}`}
                    className={styles.notificationContainer}
                    setIsOpen={setShowNotifications}
                    icon={<NotificationIcon />}
                  >
                    {notifications.items.map(item => (
                      <div key={item.id} className={styles.notification}>
                        <Text as={'p'} color={'light'} weight={'bold'} className={styles.text}>
                          {t('Notifications.notifications')}{' '}
                          <span>{item.isRead && t('Notifications.new')}</span>
                        </Text>
                        <Text as={'p'} color={'light'} className={styles.text}>
                          {translateNotificationMessage(item.message)}
                        </Text>
                        <Text as={'p'} color={'light'} className={styles.text}>
                          {findDateDifference(item.notifyAt)}
                        </Text>
                      </div>
                    ))}
                  </Card>
                  <div className={styles.count}>
                    {getNumberOfNewNotifications(notifications.items)}
                  </div>
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
                  <RDropdownMenu.Item onSelect={() => setIsLogoutModalOpen(true)}>
                    <Image src={logoutImg} alt={''} />
                    <span className={styles.description}>{t('Auth.LogOut')}</span>
                  </RDropdownMenu.Item>
                </DropdownMenu>
                <Logout
                  hidden={true}
                  isModalOpen={isLogoutModalOpen}
                  setIsModalOpen={setIsLogoutModalOpen}
                />
              </>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
