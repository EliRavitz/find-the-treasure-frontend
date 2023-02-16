import { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

import GetPlayerLocation from './GetPlayerLocation'

import classes from './MapPlayer.module.css'

function MapPlayer() {
  const [latLng, setLatLng] = useState([32.086852199999996, 34.78984587620055])

  return (
    <MapContainer
      className={classes.leaflet_container}
      zoom={15}
      scrollWheelZoom={true}
      center={latLng}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GetPlayerLocation setLatLng={setLatLng} />
    </MapContainer>
  )
}

export default MapPlayer
