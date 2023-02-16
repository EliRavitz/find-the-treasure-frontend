import { useState } from 'react'
import { Link } from 'react-router-dom'

import axiosInstance from '../axios'

import PopUpGeneral from './layout/PopUpGeneral'
import ErrorPopup from '../component/layout/ErrorPopup'

import classes from './GameListItem.module.css'

function GameListItem(props) {
  const [openPopUp, setOpenPopUp] = useState(false)
  const [error, setError] = useState('')

  const deleteGameHandler = () => {
    setOpenPopUp(!openPopUp)
  }

  const PopUphHandlerYes = () => {
    setOpenPopUp(!openPopUp)
    let timeoutId = null

    function gameUpdate() {
      return axiosInstance.delete(`/api/v1/games/${props._id}`)
    }

    function userUpdate() {
      return axiosInstance.patch('/api/v1/users/updateMe', {
        games: props._id,
        deletingGame: true,
      })
    }

    function playersUpdate() {
      return axiosInstance.delete(`/api/v1/players/gamePlayers/${props._id}`)
    }

    Promise.all([gameUpdate(), playersUpdate(), userUpdate()])
      .then(function (results) {
        props.gameDeleted(props._id)
      })
      .catch(function (error) {
        setError(error)
        timeoutId = setTimeout(() => {
          setError('')
        }, 7000)
      })
    return () => clearTimeout(timeoutId)
  }

  const PopUphHandlerNo = () => {
    setOpenPopUp(!openPopUp)
  }

  return (
    <>
      {error && (
        <ErrorPopup
          title={error.message}
          message={error.response.data.message}
        />
      )}
      <div className={classes.main}>
        <li className={classes.li}>
          <div className={classes.info}>
            <span className={classes.name}> {props.name}</span>
            <span className={classes.station}> {props.station} Stations</span>
          </div>
          <div className={classes.links}>
            <Link to={`/active-admin-dashboard/game/${props._id}`}>
              Start Game
            </Link>
            <Link to={`/new-game/game/${props._id}`}>Game Update</Link>
            <Link onClick={deleteGameHandler}>Delete Game</Link>
          </div>
        </li>
      </div>
      {openPopUp && (
        <PopUpGeneral
          message="Are you sure you want to delete this game?"
          PopUphHandlerYes={PopUphHandlerYes}
          PopUphHandlerNo={PopUphHandlerNo}
        />
      )}
    </>
  )
}

export default GameListItem
