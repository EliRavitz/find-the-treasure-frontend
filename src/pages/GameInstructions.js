import MainNavigation from '../component/layout/MainNavigation'
import MainNavigationMobile from '../component/layout/MainNavigationMobile'

import classes from './GameInstructions.module.css'

function GameExplanation(props) {
  return (
    <>
      {window.innerWidth < 500 ? (
        <MainNavigationMobile
          isClickedLogin={props.isClickedLogin}
          isClickedSignin={props.isClickedSignin}
        />
      ) : (
        <MainNavigation
          isClickedLogin={props.isClickedLogin}
          isClickedSignin={props.isClickedSignin}
        />
      )}
      <div className={classes.main_page}>
        <div className={classes.text}>
          <h2>Welcome to the find the treasure game! </h2>
          <h4>Here is a brief explanation of the game:</h4>
          <p>
            the game manager builds a game with stations where at each station
            there is a hint for the players that if they understand it they will
            know where the location of the next station is. <br />
            Besides the first hint, two more hints can be added that the players
            can see each of them only after they have waited in place for 5
            minutes. So if they didn't understand the first hint yet they can
            continue the game only they have to pay a delay of 5 minutes. (Don't
            worry, we'll make sure they stay at the station while they wait for
            the next clue - and if they move, they won't get it. )
            <br />
            Therefore, as the game manager, it is recommended that you build the
            hints at each station in decreasing difficulty.
          </p>
          <p>
            After you finish building the game you will receive a link that
            leads to the game and you can send it to the players. You'll be able
            to see who logged in and whether they reached the starting point.
            Once everyone is ready click "start game" and they will see the
            first hint.
          </p>
          <h2 className={classes.end}>Happy chasing!</h2>
        </div>
      </div>
    </>
  )
}

export default GameExplanation
