import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useMap, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

import { errorInfoAction } from '../../store/errorInfo-slice'
import user_location from '../../img/user_location.png'

function UserLocation() {
  const [position, setPosition] = useState(null)
  const dispatch = useDispatch()
  const map = useMap()

  // Checks if there is permission to receive the location in the browser

  useEffect(() => {
    navigator.geolocation.watchPosition(
      function (position) {},
      function () {
        dispatch(
          errorInfoAction.update([
            'Unable to get your location',
            'In order to enjoy all the features of the game, it is recommended to enable location sharing.',
          ])
        )
      }
    )
  }, [navigator.geolocation])

  const personIcon = L.icon({
    iconUrl: user_location,
    iconSize: [50, 55],
    iconAnchor: [25, 50],
    popupAnchor: [0, -40],
  })

  // Gets location of user
  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    })
  }, [map])

  return position === null ? null : (
    <Marker position={position} icon={personIcon}>
      <Popup>Your location</Popup>
    </Marker>
  )
}

export default UserLocation
