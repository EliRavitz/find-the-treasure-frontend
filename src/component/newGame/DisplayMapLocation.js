import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

import classes from './DisplayMapLocation.module.css'

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

function DisplayMapLocation() {
  const [listExistingLocation, setListExistingLocation] = useState([])
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

  useEffect(() => {
    const testLatLng = []
    if (items.stations) {
      items.stations.forEach((item) => {
        const isItUpdatedYet = listExistingLocation.includes(item.LatLng)
        if (!isItUpdatedYet) {
          setListExistingLocation((prevValue) => [...prevValue, item.LatLng])
        }
        testLatLng.push(item.LatLng)
      })
      listExistingLocation.forEach((item) => {
        testLatLng.includes(item)
        setListExistingLocation(testLatLng)
      })
    }
  }, [items])

  return listExistingLocation.map((exis, i) => (
    <Marker key={i} position={exis} icon={selectImg(i)}>
      <Popup className={classes.popup}>Check point No. {i + 1}</Popup>
    </Marker>
  ))
}

export default DisplayMapLocation
