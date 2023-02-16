import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { inputLocationSearchAction } from '../../store/inputLocationSearch-slice'
import DispalyListLocation from './DispalyListLocation'

import classes from './GameConstructionBoard.module.css'

function GameConstructionBoard(props) {
  const dispatch = useDispatch()
  const params = useParams()
  const [enteredText, setEnteredText] = useState('')
  const [gameName, setGameName] = useState('')
  const gameNameRef = useRef()

  const items = useSelector((state) => state.currentGame.game)

  const createGameName = () => {
    setGameName(gameNameRef.current.value)
  }

  const finishEditing = () => {
    props.gameNameHandler(gameName || items.name)
    props.finishEditingHandler()
  }
  const inputChangeHandler = (event) => {
    setEnteredText(event.target.value)
  }

  const searchHandler = (event) => {
    event.preventDefault()
    dispatch(inputLocationSearchAction.update({ input: enteredText }))

    setEnteredText('')
  }

  return (
    <>
      <div className={classes.main}>
        <div className={classes.main_1}>
          <input
            className={classes.input_game_name}
            type="text"
            placeholder="Game Name"
            ref={gameNameRef}
            onChange={createGameName}
            defaultValue={params.gameId ? items.name : ''}
          />

          <form className={classes.form} onSubmit={searchHandler}>
            <button>
              <span className="material-symbols-outlined">search</span>
            </button>
            <input
              className={classes.input_search}
              placeholder="Search location"
              type="text"
              value={enteredText}
              onChange={inputChangeHandler}
            />
          </form>
        </div>
        <div className={classes.list}>
          <button className={classes.list_btn} onClick={finishEditing}>
            Finish editing
          </button>
          <DispalyListLocation />
        </div>
      </div>
    </>
  )
}

export default GameConstructionBoard
