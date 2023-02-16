import { useSelector } from 'react-redux'
import { useMap } from 'react-leaflet'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
import 'leaflet-control-geocoder/dist/Control.Geocoder.js'
import L from 'leaflet'

function GetPlayerLocation() {
  const selectImg = (photo) => {
    return L.icon({
      iconUrl: `/api/v1/players/photo/${photo}`,
      iconAnchor: [40, 45],
      popupAnchor: [-5, -45],
      iconSize: [55, 55],
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
