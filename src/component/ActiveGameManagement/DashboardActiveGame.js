import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axiosInstance from '../../axios'

import PlayersList from './PlayersList'
import PopUpWhatsapp from './PopUpWhatsapp'
import ErrorPopup from '../layout/ErrorPopup'
import PopUpGeneral from '../layout/PopUpGeneral'
import EndGameUpdate from './EndGameUpdate'
import IntervalUpdate from './IntervalUpdate'

import whatsapp from '../../img/whatsapp.png'
import classes from './DashboardActiveGame.module.css'

function DashboardActiveGame() {
  const [numPlayers, setNumPlayers] = useState(0)
  const [isClicked, setIsClicked] = useState('')
  const [isClickedWhatsapp, setIsClickedWhatsapp] = useState(false)
  const [isClickedEndGame, setIsClickedEndGame] = useState(false)
  const [EndGame, setEndGame] = useState(false)
  const [error, setError] = useState('')

  const params = useParams()

  const players = useSelector((state) => state.playersDetails.players)
  const game = useSelector((state) => state.currentGame.game)

  useEffect(() => {
    setNumPlayers(players.length)
    setIsClicked(game.gameInProgress)
  }, [players, game])

  // Checks and updates the status of whether the game is active
  const clickHandler = () => {
    setIsClicked(!isClicked)
  }

  const clickEndGameHandler = () => {
    setIsClickedEndGame(!isClickedEndGame)
  }

  const handlerYesEndGame = () => {
    setEndGame(!EndGame)
    // window.location.reload()
  }

  useEffect(() => {
    let timeoutId = null
    if (isClicked === true || isClicked === false) {
      axiosInstance
        .patch(`/api/v1/games/${params.gameId}`, {
          gameInProgress: isClicked,
        })
        .catch(function (error) {
          setError(error)
          timeoutId = setTimeout(() => {
            setError('')
          }, 7000)
        })
    }
    return () => clearTimeout(timeoutId)
  }, [isClicked])

  const sendWhatsappHandler = () => {
    setIsClickedWhatsapp(!isClickedWhatsapp)
  }
  return (
    <>
      <IntervalUpdate />
      {error && (
        <ErrorPopup
          title={error.message}
          message={error.response.data.message}
        />
      )}
      <div className={classes.main}>
        {isClickedWhatsapp && (
          <PopUpWhatsapp setIsClicked={setIsClickedWhatsapp} />
        )}
        {isClickedEndGame && (
          <PopUpGeneral
            message={
              'All connected players and their information will be deleted. Are you sure you want to finish the game?'
            }
            PopUphHandlerYes={handlerYesEndGame}
            PopUphHandlerNo={clickEndGameHandler}
          />
        )}
        {EndGame && (
          <EndGameUpdate done={handlerYesEndGame} done2={clickEndGameHandler} />
        )}
        <div className={classes.linkArea}>
          <div className={classes.linkSentence}>
            Link to the game. Please send it to the players:
          </div>
          <div className={classes.link}>
            <a className={classes.btn_whatsapp_link}>
              <img
                className={classes.img_send}
                src={whatsapp}
                alt="whatsapp"
                onClick={sendWhatsappHandler}
              />
            </a>

            <a
              onClick={() =>
                navigator.clipboard.writeText(
                  process.env.NODE_ENV === 'production'
                    ? `${process.env.REACT_APP_DOMAIN}/player-login/${params.gameId}`
                    : `http://localhost:3000/player-login/${params.gameId}`
                )
              }
              className={classes.btn_send_link}
            >
              <span className="material-symbols-outlined ">content_copy</span>
            </a>

            <div className={classes.link_link}>
              {process.env.NODE_ENV === 'production'
                ? `${process.env.REACT_APP_DOMAIN}/player-login/${params.gameId}`
                : `http://localhost:3000/player-login/${params.gameId}`}
            </div>
          </div>

          <div className={classes.btn_area}>
            {numPlayers === 0 && (
              <p className={classes.message}>No player has connected yet</p>
            )}

            {numPlayers > 0 && !isClicked && (
              <button className={classes.btn} onClick={clickHandler}>
                Start Game
              </button>
            )}
            {isClicked && (
              <div>
                <button className={classes.btn} onClick={clickEndGameHandler}>
                  End Game
                </button>
                <p className={classes.message2}>the game has started!</p>
              </div>
            )}
          </div>
        </div>

        <PlayersList />
      </div>
    </>
  )
}

export default DashboardActiveGame
