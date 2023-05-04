import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import MainNavigation from './layout/MainNavigation'
import MainNavigationMobile from './layout/MainNavigationMobile'
import ErrorPopup from './layout/ErrorPopup'

import classes from './homePage.module.css'

function HomePage(props) {
  const [thereIsError, setThereIsError] = useState(false)
  const error = useSelector((state) => state.errorInfo.info)

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

  return (
    <>
      {thereIsError && <ErrorPopup title={error[0]} message={error[1]} />}
      <div className={classes.main_page}>
        <div className={classes.overlay}>
          {/* <div className={`${classes.pin} ${classes.pin1}`} />
          <div className={`${classes.pin} ${classes.pin2}`} />
          <div className={`${classes.pin} ${classes.pin3}`} />
          <div className={`${classes.pin} ${classes.pin4}`} />
          <div className={`${classes.pin} ${classes.pin5}`} />
          <div className={`${classes.pin} ${classes.pin6}`} />
          <div className={`${classes.pin} ${classes.pin7}`} /> */}

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
          <div className={classes.middle}>
            <h2>Welcome to the find the treasure game!!!</h2>
            <div>
              <p>
                <strong>If this is your </strong>first time here, we recommend
                that you read the game instructions after Sign in. If you have
                already played here then welcome back and let's play!
              </p>
              <div className={classes.button}>
                <button onClick={props.isClickedLogin}>Log in</button>
                <button onClick={props.isClickedSignin}>Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
