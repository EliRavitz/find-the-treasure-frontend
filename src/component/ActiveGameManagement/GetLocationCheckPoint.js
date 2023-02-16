import { useSelector } from 'react-redux'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

import station_1 from '../../img/station_1.png'
import station_2 from '../../img/station_2.png'
import station_3 from '../../img/station_3.png'
import station_4 from '../../img/station_4.png'
import station_5 from '../../img/station_5.png'
import station_6 from '../../img/station_6.png'
import station_7 from '../../img/station_7.png'
import station_8 from '../../img/station_8.png'
import station_9 from '../../img/station_9.png'
import station_10 from '../../img/station_10.png'

function GetLocationCheckPoint() {
  const map = useMap()
  const items = useSelector((state) => state.currentGame.game)

  const pictures = [
    station_1,
    station_2,
    station_3,
    station_4,
    station_5,
    station_6,
    station_7,
    station_8,
    station_9,
    station_10,
  ]

  let image
  const selectImg = (num) => {
    pictures.forEach((item, i) => {
      if (i === num) {
        image = L.icon({
          iconUrl: item,
          iconAnchor: [25, 50],
          popupAnchor: [0, -45],
        })
      }
    })
    return image
  }

  // Looking for the farthest points to insert all the stations on the map
  if (items.stations) {
    const listLat = items.stations.map((item, i) => {
      return +item.LatLng[0]
    })
    const listLng = items.stations.map((item, i) => {
      return item.LatLng[1]
    })

    const highestLat = Math.max(...listLat) + 0.002
    const highestLng = Math.max(...listLng) + 0.002
    const lowesttLat = Math.min(...listLat) - 0.002
    const lowesttLng = Math.min(...listLng) - 0.002

    items.stations.forEach((item, i) => {
      const count = i + 1
      const bounds = [
        [highestLat, highestLng],
        [lowesttLat, lowesttLng],
      ]

      L.marker(item.LatLng, { icon: selectImg(i) })
        .addTo(map)
        .bindPopup(String(`Check Point No ${count}`))
      if (i === 0) {
        map.fitBounds(bounds)
      }
    })
  }

  return
}

export default GetLocationCheckPoint
