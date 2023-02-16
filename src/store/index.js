import { configureStore } from '@reduxjs/toolkit'

import inputLocationSearchSlice from './inputLocationSearch-slice'
import playerDetailsSlice from './playerDetails-slice'
import playersDetailsSlice from './playersDetails-slice'
import currentGameSlice from './currentGame-slice'
import currentUserSlice from './currentUser-slice'
import errorInfoSlice from './errorInfo-slice'

const store = configureStore({
  reducer: {
    inputLocation: inputLocationSearchSlice.reducer,
    playerDetails: playerDetailsSlice.reducer,
    playersDetails: playersDetailsSlice.reducer,
    currentGame: currentGameSlice.reducer,
    currentUser: currentUserSlice.reducer,
    errorInfo: errorInfoSlice.reducer,
  },
})

export default store
