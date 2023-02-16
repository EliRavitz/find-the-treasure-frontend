import { useSelector } from 'react-redux'
import { useMap } from 'react-leaflet'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
import 'leaflet-control-geocoder/dist/Control.Geocoder.js'
import L from 'leaflet'

function GetPlayerLocation() {
  const selectImg = (photo) => {
    return L.icon({
      iconUrl:
        process.env.NODE_ENV === 'production'
          ? `${process.env.REACT_APP_API_URL_PROD}/api/v1/players/photo/${photo}`
          : `/api/v1/players/photo/${photo}`,
      iconAnchor: [40, 45],
      popupAnchor: [-5, -45],
      iconSize: [55, 55],
      crossorigin: 'anonymous',
    })
  }

  const players = useSelector((state) => state.playersDetails.players)
  const map = useMap()

  players.forEach((player) => {
    L.marker(player.LatLng, { icon: selectImg(player.photo) })
      .addTo(map)
      .bindPopup(player.userName)
  })

  return
}

export default GetPlayerLocation
