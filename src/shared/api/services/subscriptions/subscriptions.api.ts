import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { baseURL } from '../base-url.api'

import {
  CurrentSubscriptionType,
  NewSubscriptionType,
  ResponseNewSubscriptionType,
  SubscriptionDataType,
} from '@/shared/api/services/subscriptions/subscriptions.api.types'

export const subscriptionsApi = createApi({
  reducerPath: 'subscriptionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ['dataPSubscriptions'],
  endpoints: build => {
    return {
      getSubscriptions: build.query<SubscriptionDataType[], void>({
        query: () => ({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
          },
          method: 'GET',
          url: 'subscriptions/my-payments',
        }),
      }),
      getCurrentSubscriptions: build.query<CurrentSubscriptionType, void>({
        query: () => {
          return {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `subscriptions/current-payment-subscriptions`,
            method: 'GET',
          }
        },
        providesTags: ['dataPSubscriptions'],
      }),
      createNewSubscription: build.mutation<ResponseNewSubscriptionType, NewSubscriptionType>({
        query: body => ({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
          },
          url: 'subscriptions',
          method: 'POST',
          body,
        }),
      }),
      cancelAutoRenewal: build.mutation<void, void>({
        query: () => ({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
          },
          url: 'subscriptions/canceled-auto-renewal',
          method: 'POST',
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            subscriptionsApi.util.updateQueryData('getCurrentSubscriptions', _, draft => {
              return { ...draft, hasAutoRenewal: false }
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()

            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
        invalidatesTags: ['dataPSubscriptions'],
      }),
    }
  },
})

export const {
  useGetSubscriptionsQuery, // get all subscriptions
  useGetCurrentSubscriptionsQuery, // only current
  useCreateNewSubscriptionMutation,
  useCancelAutoRenewalMutation,
} = subscriptionsApi
