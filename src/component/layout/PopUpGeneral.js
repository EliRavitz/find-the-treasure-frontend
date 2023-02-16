import classes from './PopUpGeneral.module.css'

function PopUpMessage(props) {
  return (
    <div>
      <div className={classes.pop_up_message}>
        <div className={classes.pop_up_message_content}>{props.message}</div>
        <div className={classes.pop_up_message_buttons}>
          <button className={classes.button} onClick={props.PopUphHandlerYes}>
            Yes
          </button>
          <button className={classes.button} onClick={props.PopUphHandlerNo}>
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopUpMessage
