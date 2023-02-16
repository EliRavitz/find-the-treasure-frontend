import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../axios'

import { playersDetailsActions } from '../../store/playersDetails-slice'
import { errorInfoAction } from '../../store/errorInfo-slice'

function IntervalUpdate() {
  const dispatch = useDispatch()
  const params = useParams()

  let timeoutId = null
  useEffect(() => {
    timeoutId = setInterval(() => {
      axiosInstance
        .get(`/api/v1/players/gamePlayers/${params.gameId}`)
        .then(function (response) {
          dispatch(
            playersDetailsActions.getPlayers({
              players: response.data.data.data,
            })
          )
        })
        .catch(function (error) {
          dispatch(
            errorInfoAction.update([error.message, error.response.data.message])
          )
        })
    }, 60000)
    return () => clearTimeout(timeoutId)
  }, [])
  return
}

export default IntervalUpdate
