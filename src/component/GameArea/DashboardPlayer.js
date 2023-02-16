import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import OnlineInfo from './OnlineInfo'
import BlockingScreen from './BlockingScreen'

import classes from './DashboardPlayer.module.css'

function DashboardPlayer() {
  const [userName, setUserName] = useState('')

  const player = useSelector((state) => state.playerDetails.player)
  const gameMode = useSelector((state) => state.currentGame.game.gameInProgress)

  useEffect(() => {
    setUserName(player.userName)
  }, [player])

  return (
    <div className={classes.main_dashboard}>
      <div className={classes.character}>
        {player.photo && (
          <img
            className={classes.userPhoto}
            src={
              'find-the-treasure-backend.herokuapp.com/api/v1/players/photo/user-eli1-1676553375433.jpeg'
            }
            // src={
            //   process.env.NODE_ENV === 'production'
            //     ? `${process.env.REACT_APP_API_URL_PROD}/api/v1/players/photo/${player.photo}`
            //     : `/api/v1/players/photo/${player.photo}`
            // }
            alt="Player Image"
          />
        )}
        <div>Hello {userName}</div>
      </div>
      <div>
        {!gameMode && <BlockingScreen />}
        {gameMode && <OnlineInfo />}
      </div>
    </div>
  )
}

export default DashboardPlayer
