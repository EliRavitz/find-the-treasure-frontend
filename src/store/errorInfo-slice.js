import { createSlice } from '@reduxjs/toolkit'

const errorInfoSlice = createSlice({
  name: 'errorInfo',
  initialState: {
    info: [],
  },
  reducers: {
    update(state, action) {
      state.info = action.payload
    },
  },
})

export const errorInfoAction = errorInfoSlice.actions

export default errorInfoSlice
