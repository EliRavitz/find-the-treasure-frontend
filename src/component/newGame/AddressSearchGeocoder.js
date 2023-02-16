import { useSelector } from 'react-redux'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

export default function AddressSearchGeocoder(props) {
  const map = useMap()
  const address = useSelector((state) => state.inputLocation.input.input)

  const geocoder = L.Control.Geocoder.nominatim()

  if (address) {
    let timeoutId = null
    geocoder.geocode(address, (resultArray) => {
      if (resultArray.length > 0) {
        const result = resultArray[0]
        const latlng = result.center

        const tempLayer = L.circle(latlng, { radius: 100 }).addTo(map)
        map.fitBounds(result.bbox)

        timeoutId = setTimeout(() => {
          map.removeLayer(tempLayer)
        }, 5000)
      }
      return () => clearTimeout(timeoutId)
    })
  }
}
