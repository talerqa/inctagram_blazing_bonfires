import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@/__generated__/graphql'
import { RootState } from '@/shared/providers/store-provider'

type SuperAdminUserProfileSliceType = {
  selectedUser: User | null
}

const superAdminUserProfileSlice = createSlice({
  name: 'super-admin-user-profile',
  initialState: <SuperAdminUserProfileSliceType>{
    selectedUser: null,
  },
  reducers: {
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload
    },
  },
})

export const { setSelectedUser } = superAdminUserProfileSlice.actions
export default superAdminUserProfileSlice.reducer

export const selectSelectedUser = (state: RootState) => state.userManagement.selectedUser
