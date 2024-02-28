import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ProfileImagesFragmentFragment, SortDirection } from '@/__generated__/graphql'
import { SortType } from '@/shared/ui/_table/table'

type AdminInitialStateType = {
  pageSize: number
  pageNumber: number
  sortBy: SortType | null
  sortDirection: SortDirection
  adminLoading: boolean
  selectedUserImages: ProfileImagesFragmentFragment[]
}

const adminSlice = createSlice({
  name: 'admin',
  initialState: <AdminInitialStateType>{
    pageSize: 10,
    pageNumber: 1,
    sortBy: null,
    sortDirection: 'desc',
    adminLoading: true,
    selectedUserImages: [],
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
  },
})

export const { setPageSize, setPageNumber, setSelectedUserImages } = adminSlice.actions
export default adminSlice.reducer
