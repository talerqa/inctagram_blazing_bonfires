import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { useDispatch } from 'react-redux'

import { authApi, devicesApi, profileApi, publicApi, subscriptionsApi } from '../../../api'

import { authReducer } from '@/shared/api/services/auth/auth.slice'
import { postsApi } from '@/shared/api/services/posts/posts.api'
import generalInfoReducer from '@/shared/providers/storeProvider/slices/profileSettings/generalInfoReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  profileSetting: generalInfoReducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [devicesApi.reducerPath]: devicesApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
  [publicApi.reducerPath]: publicApi.reducer,
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        profileApi.middleware,
        devicesApi.middleware,
        postsApi.middleware,
        subscriptionsApi.middleware,
        publicApi.middleware
      ),
  })
}

// setupListeners(store.dispatch)

type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = ReturnType<AppStore['dispatch']>
export type RootState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
