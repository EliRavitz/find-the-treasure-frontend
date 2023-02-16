import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axiosInstance from '../axios'

import { currentUserActions } from '../store/currentUser-slice'
import { errorInfoAction } from '../store/errorInfo-slice'

import classes from './loginPage.module.css'

function LoginPage(props) {
  const dispatch = useDispatch()
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPIN, setEnteredPIN] = useState('')
  const [enteredEmailForgotPassword, setEnteredEmailForgotPassword] =
    useState('')
  const [isclickedForgotPassword, setisclickedForgotPassword] = useState(false)

  const navigate = useNavigate()

  const loginHandler = (e) => {
    e.preventDefault()
    axiosInstance
      .post('/api/v1/users/login', {
        email: enteredEmail,
        password: enteredPIN,
      })
      .then(function (response) {
        props.isClicked()
        dispatch(currentUserActions.replaceUser(response.data.data.user))
        navigate('/admin-dashboard')
      })
      .catch(function (error) {
        dispatch(
          errorInfoAction.update([error.message, error.response.data.message])
        )
      })

    setEnteredEmail('')
    setEnteredPIN('')
  }

  const userNameHandler = (e) => {
    setEnteredEmail(e.target.value)
  }
  const PINHandler = (e) => {
    setEnteredPIN(e.target.value)
  }
  const forgotPasswordHandler = (e) => {
    setEnteredEmailForgotPassword(e.target.value)
  }

  const forgotPassword = () => {
    setisclickedForgotPassword(!isclickedForgotPassword)
  }
  const sendEmail = () => {
    axiosInstance
      .post('/api/v1/users/forgotPassword', {
        email: enteredEmailForgotPassword,
      })
      .catch(function (error) {
        dispatch(
          errorInfoAction.update([error.message, error.response.data.message])
        )
      })
  }

  return (
    <div className={classes.main}>
      {!isclickedForgotPassword && <h2>Log In</h2>}
      {!isclickedForgotPassword && (
        <form onSubmit={loginHandler}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={enteredEmail}
            onChange={userNameHandler}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={enteredPIN}
            onChange={PINHandler}
          />
          <br />
          <input type="submit" value="Log In" />
          <input type="button" value="Cancel" onClick={props.isClicked} />
          <br />
          <a href="#" onClick={forgotPassword}>
            Forgot Password?
          </a>
        </form>
      )}

      {isclickedForgotPassword && (
        <label className={classes.email_forgot_password} htmlFor="email">
          Email:
        </label>
      )}
      {isclickedForgotPassword && (
        <input
          type="text"
          id="emailForgotPassword"
          name="emailForgotPassword"
          value={enteredEmailForgotPassword}
          onChange={forgotPasswordHandler}
        />
      )}
      {isclickedForgotPassword && (
        <input onClick={sendEmail} type="button" value="send" />
      )}
      {isclickedForgotPassword && (
        <input type="button" value="Cancel" onClick={forgotPassword} />
      )}
      <br />
    </div>
  )
}

export default LoginPage
