import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axiosInstance from '../axios'

import { playerDetailsActions } from '../store/playerDetails-slice'
import { currentGameActions } from '../store/currentGame-slice'

import MapPlayer from '../component/GameArea/MapPlayer'
import DashboardPlayer from '../component/GameArea/DashboardPlayer'
import ErrorPopup from '../component/layout/ErrorPopup'

import classes from './GamePage.module.css'

function GamePage() {
  const params = useParams()
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [thereIsError, setThereIsError] = useState(false)
  const errorImport = useSelector((state) => state.errorInfo.info)

  // Handles errors that come from child components
  let timeoutId = null
  useEffect(() => {
    if (errorImport[0]) {
      setThereIsError(true)

      timeoutId = setTimeout(() => {
        setThereIsError(false)
      }, 7000)
    }
    return () => clearTimeout(timeoutId)
  }, [errorImport])

  // Imports player information and sends to redux
  useEffect(() => {
    let timeoutId = null
    axiosInstance
      .get(`/api/v1/players/${params.playerId}`)
      .then(function (response) {
        dispatch(playerDetailsActions.replacePlayer(response.data.data.data))
      })
      .catch(function (error) {
        setError(error)
        timeoutId = setTimeout(() => {
          setError('')
        }, 7000)
      })
    return () => clearTimeout(timeoutId)
  }, [])

  // Imports game information and sends to redux
  useEffect(() => {
    let timeoutId = null
    axiosInstance
      .get(`/api/v1/games/${params.gameId}`)
      .then(function (response) {
        dispatch(currentGameActions.replaceGame(response.data.data.data))
      })
      .catch(function (error) {
        setError(error)
        timeoutId = setTimeout(() => {
          setError('')
        }, 7000)
      })
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <>
      {error && (
        <ErrorPopup
          title={error.message}
          message={error.response.data.message}
        />
      )}
      {thereIsError && (
        <ErrorPopup title={errorImport[0]} message={errorImport[1]} />
      )}
      <div className={classes.main}>
        <MapPlayer />
        <DashboardPlayer />
      </div>
    </>
  )
}

export default GamePage
