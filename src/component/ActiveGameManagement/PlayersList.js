import { useSelector } from 'react-redux'

import DisplayCheckPointInList from './DisplayCheckPointInList'

import classes from './PlayersList.module.css'

function PlayersList() {
  const players = useSelector((state) => state.playersDetails.players)

  return (
    <div className={classes.main}>
      <div className={classes.main_title}>
        <div className={classes.title1}>
          <p>Player</p>
        </div>
        <div className={classes.title2}>
          <p>Progress Status</p>
        </div>
      </div>
      <ul className={classes.ul}>
        {players.map((player) => (
          <li className={classes.li} key={player._id}>
            <div>
              <div className={classes.img}>
                <img
                  className={classes.img}
                  src={`/api/v1/players/photo/${player.photo}`}
                  alt="Player Image"
                />
              </div>
              <p className={classes.p}>{player.userName}</p>
            </div>
            <DisplayCheckPointInList id={player._id} currentPlayer={player} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PlayersList
