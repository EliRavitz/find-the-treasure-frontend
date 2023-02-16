import classes from "./BlackBackground.module.css";

function BlackBackground(props) {
  return <div className={classes.backdrop} onClick={props.isClicked} />;
}

export default BlackBackground;
