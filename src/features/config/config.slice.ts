import { createSlice } from '@reduxjs/toolkit'

export type ConfigState = { rowsCount: number }

const initialState: ConfigState = { rowsCount: 5 }

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setRowsCount(state, action: { payload: number }) {
      const n = Math.floor(action.payload)
      state.rowsCount = Math.max(1, Math.min(10, Number.isNaN(n) ? 1 : n))
    },
  },
})

export const { setRowsCount } = configSlice.actions
export default configSlice.reducer
