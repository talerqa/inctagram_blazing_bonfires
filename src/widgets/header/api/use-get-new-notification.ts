import { useEffect, useState } from 'react'

import { NotificationsItemType } from '@/shared/api/services/profile/profile.api.types'
import { LocalStorageManager } from '@/shared/storages/local-storage-manager/local-storage-manager'
import { GetNotificationsSocketApi } from '@/widgets/header/api/get-notifications-socket-api'

type UseGetNotificationsSocketType = {
  newNotification: NotificationsItemType | null
  error: string
}

export const useGetNewNotification = (): UseGetNotificationsSocketType => {
  const accessToken = LocalStorageManager.getNotificationsAccessToken()
  const [newNotification, setNewNotification] = useState<NotificationsItemType | null>(null)
  const [error, setError] = useState('')

  if (!accessToken) return { newNotification: null, error: 'Access token not found' }

  GetNotificationsSocketApi.socket?.on('notifications', (data: NotificationsItemType) => {
    setNewNotification(data)
    LocalStorageManager.setLastNotificationCursorId(String(data.id))
  })

  useEffect(() => {
    if (!GetNotificationsSocketApi.socket) {
      GetNotificationsSocketApi.createConnection(accessToken)
    }

    return () => GetNotificationsSocketApi.disconnect()
  }, [])

  GetNotificationsSocketApi.socket?.onAny(event => {
    if (event.message?.length) {
      setError(JSON.stringify(event))
    }
  })

  return { newNotification, error }
}
