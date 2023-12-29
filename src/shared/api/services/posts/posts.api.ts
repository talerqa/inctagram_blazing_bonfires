import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { baseURL } from '../baseUrl.api'

import {
  GetUserPostsRequestType,
  GetUserPostsResponseType,
  ImagesResponse,
  PostsResponseType,
  PostsType,
  UpdatePostRequestType,
} from '@/shared/api/services/posts/posts.api.types'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  tagTypes: ['editPost', 'deletePost', 'createPost'],
  endpoints: build => {
    return {
      createPost: build.mutation<PostsResponseType, PostsType>({
        query: body => {
          return {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: 'posts',
            body,
          }
        },
        invalidatesTags: ['createPost'],
      }),
      getPost: build.query<PostsResponseType, number>({
        query: postId => {
          return {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `public-posts/${postId}`,
          }
        },
        providesTags: ['editPost'],
      }),
      deletePost: build.mutation<void, number>({
        query: postId => {
          return {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `posts/${postId}`,
          }
        },
        invalidatesTags: ['deletePost'],
      }),
      getUserPosts: build.query<GetUserPostsResponseType, GetUserPostsRequestType>({
        query: ({ userId, pageNumber, pageSize, endCursorPostId }) => {
          return {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `public-posts/user/${userId}/${endCursorPostId}`,
            params: {
              pageSize,
              pageNumber,
            },
          }
        },
        providesTags: ['deletePost', 'createPost'],
      }),
      uploadImage: build.mutation<ImagesResponse, FormData>({
        query: body => {
          return {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: 'posts/image',
            body,
          }
        },
      }),
      updatePost: build.mutation<void, UpdatePostRequestType>({
        query: ({ postId, body }) => {
          return {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `posts/${postId}`,
            body,
          }
        },
        invalidatesTags: ['editPost'],
      }),
    }
  },
})

export const {
  useCreatePostMutation,
  useUploadImageMutation,
  useLazyGetPostQuery,
  useLazyGetUserPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postsApi
