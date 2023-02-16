import { useState, useEffect } from 'react'
import { useMapEvents } from 'react-leaflet'

import GetMarkerAddress from './GetMarkerAddress'

function LocationMarkersPressed(props) {
  const [marker, setMarker] = useState([])
  const [isClicked, setIsClicked] = useState([false])

  useEffect(() => {
    setIsClicked(false)
  }, [isClicked])

  useMapEvents({
    click(e) {
      setMarker([e.latlng])
      setIsClicked(true)
    },
  })

  return (
    <>
      {isClicked && marker.length !== 0 && <GetMarkerAddress marker={marker} />}
    </>
  )
}

export default LocationMarkersPressed
