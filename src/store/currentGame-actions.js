import axiosInstance from '../axios'

import { currentGameActions } from './currentGame-slice'

export const fetchPlayerData = (params) => {
  return async (dispatch) => {
    axiosInstance
      .get(`/api/v1/games/${params.gameId}`)
      .then(function (response) {
        dispatch(currentGameActions.replaceGame(response.data.data.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const sendGameData = (currentGame, gameName, params) => {
  return async (dispatch) => {
    if (!params.gameId) {
      axiosInstance
        .post('/api/v1/games', {
          name: gameName,
          stations: currentGame.stations,
          new: true,
        })
        .then(function (response) {
          axiosInstance
            .patch('/api/v1/users/updateMe', {
              games: response.data.data.data._id,
              addingGame: true,
            })
            .catch(function (error) {
              console.log(error)
            })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    if (params.gameId) {
      axiosInstance
        .patch(`/api/v1/games/${params.gameId}`, {
          name: gameName,
          stations: currentGame.stations,
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
