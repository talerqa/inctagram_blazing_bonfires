import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { io } from 'socket.io-client'

import { baseURL } from '../base-url.api'

import { AvatarsType, ProfileUserType } from '@/shared/api'
import {
  GetNotificationsResponseType,
  GetUserFollowersResponseType,
  GetUserFollowingsResponseType,
} from '@/shared/api/services/profile/profile.api.types'

enum ChatEvent {
  ReceiverNotifications = 'notifications',
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: 'same-origin',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ['dataProfile', 'getNotification'],
  endpoints: build => {
    return {
      getProfileUser: build.query<ProfileUserType, void>({
        query: () => {
          return {
            method: 'GET',
            url: `users/profile`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
          }
        },
        transformResponse: (baseQueryReturnValue: ProfileUserType) => {
          if (baseQueryReturnValue?.aboutMe === null) {
            baseQueryReturnValue.aboutMe = ''
          }

          return baseQueryReturnValue
        },
        providesTags: ['dataProfile'],
      }),
      updateProfile: build.mutation<ProfileUserType, ProfileUserType>({
        query: (data: ProfileUserType) => {
          const { ...body } = data

          return {
            method: 'PUT',
            url: 'users/profile',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            body,
          }
        },
        invalidatesTags: ['dataProfile'],
      }),
      updateAvatar: build.mutation<AvatarsType, FormData>({
        query: data => {
          return {
            method: 'POST',
            url: 'users/profile/avatar',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            body: data,
          }
        },
        invalidatesTags: ['dataProfile'],
      }),
      deleteAvatar: build.mutation<void, void>({
        query: () => {
          return {
            method: 'DELETE',
            url: 'users/profile/avatar',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
          }
        },
        invalidatesTags: ['dataProfile'],
      }),
      getProfileFollowings: build.query<GetUserFollowingsResponseType, { userName: string }>({
        query: ({ userName }) => {
          return {
            method: 'GET',
            url: `users/${userName}}/following`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
          }
        },
      }),
      getProfileFollowers: build.query<GetUserFollowersResponseType, { userName: string }>({
        query: ({ userName }) => {
          return {
            method: 'GET',
            url: `users/${userName}}/followers`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
          }
        },
      }),
      getNotifications: build.query<
        GetNotificationsResponseType,
        { cursor?: number; sortBy?: string; pageSize?: string; sortDirection?: string }
      >({
        query: ({ cursor }) => {
          return {
            method: 'GET',
            url: `notifications/${cursor}`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
          }
        },
        providesTags: ['getNotification'],
      }),
      markAsReadNotification: build.mutation<void, { ids: number[] }>({
        query: ids => {
          return {
            method: 'PUT',
            url: 'notifications/mark-as-read',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            body: ids,
          }
        },
        invalidatesTags: ['getNotification'],
      }),
    }
  },
})

export const {
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useDeleteAvatarMutation,
  useLazyGetProfileUserQuery,
  useGetProfileUserQuery,
  useGetProfileFollowingsQuery,
  useGetProfileFollowersQuery,
  useGetNotificationsQuery,
  useMarkAsReadNotificationMutation,
} = profileApi
