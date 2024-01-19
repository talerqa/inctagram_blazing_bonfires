import {createApi, fetchBaseQuery,} from '@reduxjs/toolkit/query/react'
import {HYDRATE} from 'next-redux-wrapper'

import {baseURL} from '../baseUrl.api'

import {
  PublicProfilePostsResponseType,
  PublicProfilePostsType,
  PublicProfileType
} from "./public.api.types";


export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: build => {
    return {
      getPublicProfile: build.query<PublicProfileType, number>({
        query: profileId => {
          return {
            method: 'GET',
            url: `public-user/profile/${profileId}`,
          }
        },
      }),
      getPublicProfilePosts: build.query<PublicProfilePostsResponseType, PublicProfilePostsType>({
        query: ({
                  userId,
                  endCursorPostId,
                  pageSize,
                  sortBy,
                  sortDirection,
                }) => {
          return {
            method: 'GET',
            url: `public-posts/user/${userId}/${endCursorPostId}`,
            params: {
              pageSize, sortBy, sortDirection
            },
          }
        },
      })
    }
  },
})

export const {
  useGetPublicProfilePostsQuery,
  useGetPublicProfileQuery
} = publicApi
