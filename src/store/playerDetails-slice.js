import { createSlice } from '@reduxjs/toolkit'

const playerDetailsSlice = createSlice({
  name: 'playerDetails',
  initialState: {
    player: [],
  },
  reducers: {
    replacePlayer(state, action) {
      const newPlayer = action.payload
      state.player = newPlayer
    },
  },
})

export const playerDetailsActions = playerDetailsSlice.actions

export default playerDetailsSlice
