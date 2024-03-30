import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AdminInitialStateType = {
  isAdminLogged: boolean
}

const adminAuthSlice = createSlice({
  name: 'admin-auth',
  initialState: <AdminInitialStateType>{
    isAdminLogged: false,
  },
  reducers: {
    signInAdmin(state, action: PayloadAction<boolean>) {
      state.isAdminLogged = action.payload
    },
  },
})

export const { signInAdmin } = adminAuthSlice.actions
export default adminAuthSlice.reducer
