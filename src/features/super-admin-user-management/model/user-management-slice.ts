import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User, UserBlockStatus } from '@/__generated__/graphql'
import { BlockedStatusType } from '@/pages/super-admin/users-list'
import { RootState } from '@/shared/providers/store-provider'

type UserManagementSInitialStateType = {
  blockStatus: BlockedStatusType | UserBlockStatus
  usersBlockReason: string
  selectedUser: User | null
  banModalOpenStatus: boolean
  unbanModalOpenStatus: boolean
  deleteModalOpenStatus: boolean
  searchParameter: string
}

const userManagementSlice = createSlice({
  name: 'user-management',
  initialState: <UserManagementSInitialStateType>{
    blockStatus: 'ALL',
    usersBlockReason: 'not selected',
    selectedUser: null,
    banModalOpenStatus: false,
    unbanModalOpenStatus: false,
    deleteModalOpenStatus: false,
    searchParameter: '',
  },
  reducers: {
    setBlockStatus(state, action: PayloadAction<BlockedStatusType>) {
      state.blockStatus = action.payload
    },
    setUsersBlockReason(state, action: PayloadAction<string>) {
      state.usersBlockReason = action.payload
    },
    setBanModalOpenStatus(state, action: PayloadAction<boolean>) {
      state.banModalOpenStatus = action.payload
    },
    setUnbanModalOpenStatus(state, action: PayloadAction<boolean>) {
      state.unbanModalOpenStatus = action.payload
    },
    setDeleteModalOpenStatus(state, action: PayloadAction<boolean>) {
      state.deleteModalOpenStatus = action.payload
    },
    setSearchParameter(state, action: PayloadAction<string>) {
      state.searchParameter = action.payload
    },
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload
    },
  },
})

export const {
  setBlockStatus,
  setUsersBlockReason,
  setBanModalOpenStatus,
  setUnbanModalOpenStatus,
  setSelectedUser,
  setDeleteModalOpenStatus,
  setSearchParameter,
} = userManagementSlice.actions
export default userManagementSlice.reducer

export const selectBlockStatus = (state: RootState) => state.userManagement.blockStatus
export const selectUserBlockReason = (state: RootState) => state.userManagement.usersBlockReason
export const selectSelectedUser = (state: RootState) => state.userManagement.selectedUser
export const selectBanModalOpenStatus = (state: RootState) =>
  state.userManagement.banModalOpenStatus
export const selectUnbanModalOpenStatus = (state: RootState) =>
  state.userManagement.unbanModalOpenStatus
export const selectDeleteModalOpenStatus = (state: RootState) =>
  state.userManagement.deleteModalOpenStatus
export const selectSearchParameter = (state: RootState) => state.userManagement.searchParameter
