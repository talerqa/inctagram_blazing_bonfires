import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ProfileImagesFragmentFragment, SortDirection } from '@/__generated__/graphql'
import { RootState } from '@/shared/providers/store-provider'
import { SortType } from '@/shared/ui/table/table'

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
    adminLoading: false,
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

export const { setPageSize, setPageNumber, setAdminLoading, setSelectedUserImages } =
  adminSlice.actions
export default adminSlice.reducer

export const selectAdminLoading = (state: RootState) => state.admin.adminLoading
