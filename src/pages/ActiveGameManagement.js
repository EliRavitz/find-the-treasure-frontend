import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axiosInstance from '../axios'

import { playersDetailsActions } from '../store/playersDetails-slice'
import { currentGameActions } from '../store/currentGame-slice'

import MapActiveGame from '../component/ActiveGameManagement/MapActiveGame'
import DashboardActiveGame from '../component/ActiveGameManagement/DashboardActiveGame'
import ErrorPopup from '../component/layout/ErrorPopup'

import classes from './ActiveGameManagement.module.css'

function ActiveGameManagement() {
  const params = useParams()
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [thereIsErrorImport, setThereIsErrorImport] = useState(false)
  const errorImport = useSelector((state) => state.errorInfo.info)

  // Handles errors that come from child components
  let timeoutId3 = null
  useEffect(() => {
    if (errorImport[0]) {
      setThereIsErrorImport(true)
      timeoutId3 = setTimeout(() => {
        setThereIsErrorImport(false)
      }, 7000)
    }
    return () => clearTimeout(timeoutId3)
  }, [errorImport])

  // Get information of the connected players
  let timeoutId = null
  let timeoutId2 = null
  useEffect(() => {
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
        setError(error)
        timeoutId = setTimeout(() => {
          setError('')
        }, 7000)
      })

    // Get information about the game and sends in redux
    axiosInstance
      .get(`/api/v1/games/${params.gameId}`)
      .then(function (response) {
        dispatch(currentGameActions.replaceGame(response.data.data.data))
      })
      .catch(function (error) {
        setError(error)
        timeoutId2 = setTimeout(() => {
          setError('')
        }, 7000)
      })

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(timeoutId2)
    }
  }, [])

  return (
    <>
      {error && (
        <ErrorPopup
          title={error.message}
          message={error.response.data.message}
        />
      )}
      {thereIsErrorImport && (
        <ErrorPopup title={errorImport[0]} message={errorImport[1]} />
      )}
      <div className={classes.main}>
        <MapActiveGame />
        <DashboardActiveGame />
      </div>
    </>
  )
}

export default ActiveGameManagement
