import { createSlice } from '@reduxjs/toolkit'

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    user: {},
  },
  reducers: {
    replaceUser(state, action) {
      state.user = action.payload
    },
  },
})

export const currentUserActions = currentUserSlice.actions

export default currentUserSlice
