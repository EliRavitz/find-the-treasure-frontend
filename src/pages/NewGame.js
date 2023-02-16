import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { currentGameActions } from '../store/currentGame-slice'
import { fetchPlayerData } from '../store/currentGame-actions'
import { sendGameData } from '../store/currentGame-actions'

import Map from '../component/newGame/Map'
import GameConstructionBoard from '../component/newGame/GameConstructionBoard'
import PopupEnd from '../component/newGame/PopupEnd'
import BlackBackground from '../component/layout/BlackBackground'
import ErrorPopup from '../component/layout/ErrorPopup'

import classes from './NewGame.module.css'

function NewGame(props) {
  const [isClickedEnd, setIsClickedEnd] = useState(false)
  const [thereIsError, setThereIsError] = useState(false)
  const [gameName, setGameName] = useState('')
  const params = useParams()
  const dispatch = useDispatch()

  const currentGame = useSelector((state) => state.currentGame.game)
  const error = useSelector((state) => state.errorInfo.info)

  // Handles errors that come from child components
  let timeoutId = null
  useEffect(() => {
    if (error[0]) {
      setThereIsError(true)
      timeoutId = setTimeout(() => {
        setThereIsError(false)
      }, 7000)
    }
    return () => clearTimeout(timeoutId)
  }, [error])

  const finishEditingHandler = () => {
    setIsClickedEnd(!isClickedEnd)
  }
  const leavingEditingHandler = () => {
    dispatch(sendGameData(currentGame, gameName, params))
  }

  // Clears the page from information when entered not through an existing game
  useEffect(() => {
    if (!params.gameId) {
      dispatch(currentGameActions.replaceGame(''))
    }
  }, [dispatch, params])

  useEffect(() => {
    if (params.gameId) {
      dispatch(fetchPlayerData(params))
    }
  }, [dispatch, params])

  return (
    <>
      {thereIsError && <ErrorPopup title={error[0]} message={error[1]} />}
      {isClickedEnd && (
        <PopupEnd
          gameName={gameName}
          finishEditingHandler={finishEditingHandler}
          isClickedYes={leavingEditingHandler}
        />
      )}
      {isClickedEnd && (
        <BlackBackground finishEditingHandler={finishEditingHandler} />
      )}
      <div className={classes.main}>
        <Map />
        <GameConstructionBoard
          finishEditingHandler={finishEditingHandler}
          gameNameHandler={setGameName}
        />
      </div>
    </>
  )
}

export default NewGame
