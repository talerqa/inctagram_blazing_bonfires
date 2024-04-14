import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { baseURL } from '@/shared/api/services/base-url.api'
import { UsersResponseType } from '@/shared/api/services/search/users.api.types'

export const searchApi = createApi({
  reducerPath: 'searchAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: 'same-origin',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: builder => ({
    getUsers: builder.query<
      UsersResponseType,
      { str: string; pageSize: number; pageNumber: number }
    >({
      query: arg => {
        const { str, pageSize, pageNumber } = arg

        return {
          method: 'GET',
          url: `users?search=${str}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
          params: { str },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
          },
        }
      },
    }),
  }),
})

export const { useLazyGetUsersQuery, useGetUsersQuery } = searchApi
