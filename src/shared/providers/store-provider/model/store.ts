import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { createWrapper } from 'next-redux-wrapper'

import { authApi, devicesApi, profileApi, publicApi, subscriptionsApi } from '../../../api'

import userManagementSlice from '@/features/super-admin-user-management/model/user-management-slice'
import superAdminUserProfileSlice from '@/features/super-admin-user-profile/model/super-admin-user-profile.slice'
import adminAuthReducer from '@/pages/super-admin/modal/slices/admin-auth-reducer'
import adminReducer from '@/pages/super-admin/modal/slices/admin-reducer'
import { appReducer } from '@/shared/api/services/app/app.slice'
import { authReducer } from '@/shared/api/services/auth/auth.slice'
import { postReducer } from '@/shared/api/services/posts/post.slice'
import { postsApi } from '@/shared/api/services/posts/posts.api'
import { usersApi } from '@/shared/api/services/users/users.api'
import generalInfoReducer from '@/shared/providers/store-provider/slices/profile-settings/general-info-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  adminUserProfile: superAdminUserProfileSlice,
  post: postReducer,
  profileSetting: generalInfoReducer,
  admin: adminReducer,
  adminAuth: adminAuthReducer,
  userManagement: userManagementSlice,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [devicesApi.reducerPath]: devicesApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
  [publicApi.reducerPath]: publicApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
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
        publicApi.middleware,
        usersApi.middleware
      ),
  })
}

setupListeners(makeStore().dispatch)

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
