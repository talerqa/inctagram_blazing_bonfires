import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { authApi, devicesApi, profileApi, subscriptionsApi } from '../../../api'

import { postsApi } from '@/shared/api/services/posts/posts.api'
import generalInfoReducer from '@/shared/providers/storeProvider/slices/profileSettings/generalInfoReducer'

export const store = configureStore({
  reducer: {
    profileSetting: generalInfoReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [devicesApi.reducerPath]: devicesApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      profileApi.middleware,
      devicesApi.middleware,
      postsApi.middleware,
      subscriptionsApi.middleware
    ),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
