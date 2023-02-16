import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

import { currentGameActions } from '../../store/currentGame-slice'
import { errorInfoAction } from '../../store/errorInfo-slice'

function GetMarkerAddress(props) {
  const dispatch = useDispatch()

  const GEOCODE_URL =
    'https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat='

  const lat = props.marker[0].lat
  const lng = props.marker[0].lng

  axios
    .get(`${GEOCODE_URL}${lat}&lon=${lng}`)
    .then(function (response) {
      const details = response.data.features[0].properties.geocoding

      let street = ''
      let nameLocation = ''
      let city = ''
      let district = ''

      if (details.street) {
        street = details.street
      }
      if (details.name) {
        nameLocation = details.name
      }
      if (details.city) {
        city = details.city
      }
      if (!details.street && details.district) {
        district = details.district
      }
      const address = `${nameLocation} ${district} ${street}  ${city}  ${details.country}`

      dispatch(
        currentGameActions.addStationGame({
          id: uuidv4(),
          address,
          LatLng: [lat, lng],
        })
      )
    })
    .catch(function (error) {
      dispatch(
        errorInfoAction.update([
          error.message,
          error.response.data.error.message,
        ])
      )
    })

  return
}

export default GetMarkerAddress
