import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { baseURL } from '@/shared/api/services/base-url.api'
import { ExtendedUserType, UsersResponseType } from '@/shared/api/services/search/users.api.types'

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
  tagTypes: ['dataUser'],
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
    // getFollowers: builder.query<any, any>({
    //   query: arg => {
    //     const { userName } = arg
    //
    //     return {
    //       method: 'GET',
    //       url: `users/${userName}/followers`,
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
    //       },
    //     }
    //   },
    // }),
    // getFollowing: builder.query<any, any>({
    //   query: arg => {
    //     const { userName } = arg
    //
    //     return {
    //       method: 'GET',
    //       url: `users/${userName}/following`,
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
    //       },
    //     }
    //   },
    // }),
    getUserData: builder.query<ExtendedUserType, { userName: string } | { userName: undefined }>({
      query: arg => {
        const { userName } = arg

        return {
          method: 'GET',
          url: `users/${userName}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
          },
        }
      },
      providesTags: ['dataUser'],
    }),
    followUser: builder.mutation<void, { selectedUserId: number } | { selectedUserId: undefined }>({
      query: data => {
        return {
          method: 'POST',
          url: `users/following`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
          },
          body: data,
        }
      },
      invalidatesTags: ['dataUser'],
    }),
  }),
})

export const {
  useLazyGetUsersQuery,
  // useGetFollowersQuery,
  // useGetFollowingQuery,
  useGetUserDataQuery,
  useFollowUserMutation,
} = searchApi
