import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import classes from './DisplayCheckPoint.module.css'

function DisplayCheckPointInList(props) {
  const [playerStatus, setPlayerStatus] = useState(0)
  const game = useSelector((state) => state.currentGame.game)
  const stations = game.stations

  useEffect(() => {
    setPlayerStatus(props.currentPlayer.status)
  }, [props])

  return (
    <div className={classes.check_point}>
      {stations &&
        stations.map((station, i) =>
          i >= playerStatus ? (
            <div key={station.id} className={classes.check_pointr}>
              <div className={classes.rectangle} />
              {i + 1 !== stations.length && <div className={classes.circle} />}

              {i + 1 === stations.length && (
                <div className={classes.last_circle} />
              )}
            </div>
          ) : (
            i < playerStatus && (
              <div key={station.id} className={classes.check_pointr}>
                <div className={classes.rectangle2} />
                {i + 1 !== stations.length && (
                  <div className={classes.circle2} />
                )}

                {i + 1 === stations.length && (
                  <div className={classes.last_circle2} />
                )}
              </div>
            )
          )
        )}
    </div>
  )
}

export default DisplayCheckPointInList
