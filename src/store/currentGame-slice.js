import { createSlice } from '@reduxjs/toolkit'

const currentGameSlice = createSlice({
  name: 'currentGame',
  initialState: {
    game: {},
  },
  reducers: {
    replaceGame(state, action) {
      state.game = action.payload
    },

    addStationGame(state, action) {
      const newStation = action.payload

      if (!state.game.stations) {
        state.game = { stations: [] }
        state.game.stations.push({
          id: newStation.id,
          address: newStation.address,
          LatLng: newStation.LatLng,
        })
      }

      const existingStation = state.game.stations.find(
        (station) => station.id === newStation.id
      )

      if (!existingStation) {
        state.game.stations.push({
          id: newStation.id,
          address: newStation.address,
          LatLng: newStation.LatLng,
        })
      } else {
        existingStation.hint1 = newStation.hint1
        existingStation.hint2 = newStation.hint2
        existingStation.hint3 = newStation.hint3
      }
    },
    removeStation(state, action) {
      const id = action.payload
      state.game.stations = state.game.stations.filter(
        (station) => station.id !== id
      )
    },
  },
})

export const currentGameActions = currentGameSlice.actions

export default currentGameSlice
