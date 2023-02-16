import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import classes from './PopUpWhatsapp.module.css'

function PopUpWhatsapp(props) {
  const params = useParams()
  const [phoneNum, setPhoneNum] = useState('')
  const prefix = useRef()
  const num = useRef()

  const sendLink = () => {
    const prefixReady = prefix.current.value
    const numReady = num.current.value
    setPhoneNum(`+${prefixReady}${numReady}`)
  }
  const goBack = () => {
    props.setIsClicked()
  }

  useEffect(() => {
    if (phoneNum) {
      window.location = `https://api.whatsapp.com/send?phone=${phoneNum}&text= Hi, This is the link to the game find the treasure. You are welcome to enter and login: http://localhost:3000/player-login/${params.gameId} `
      props.setIsClicked()
    }
  }, [phoneNum])

  return (
    <div className={classes.main_popup}>
      <div className={classes.popup_message}>
        Here you can enter a phone number to send the link to the game. Enter an
        international prefix please.
      </div>
      <div>
        <span className={classes.span}>+</span>
        <input
          className={classes.popup_input1}
          type="tel"
          maxLength={3}
          ref={prefix}
        />
        <input
          className={classes.popup_input2}
          type="tel"
          maxLength={10}
          ref={num}
        />
      </div>
      <button className={classes.button} onClick={sendLink}>
        send
      </button>
      <button className={classes.button} onClick={goBack}>
        go back
      </button>
    </div>
  )
}

export default PopUpWhatsapp
