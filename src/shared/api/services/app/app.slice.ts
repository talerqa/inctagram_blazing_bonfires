import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/shared/providers/store-provider'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isMobile: false,
  },
  reducers: {
    setIsMobile(state, action: PayloadAction<boolean>) {
      state.isMobile = action.payload
    },
  },
})

export const { setIsMobile } = appSlice.actions
export const appReducer = appSlice.reducer

export const selectIsMobile = (state: RootState) => state.app.isMobile
