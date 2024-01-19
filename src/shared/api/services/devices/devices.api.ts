import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { baseURL } from '../baseUrl.api'

import { UserSessionsType } from './devices.api.types'

export const devicesApi = createApi({
  reducerPath: 'devicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'same-origin' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ['sessions'],
  endpoints: build => {
    return {
      getSessions: build.query<UserSessionsType[], void>({
        query: () => {
          return {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: 'sessions',
          }
        },
        providesTags: ['sessions'],
      }),
      deleteSession: build.mutation<UserSessionsType, number>({
        query: id => {
          return {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `sessions/${id}`,
          }
        },
        invalidatesTags: ['sessions'],
      }),
      terminateAll: build.mutation<UserSessionsType, void>({
        query: () => {
          return {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `sessions/terminate-all`,
          }
        },
        invalidatesTags: ['sessions'],
      }),
    }
  },
})

export const { useGetSessionsQuery, useDeleteSessionMutation, useTerminateAllMutation } = devicesApi
