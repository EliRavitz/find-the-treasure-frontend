import { Link } from 'react-router-dom'

import classes from './PopupEnd.module.css'

function PopupEnd(props) {
  return (
    <div className={classes.main}>
      {props.gameName && (
        <p>Are you sure you want to exit the game editing area?</p>
      )}
      <div className={classes.main_button}>
        {props.gameName && (
          <Link to={'/admin-dashboard'} onClick={props.isClickedYes}>
            <button>ok</button>
          </Link>
        )}

        {props.gameName && (
          <button onClick={props.finishEditingHandler}>No. take me back</button>
        )}
        {!props.gameName && (
          <button onClick={props.finishEditingHandler}>
            Please add a name to the game before saving
          </button>
        )}
      </div>
    </div>
  )
}

export default PopupEnd
