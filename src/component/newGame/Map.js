import { MapContainer, TileLayer } from 'react-leaflet'

import AddressSearchGeocoder from './AddressSearchGeocoder'
import LocationMarkersPressed from './LocationMarkersPressed'
import UserLocation from './UserLocation'
import DisplayMapLocation from './DisplayMapLocation'

import classes from './Map.module.css'

function Map(props) {
  return (
    <MapContainer
      className={classes.leaflet_container}
      zoom={15}
      scrollWheelZoom={true}
      center={[32.086852199999996, 34.78984587620055]}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <UserLocation />
      <LocationMarkersPressed />
      <DisplayMapLocation />
      <AddressSearchGeocoder />
    </MapContainer>
  )
}

export default Map
