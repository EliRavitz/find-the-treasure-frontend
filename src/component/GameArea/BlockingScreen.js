import classes from './BlockingScreen.module.css'

function BlockingScreen() {
  return (
    <div className={classes.main}>
      <h3>
        Welcome to the <strong>find the treasure game!</strong>
      </h3>
      <p>
        The game manager has not started the game yet. As soon as the game
        starts you can see the first hint here.
      </p>
      <p></p>
    </div>
  )
}

export default BlockingScreen
