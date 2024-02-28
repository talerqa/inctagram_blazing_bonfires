import { createSlice } from '@reduxjs/toolkit'

type GeneralInfo = {
  generalInfo: string
}

const generalInfoSlice = createSlice({
  name: 'generalInfo',
  initialState: <GeneralInfo>{
    generalInfo: '',
  },
  reducers: {
    setGeneralInfo(state, action) {
      state.generalInfo = action.payload
    },
  },
})

export const { setGeneralInfo } = generalInfoSlice.actions
export default generalInfoSlice.reducer
