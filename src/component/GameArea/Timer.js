import { useState, useEffect } from 'react'

import CheckerUserNotMove from './CheckerUserNotMove'

import clsses from './timer.module.css'

function Timer(props) {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [time, setTime] = useState(300000)
  const [userInPlace, setUserInPlace] = useState(true)

  const getTime = () => {
    setMinutes(Math.floor((time / 1000 / 60) % 60))
    setSeconds(Math.floor((time / 1000) % 60))
    if (time > 0 && userInPlace) {
      setTime((prevState) => prevState - 1000)
    }
    if (time === 0) {
      props.setTimerIsOver(true)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => getTime(time), 1000)

    return () => clearInterval(interval)
  }, [time])

  return (
    <div className={clsses.main}>
      <div className={clsses.main_timer}>
        <span className={clsses.timer1}>
          {minutes < 1 ? '00' : '0' + minutes}:
        </span>
        <span className={clsses.timer2}>
          {seconds < 10 ? '0' + seconds : seconds}
        </span>
        <CheckerUserNotMove
          currentStation={props.currentStation}
          userLocation={setUserInPlace}
        />
      </div>
      {!userInPlace && (
        <p className={clsses.p}>
          If you want the timer to keep moving you must stay at the location of
          the last hint
        </p>
      )}
    </div>
  )
}

export default Timer
