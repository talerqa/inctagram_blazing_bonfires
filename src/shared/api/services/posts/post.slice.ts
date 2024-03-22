import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/shared/providers/store-provider'

const postSlice = createSlice({
  name: 'post',
  initialState: {
    currentPhotoIndex: 0,
    photosCount: 0,
  },
  reducers: {
    setCurrentPhotoIndex(state, action: PayloadAction<number>) {
      state.currentPhotoIndex = action.payload
    },
    setPhotosCount(state, action: PayloadAction<number>) {
      state.photosCount = action.payload
    },
  },
})

export const { setCurrentPhotoIndex, setPhotosCount } = postSlice.actions
export const postReducer = postSlice.reducer

export const selectCurrentPhotoIndex = (state: RootState) => state.post.currentPhotoIndex
export const selectPhotosCount = (state: RootState) => state.post.photosCount
