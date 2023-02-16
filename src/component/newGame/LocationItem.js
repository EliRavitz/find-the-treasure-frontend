import { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { currentGameActions } from '../../store/currentGame-slice'

import classes from './LocationItem.module.css'

function LocationItem(props) {
  const inputRef1 = useRef()
  const inputRef2 = useRef()
  const inputRef3 = useRef()
  const [clueInput1, setClueInput1] = useState('')
  const [clueInput2, setClueInput2] = useState('')
  const [clueInput3, setClueInput3] = useState('')

  const dispatch = useDispatch()
  const [isInputFirstHint, setIsInputFirstHint] = useState(false)
  const [isInputSecondHint, setIsInputSecondHint] = useState(false)

  // Receives the user's input and sends
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        currentGameActions.addStationGame({
          id: props.id,
          hint1: clueInput1,
          hint2: clueInput2,
          hint3: clueInput3,
        })
      )
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [clueInput1, clueInput2, clueInput3, dispatch, props.id])

  const deleteLocation = () => {
    dispatch(currentGameActions.removeStation(id))
  }

  const { id, address } = props

  // Checks which clue the user has already entered and allows him to enter another clue
  const userNameChecker = () => {
    const input1ToCheck = inputRef1.current.value
    if (input1ToCheck.trim().length > 0) {
      setClueInput1(input1ToCheck)
      setIsInputFirstHint(true)
    }
    if (input1ToCheck.trim().length === 0) {
      setIsInputFirstHint(false)
    }
    const input2ToCheck = inputRef2.current.value
    if (input2ToCheck.trim().length > 0) {
      setClueInput2(input2ToCheck)
      setIsInputSecondHint(true)
    }
    if (input2ToCheck.trim().length === 0) {
      setIsInputSecondHint(false)
    }
    const input3ToCheck = inputRef3.current.value
    if (input3ToCheck.trim().length > 0) {
      setClueInput3(input3ToCheck)
      setIsInputSecondHint(true)
    }
  }

  useEffect(() => {
    userNameChecker()
  }, [])

  return (
    <>
      <li className={classes.main_li}>
        <button className={classes.btn_delete} onClick={deleteLocation}>
          delete
        </button>
        <div className={classes.address}>{address}</div>
        <div className={classes.input}>
          <textarea
            type="text"
            ref={inputRef1}
            placeholder="first clue"
            className={classes.input}
            onChange={userNameChecker}
            defaultValue={props.hint1}
          />

          <textarea
            type="text"
            ref={inputRef2}
            placeholder="second clue"
            className={classes.input}
            onChange={userNameChecker}
            defaultValue={props.hint2}
            style={
              !isInputFirstHint
                ? {
                    pointerEvents: 'none',
                    backgroundColor: 'rgb(194, 193, 193)',
                  }
                : null
            }
          />
          <textarea
            type="text"
            ref={inputRef3}
            placeholder="third clue"
            className={classes.input}
            onChange={userNameChecker}
            defaultValue={props.hint3}
            style={
              !isInputSecondHint || !isInputFirstHint
                ? {
                    pointerEvents: 'none',
                    backgroundColor: 'rgb(194, 193, 193)',
                  }
                : null
            }
          />
        </div>
      </li>
    </>
  )
}

export default LocationItem
