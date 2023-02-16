import { MapContainer, TileLayer } from 'react-leaflet'

import GetLocationCheckPoint from './GetLocationCheckPoint'
import GetPlayerLocation from './GetPlayerLocation'

import classes from './MapActiveGame.module.css'

function MapActiveGame() {
  return (
    <MapContainer
      className={classes.leaflet_container}
      center={[32.086852199999996, 34.78984587620055]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GetLocationCheckPoint />
      <GetPlayerLocation />
    </MapContainer>
  )
}

export default MapActiveGame
