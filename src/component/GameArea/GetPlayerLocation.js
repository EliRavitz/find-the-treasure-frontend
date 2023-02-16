import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMap, Marker, Popup } from 'react-leaflet'

import UpdatePlayerStatus from './UpdatePlayerStatus'
import location3 from '../../img/location3.png'
import { errorInfoAction } from '../../store/errorInfo-slice'

function GetPlayerLocation(props) {
  const [position, setPosition] = useState(null)
  const [curentIcon, setCurentIcon] = useState(location3)
  const dispatch = useDispatch()
  const map = useMap()
  const player = useSelector((state) => state.playerDetails.player)

  // Checks that you can get a location in the browser settings
  useEffect(() => {
    navigator.geolocation.watchPosition(
      function (position) {},
      function () {
        dispatch(
          errorInfoAction.update([
            'Unable to get your location',
            'before we can continue the game a location option must be opened.',
          ])
        )
      }
    )
  }, [navigator.geolocation])

  // Receives the user's photo and if there is none, then inserts a general photo
  let locationLayer = ''
  useEffect(() => {
    if (player.photo) {
      setCurentIcon(
        L.icon({
          iconUrl:
            process.env.NODE_ENV === 'production'
              ? `${process.env.REACT_APP_API_URL_PROD}/api/v1/players/photo/${player.photo}`
              : `/api/v1/players/photo/${player.photo}`,
          iconAnchor: [40, 45],
          popupAnchor: [-5, -45],
          iconSize: [55, 55],
        })
      )
    } else {
      setCurentIcon(
        L.icon({
          iconUrl: location3,
          iconSize: [55, 55],
          iconAnchor: [40, 45],
          popupAnchor: [-5, -45],
        })
      )
    }
  }, [player])

  useEffect(() => {
    if (locationLayer !== '') {
      map.removeLayer(locationLayer)
    }
  }, [position])

  // Updates when the page loads the player's location
  useEffect(() => {
    locationLayer = map.locate().on('locationfound', function (e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    })
  }, [map])

  // Checks every half minute if the player moves from the place and if so updates the map
  let previousPosition = null
  let intervalId = ''
  useEffect(() => {
    intervalId = setInterval(() => {
      locationLayer = map.locate().on('locationfound', function (e) {
        if (
          !previousPosition ||
          previousPosition.lat !== e.latlng.lat ||
          previousPosition.lng !== e.latlng.lng
        ) {
          setPosition(e.latlng)
          previousPosition = e.latlng
          map.flyTo(e.latlng, map.getZoom())
        }
      })
    }, 30000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      {position === null ? null : (
        <Marker position={position} icon={curentIcon}>
          <Popup>Your location</Popup>
        </Marker>
      )}
      {position && <UpdatePlayerStatus latLng={position} />}
    </>
  )
}

export default GetPlayerLocation
