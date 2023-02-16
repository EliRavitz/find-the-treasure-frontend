import { useState, useReducer } from 'react'
import axiosInstance from '../../axios'

import UserNavigation from '../layout/UserNavigation'
import UserNavigationMobile from '../layout/UserNavigationMobile'
import ErrorPopup from '../../component/layout/ErrorPopup'

import classes from './settings.module.css'

function Settings() {
  const [ClickedChangePassword, setClickedChangePassword] = useState(false)
  const [message1, setMessage1] = useState('')
  const [message2, setMessage2] = useState('')
  const [isGood, setIsGood] = useState(false)

  const formReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_NAME':
        return { ...state, enteredName: action.payload, nameChanged: true }
      case 'CHANGE_EMAIL':
        return { ...state, enteredEmail: action.payload, emailChanged: true }
      case 'CHANGE_PIN':
        return { ...state, enteredPIN: action.payload, PINChanged: true }
      case 'CHANGE_NEW_PIN':
        return { ...state, enteredNewPIN: action.payload, NewPINChanged: true }
      case 'CHANGE_PIN_CONFIRM':
        return {
          ...state,
          enteredPINConfirm: action.payload,
          PINConfirmChanged: true,
        }
      default:
        return state
    }
  }

  const [formState, formDispatch] = useReducer(formReducer, {
    enteredName: '',
    nameChanged: false,
    enteredEmail: '',
    emailChanged: false,
    enteredPIN: '',
    PINChanged: false,
    enteredNewPIN: '',
    NewPINChanged: false,
    enteredPINConfirm: '',
    PINConfirmChanged: false,
  })

  const nameHandler = (e) => {
    formDispatch({ type: 'CHANGE_NAME', payload: e.target.value })
  }
  const emailHandler = (e) => {
    formDispatch({ type: 'CHANGE_EMAIL', payload: e.target.value })
  }
  const PINHandler = (e) => {
    formDispatch({ type: 'CHANGE_PIN', payload: e.target.value })
  }
  const PINNewHandler = (e) => {
    formDispatch({ type: 'CHANGE_NEW_PIN', payload: e.target.value })
  }
  const PINConfirmHandler = (e) => {
    formDispatch({ type: 'CHANGE_PIN_CONFIRM', payload: e.target.value })
  }

  const isClickedSave = (e) => {
    e.preventDefault()
    let timeoutId = null

    function nameUpdate() {
      if (formState.nameChanged) {
        return axiosInstance.patch('/api/v1/users/updateMe', {
          name: formState.enteredName,
        })
      }
    }
    function emailUpdate() {
      if (formState.emailChanged) {
        return axiosInstance.patch('/api/v1/users/updateMe', {
          email: formState.enteredEmail,
        })
      }
    }
    function passwordUpdate() {
      if (
        formState.PINChanged &&
        formState.NewPINChanged &&
        formState.PINConfirmChanged
      ) {
        return axiosInstance.patch('/api/v1/users/updateMyPassword', {
          passwordCurrent: formState.enteredPIN,
          password: formState.enteredNewPIN,
          passwordConfirm: formState.enteredPINConfirm,
        })
      }
    }
    Promise.all([nameUpdate(), emailUpdate(), passwordUpdate()])
      .then(function (results) {
        setMessage1('success')
        setMessage2('The update was successful!')
        setIsGood(true)
        timeoutId = setTimeout(() => {
          setMessage1('')
        }, 7000)
      })
      .catch(function (error) {
        setMessage1(error.message)
        setMessage2(error.response.data.message)
        setIsGood(false)

        timeoutId = setTimeout(() => {
          setMessage1('')
        }, 7000)
      })
    return () => clearTimeout(timeoutId)
  }

  const isClickedChangePassword = () => {
    setClickedChangePassword(!ClickedChangePassword)
  }

  return (
    <>
      {message1 && (
        <ErrorPopup title={message1} message={message2} isGood={isGood} />
      )}
      {window.innerWidth < 500 ? <UserNavigationMobile /> : <UserNavigation />}
      <div className={classes.main}>
        <form onSubmit={isClickedSave}>
          <label htmlFor="name">Change Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.enteredName}
            onChange={nameHandler}
          />
          <label htmlFor="email">Change Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formState.enteredEmail}
            onChange={emailHandler}
          />
          <br />
          {!ClickedChangePassword && (
            <input
              type="button"
              value="Change Password"
              onClick={isClickedChangePassword}
            />
          )}
          {!ClickedChangePassword && <br />}
          {ClickedChangePassword && <label htmlFor="password">password:</label>}
          {ClickedChangePassword && (
            <input
              type="password"
              id="password"
              name="password"
              value={formState.enteredPIN}
              onChange={PINHandler}
            />
          )}
          {ClickedChangePassword && <br />}
          {ClickedChangePassword && (
            <label htmlFor="password">newPassword:</label>
          )}
          {ClickedChangePassword && (
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formState.enteredNewPIN}
              onChange={PINNewHandler}
            />
          )}
          {ClickedChangePassword && <br />}
          {ClickedChangePassword && (
            <label htmlFor="password">passwordConfirm:</label>
          )}
          {ClickedChangePassword && (
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formState.enteredPINConfirm}
              onChange={PINConfirmHandler}
            />
          )}
          {ClickedChangePassword && <br />}
          <input type="button" value="Save" onClick={isClickedSave} />
        </form>
        <input type="button" value="Delete User" />
        <br />
      </div>
    </>
  )
}

export default Settings
