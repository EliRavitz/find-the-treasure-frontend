import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import axiosInstance from '../../axios'

function UpdatePlayerStatus(props) {
  const dispatch = useDispatch()
  const player = useSelector((state) => state.playerDetails.player)
  const locations = useSelector((state) => state.currentGame.game)

  //Updates the players location
  useEffect(() => {
    if (player._id) {
      axiosInstance
        .patch(`/api/v1/players/${player._id}`, {
          LatLng: [props.latLng.lat, props.latLng.lng],
        })
        .catch(function (error) {
          dispatch(
            errorInfoAction.update([error.message, error.response.data.message])
          )
        })
    }
  }, [props.latLng, player])

  // Update player status when changed
  const currentStatus = player.status

  if (locations.stations && player) {
    locations.stations.forEach((location, i) => {
      if (currentStatus === i) {
        const [nextLat, nextLng] = location.LatLng
        const newStatus = i + 1
        if (
          nextLat.toFixed(3) === props.latLng.lat.toFixed(3) &&
          nextLng.toFixed(3) === props.latLng.lng.toFixed(3)
        ) {
          axiosInstance
            .patch(`/api/v1/players/${player._id}`, {
              status: newStatus,
            })
            .catch(function (error) {
              dispatch(
                errorInfoAction.update([
                  error.message,
                  error.response.data.message,
                ])
              )
            })
        }
      }
    })
  }
  return
}

export default UpdatePlayerStatus
