import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axiosInstance from '../axios'

import { errorInfoAction } from '../store/errorInfo-slice'

import classes from './SigninPage.module.css'

function LoginPage(props) {
  const [enteredName, setEnteredName] = useState('')
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPIN, setEnteredPIN] = useState('')
  const [enteredPINConfirm, setEnteredPINConfirm] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signinHandler = (e) => {
    e.preventDefault()

    axiosInstance
      .post('/api/v1/users/signup', {
        name: enteredName,
        email: enteredEmail,
        password: enteredPIN,
        passwordConfirm: enteredPINConfirm,
      })
      .then(function (response) {
        console.log(response)
        props.isClicked()
        navigate('/admin-dashboard')
      })
      .catch(function (error) {
        console.log(error)
        dispatch(
          errorInfoAction.update([error.message, error.response.data.message])
        )
      })
  }

  const NameHandler = (e) => {
    setEnteredName(e.target.value)
  }
  const emailHandler = (e) => {
    setEnteredEmail(e.target.value)
  }
  const PINHandler = (e) => {
    setEnteredPIN(e.target.value)
  }
  const PINHandlerConfirm = (e) => {
    setEnteredPINConfirm(e.target.value)
  }

  return (
    <div className={classes.main}>
      <h2>Sign Up</h2>
      <form onSubmit={signinHandler}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={enteredName}
          onChange={NameHandler}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={enteredEmail}
          onChange={emailHandler}
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
        <label htmlFor="password">Confirm Password:</label>
        <input
          type="password"
          id=" passwordConfirm"
          name="passwordConfirm"
          value={enteredPINConfirm}
          onChange={PINHandlerConfirm}
        />
        <br />
        <input type="submit" value="Sign Up" />
        <input type="button" value="Cancel" onClick={props.isClicked} />
        <br />
      </form>
    </div>
  )
}

export default LoginPage
