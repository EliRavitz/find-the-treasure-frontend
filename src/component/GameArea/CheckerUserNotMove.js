import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axiosInstance from '../../axios'

import { errorInfoAction } from '../../store/errorInfo-slice'

function CheckerUserNotMove(props) {
  const dispatch = useDispatch()
  const params = useParams()
  const [playerLocaion, setPlayerLocaion] = useState()
  const [stationLocation, setStationLocation] = useState()

  // Checks every 10 seconds what is the user's position (only works when the timer is on)
  useEffect(() => {
    const interval = setInterval(() => {
      axiosInstance
        .get(`/api/v1/players/${params.playerId}`)
        .then(function (response) {
          setPlayerLocaion(response.data.data.data)
        })
        .catch(function (error) {
          dispatch(
            errorInfoAction.update([error.message, error.response.data.message])
          )
        })
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  // Checks the location of the relevant station
  useEffect(() => {
    axiosInstance
      .get(`/api/v1/games/${params.gameId}`)
      .then(function (response) {
        setStationLocation(
          response.data.data.data.stations[props.currentStation - 1]
        )
      })
      .catch(function (error) {
        dispatch(
          errorInfoAction.update([error.message, error.response.data.message])
        )
      })
  }, [])

  // Compares the position of the station with the position of the player
  useEffect(() => {
    if (playerLocaion && stationLocation) {
      if (
        playerLocaion.LatLng[0].toFixed(3) !==
          stationLocation.LatLng[0].toFixed(3) ||
        playerLocaion.LatLng[1].toFixed(3) !==
          stationLocation.LatLng[1].toFixed(3)
      ) {
        props.userLocation(false)
      }
      if (
        playerLocaion.LatLng[0].toFixed(3) ===
          stationLocation.LatLng[0].toFixed(3) &&
        playerLocaion.LatLng[1].toFixed(3) ===
          stationLocation.LatLng[1].toFixed(3)
      ) {
        props.userLocation(true)
      }
    }
  }, [playerLocaion])

  return
}

export default CheckerUserNotMove
