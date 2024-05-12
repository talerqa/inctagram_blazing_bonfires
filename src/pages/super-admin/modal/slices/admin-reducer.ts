import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  Post as PostType,
  ProfileImagesFragmentFragment,
  SortDirection,
} from '@/__generated__/graphql'
import { RootState } from '@/shared/providers/store-provider'
import { SortType } from '@/shared/ui/table/table'

type AdminInitialStateType = {
  pageSize: number
  pageNumber: number
  sortBy: SortType | null
  sortDirection: SortDirection
  adminLoading: boolean
  selectedUserImages: ProfileImagesFragmentFragment[]
  usersPosts: PostType[]
}

const adminSlice = createSlice({
  name: 'admin',
  initialState: <AdminInitialStateType>{
    pageSize: 10,
    pageNumber: 1,
    sortBy: null,
    sortDirection: 'desc',
    adminLoading: false,
    selectedUserImages: [],
    usersPosts: [],
  },
  reducers: {
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
    },
    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload
    },
    setAdminLoading(state, action: PayloadAction<boolean>) {
      state.adminLoading = action.payload
    },
    setSelectedUserImages(state, action: PayloadAction<ProfileImagesFragmentFragment[]>) {
      state.selectedUserImages = action.payload
    },
    setUsersPosts(state, action: PayloadAction<PostType[]>) {
      state.usersPosts = [...state.usersPosts, ...action.payload]
    },
    addLastAddedPostToUsersPosts(state, action: PayloadAction<PostType>) {
      state.usersPosts = [action.payload, ...state.usersPosts]
    },
  },
})

export const {
  setPageSize,
  setPageNumber,
  setAdminLoading,
  setSelectedUserImages,
  addLastAddedPostToUsersPosts,
  setUsersPosts,
} = adminSlice.actions
export default adminSlice.reducer

export const selectAdminLoading = (state: RootState) => state.admin.adminLoading
export const selectUsersPosts = (state: RootState) => state.admin.usersPosts
