import { useEffect, useState } from 'react'

import { Socket } from 'socket.io-client'

import { NotificationsItemType } from '@/shared/api/services/profile/profile.api.types'
import { GetNotificationsSocketApi } from '@/widgets/header/api/get-notifications-socket-api'

export const useGetNotificationsSocket = () => {
  const accessToken = localStorage.getItem('accessToken')
  const [notifications, setNotifications] = useState<NotificationsItemType | null>(null)

  if (!accessToken) return

  const connectSocket = () => {
    GetNotificationsSocketApi.createConnection(accessToken)

    GetNotificationsSocketApi.socket?.on('notifications', (data: NotificationsItemType) => {
      console.log(data)
      setNotifications(data)
    })
  }

  console.log(notifications, ' NOTIFICATIONS')

  useEffect(() => {
    connectSocket()
  }, [])

  return { notifications }
}
