import { useState, useEffect } from 'react'

import HandlingHintDisplay from './HandlingHintDisplay'
import Timer from './Timer'

import classes from './OnlineInfo.module.css'

function OnlineInfo() {
  const [hint, setHint] = useState('')
  const [checkPointNo, setCheckPointNo] = useState()
  const [hintNumber, setHintNumber] = useState()
  const [firstPoint, setFirstPoint] = useState(false)
  const [reachedNewPoint, setReachedNewPoint] = useState(false)
  const [gotAnotherHint, setGotAnotherHint] = useState(false)
  const [seeButtonAnotherHint, setSeeButtonAnotherHint] = useState(false)
  const [needSecondHint, setNeedSecondHint] = useState(false)
  const [needThirdHint, setNeedThirdHint] = useState(false)
  const [timer, setTimer] = useState(false)
  const [timerIsOver, setTimerIsOver] = useState(false)
  const [hint3NotChange, setHint3NotChange] = useState(false)

  const getInfo = (newHint, newCheckPointNo, hintNumber, hint2, hint3) => {
    // Shows only when it's the first hint at the first station
    let timeoutId = ''
    if (newCheckPointNo === 1 && hintNumber === 1) {
      setHint3NotChange(hint3)
      setFirstPoint(true)

      timeoutId = setTimeout(() => {
        setFirstPoint(false)

        if (hint2.trim().length > 0) setSeeButtonAnotherHint(true)
      }, 10000)
    }

    // Shows only when it's the first hint at each station except the first

    if (newCheckPointNo !== 1 && hintNumber === 1) {
      setHint3NotChange(hint3)
      setReachedNewPoint(true)
      timeoutId = setTimeout(() => {
        setReachedNewPoint(false)
        if (hint2.trim().length > 0) setSeeButtonAnotherHint(true)
      }, 10000)
    }

    // Shows only when it's the second or third hint in each station

    if (hintNumber === 2 || hintNumber === 3) {
      setGotAnotherHint(true)
      timeoutId = setTimeout(() => {
        setGotAnotherHint(false)

        hintNumber === 2 && hint3NotChange.trim().length > 0
          ? setSeeButtonAnotherHint(true)
          : setSeeButtonAnotherHint(false)
      }, 10000)
    }

    setHintNumber(hintNumber)
    setCheckPointNo(newCheckPointNo)
    setHint(newHint)

    return () => clearTimeout(timeoutId)
  }

  const handlerButton = () => {
    setSeeButtonAnotherHint(false)
    setTimer(true)
  }

  // Handles starting and closing a timer and getting a hint
  let timeoutId4 = ''
  useEffect(() => {
    if (hintNumber === 1) {
      if (timerIsOver) {
        setTimer(false)
        setNeedSecondHint(true)
        timeoutId4 = setTimeout(() => {
          setNeedSecondHint(false)
          setTimerIsOver(false)
        }, 100)
      }
      return () => clearTimeout(timeoutId4)
    }
    let timeoutId5 = ''
    if (hintNumber === 2) {
      if (timerIsOver) {
        setTimer(false)
        setNeedThirdHint(true)
        timeoutId5 = setTimeout(() => {
          setNeedThirdHint(false)
          setTimerIsOver(false)
        }, 100)
      }
    }
    return () => clearTimeout(timeoutId5)
  }, [timerIsOver])

  return (
    <>
      <HandlingHintDisplay
        getInfo={getInfo}
        needSecondHint={needSecondHint}
        needThirdHint={needThirdHint}
      />

      <div className={classes.main}>
        <div>
          <div className={classes.inline}>
            <p className={classes.question}>Check point No. </p>
            <p className={classes.answer}>{checkPointNo}</p>
          </div>
        </div>
        <div>
          <div className={classes.inline}>
            <p className={classes.question}>Your Hint: </p>
            <p className={classes.answer}>{hint}</p>
          </div>
          {hintNumber === 0 && (
            <div className={classes.gameStartedMessage}>
              The game has started But you haven't reached the location of the
              first hint yet. If you don't know where it is you should talk to
              the game manager
            </div>
          )}
          <div className={classes.main_sentence}>
            {firstPoint && (
              <div className={classes.sentence}>
                Pay attention to your first hint!
              </div>
            )}
            {reachedNewPoint && (
              <div className={classes.sentence}>
                Congratulations! you have reached a new point! Note the new clue
              </div>
            )}
            {gotAnotherHint && (
              <div className={classes.sentence}>
                Pay attention you got another hint
              </div>
            )}
          </div>
          {seeButtonAnotherHint && (
            <div className={classes.main_btn_wait}>
              <button className={classes.btn_wait} onClick={handlerButton}>
                Click here if you want another hint and wait here for 5 minutes
              </button>
            </div>
          )}
        </div>
        {timer && (
          <Timer
            className={classes.timer}
            currentStation={checkPointNo}
            setTimerIsOver={setTimerIsOver}
          />
        )}
      </div>
    </>
  )
}

export default OnlineInfo
