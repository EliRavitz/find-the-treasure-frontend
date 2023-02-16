import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../axios'

import { errorInfoAction } from '../../store/errorInfo-slice'

function EndGameUpdate(props) {
  const params = useParams()
  const dispatch = useDispatch()

  // At the end of a game, deletes all players and updates that the game is inactive
  useEffect(() => {
    function gameUpdate() {
      return axiosInstance.patch(`/api/v1/games/${params.gameId}`, {
        gameInProgress: false,
      })
    }
    function playersUpdate() {
      return axiosInstance.delete(
        `/api/v1/players/gamePlayers/${params.gameId}`
      )
    }

    Promise.all([gameUpdate(), playersUpdate()])
      .then(function (results) {
        props.done()
        props.done2()
      })
      .catch(function (error) {
        dispatch(
          errorInfoAction.update([error.message, error.response.data.message])
        )
      })
  }, [])

  return
}

export default EndGameUpdate
