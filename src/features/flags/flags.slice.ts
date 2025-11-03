import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type FlagsState = {
  disableConfigPage: boolean
  disableConfigSlider: boolean
}

const initialState: FlagsState = {
  disableConfigPage: false,
  disableConfigSlider: false,
}

export const flagsSlice = createSlice({
  name: 'flags',
  initialState,
  reducers: {
    setDisableConfigPage(state, action: PayloadAction<boolean>) {
      state.disableConfigPage = action.payload
    },
    setDisableConfigSlider(state, action: PayloadAction<boolean>) {
      state.disableConfigSlider = action.payload
    },
  },
})

export const { setDisableConfigPage, setDisableConfigSlider } = flagsSlice.actions
export default flagsSlice.reducer
