import { NotificationsItemType } from '@/shared/api/services/profile/profile.api.types'

export const getNumberOfNewNotifications = (notificationsArr: NotificationsItemType[]) => {
  return notificationsArr.reduce((newNotificationsCount, notification) => {
    return notification.isRead ? (newNotificationsCount += 1) : newNotificationsCount
  }, 0)
}
