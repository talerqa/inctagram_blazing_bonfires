import { useEffect, useState } from 'react'

import { Socket } from 'socket.io-client'

import { NotificationsItemType } from '@/shared/api/services/profile/profile.api.types'
import { GetNotificationsSocketApi } from '@/widgets/header/api/get-notifications-socket-api'

export const useGetNotificationsSocket = () => {
  const accessToken = localStorage.getItem('accessToken')
  const [notification, setNotification] = useState<NotificationsItemType | null>(null)
  const [error, setError] = useState('')

  if (!accessToken) return null

  const connectSocket = () => {
    GetNotificationsSocketApi.createConnection(accessToken)

    GetNotificationsSocketApi.socket?.on('notifications', (data: NotificationsItemType) => {
      console.log(data)
      setNotification(data)
    })

    GetNotificationsSocketApi.socket?.onAny((event, ...args) => {
      console.log('onAny Event:', event)
      console.log('onAny Args:', args)
      if (event.message?.length) {
        setError(JSON.stringify(event))
        console.log(event)
      }
    })
  }

  console.log(notification, ' NOTIFICATIONS')

  useEffect(() => {
    connectSocket()
  }, [])

  return { notification, error }
}
