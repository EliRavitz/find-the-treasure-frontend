import { useSelector } from 'react-redux'
import LocationItem from './LocationItem'

import classes from './DispalyListLocation.module.css'

function DispalyListLocation() {
  const item = useSelector((state) => state.currentGame.game)

  return (
    <div className={classes.main}>
      <ul>
        {item.stations &&
          item.stations.map((item) => (
            <LocationItem
              key={item.id}
              id={item.id}
              address={item.address}
              LatLng={item.LatLng}
              hint1={item.hint1}
              hint2={item.hint2}
              hint3={item.hint3}
            />
          ))}
      </ul>
    </div>
  )
}

export default DispalyListLocation
