import { createSlice } from '@reduxjs/toolkit'

const playersDetailsSlice = createSlice({
  name: 'playersDetails',
  initialState: {
    players: [],
  },
  reducers: {
    getPlayers(state, action) {
      state.players = action.payload.players
    },
  },
})

export const playersDetailsActions = playersDetailsSlice.actions

export default playersDetailsSlice
