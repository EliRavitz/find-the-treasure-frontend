import classes from './errorPopup.module.css'

function errorPopup(props) {
  return (
    <div className={props.isGood ? classes.mainGood : classes.mainNotGood}>
      <h2 className={classes.h2}>{props.title}</h2>
      <p className={classes.p}>{props.message} </p>
    </div>
  )
}

export default errorPopup
