import React, { useEffect, useState } from 'react'

import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import styles from './header.module.scss'

import { Logout } from '@/features/logout'
import { DeletePost } from '@/features/post/ui/icons/delete-post'
import { EditPost } from '@/features/post/ui/icons/edit-post'
import {
  useGetNotificationsQuery,
  useMarkAsReadNotificationMutation,
} from '@/shared/api/services/profile/profile.api'
import { NotificationsItemType } from '@/shared/api/services/profile/profile.api.types'
import { NotificationIcon, NotificationOpenIcon } from '@/shared/assets/icons'
import logoutImg from '@/shared/assets/icons/logout/logout.svg'
import { ThreeDots } from '@/shared/assets/icons/three-dots/icon/three-dots'
import { RoutersPath } from '@/shared/constants/paths'
import { LocalStorageManager } from '@/shared/storages/local-storage-manager/local-storage-manager'
import { DropdownMenu, Text } from '@/shared/ui'
import { Card } from '@/shared/ui/card/Card'
import { useFindDateDifference } from '@/shared/utils/useFindDateDifference'
import { useGetNewNotification } from '@/widgets/header/api/use-get-new-notification'
import { getNumberOfNewNotifications } from '@/widgets/header/ui/helpers/get-number-of-new-notifications'
import { useTranslateNotificationMessage } from '@/widgets/header/ui/helpers/use-translate-notification-message'
import { LanguageSelect } from '@/widgets/lang-switcher'

export const Header = dynamic(() => Promise.resolve(ClientHeader), { ssr: false })

const ClientHeader = ({ isMobile }: { isMobile?: boolean }) => {
  const [notifications, setNotifications] = useState<NotificationsItemType[] | []>([])

  const [showNotifications, setShowNotifications] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const { translateNotificationMessage } = useTranslateNotificationMessage()
  const { findDateDifference } = useFindDateDifference()
  const { t } = useTranslation('common')
  const router = useRouter()
  const mainPath = router.pathname.split('/')
  const { newNotification } = useGetNewNotification()

  const { data: initialNotifications } = useGetNotificationsQuery({
    cursor: Number(LocalStorageManager.getLastNotificationCursorId()) || undefined,
    sortDirection: 'asc',
  })
  const newNotificationsId = notifications.filter(item => !item.isRead).map(item => item.id)
  const [markAsReadNotification] = useMarkAsReadNotificationMutation()

  useEffect(() => {
    if (initialNotifications && initialNotifications.items) {
      const filteredNotifications = initialNotifications.items.filter(notification => {
        const notificationDate = new Date(notification.notifyAt)

        // If date of notifyAt is set to tomorrow's date or less, we should display notification. Otherwise, ignore.
        return notificationDate.getTime() <= new Date().getTime() + 24 * 60 * 60 * 1000
      })

      setNotifications(filteredNotifications)
    }
  }, [initialNotifications])

  useEffect(() => {
    if (newNotification) {
      // Merge new notifications with existing notifications
      setNotifications(prevNotifications => [
        ...prevNotifications,
        {
          id: newNotification.id,
          isRead: newNotification.isRead,
          message: newNotification.message,
          notifyAt: newNotification.notifyAt,
        },
      ])
    }
  }, [newNotification])
  const newNotificationNumber = getNumberOfNewNotifications(notifications)
  const notificationOpenHandler = (isOpen: boolean) => {
    notifications?.length && setShowNotifications(isOpen)
    if (showNotifications && !isOpen && newNotificationNumber) {
      markAsReadNotification({ ids: newNotificationsId })
    }
  }
  const readTextStyle = clsx(styles.text, styles.read)
  const isSuperAdmin = mainPath[1] === 'super-admin'

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link
          href={isSuperAdmin ? RoutersPath.superAdmin : RoutersPath.home}
          className={styles.logo}
        >
          Inсtagram
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
                {!!notifications?.length && (
                  <Card
                    isOpen={showNotifications}
                    headerText={`${t('Notifications.notifications')}`}
                    className={styles.notificationContainer}
                    setIsOpen={notificationOpenHandler}
                    icon={
                      showNotifications ? (
                        <NotificationOpenIcon className={styles.iconContainer} />
                      ) : (
                        <div className={styles.iconContainer}>
                          <NotificationIcon />
                          {!!newNotificationNumber && (
                            <div className={styles.count}>{newNotificationNumber}</div>
                          )}
                        </div>
                      )
                    }
                  >
                    {notifications?.map(item => (
                      <div key={item.id} className={styles.notification}>
                        <Text
                          as={'p'}
                          weight={'bold'}
                          className={item.isRead ? readTextStyle : styles.text}
                        >
                          {!item.isRead
                            ? t('Notifications.newNotification')
                            : t('Notifications.notification')}{' '}
                          <span>{!item.isRead && t('Notifications.new')}</span>
                        </Text>
                        <Text as={'p'} className={item.isRead ? readTextStyle : styles.text}>
                          {translateNotificationMessage(item.message)}
                        </Text>
                        <Text as={'p'} className={readTextStyle}>
                          {findDateDifference(item.notifyAt)}
                        </Text>
                      </div>
                    ))}
                  </Card>
                )}
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
  )
}
