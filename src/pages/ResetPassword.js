import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../axios'

import ErrorPopup from '../component/layout/ErrorPopup'
import classes from './resetPassword.module.css'

function ResetPassword() {
  const params = useParams()
  const navigate = useNavigate()

  const [enteredPIN, setEnteredPIN] = useState('')
  const [enteredPINConfirm, setEnteredPINConfirm] = useState('')
  const [error, setError] = useState('')

  const PINHandler = (e) => {
    setEnteredPIN(e.target.value)
  }
  const PINHandlerConfirm = (e) => {
    setEnteredPINConfirm(e.target.value)
  }

  const signinHandler = (e) => {
    e.preventDefault()
    let timeoutId = null
    if (enteredPIN !== '' && enteredPINConfirm !== '') {
      axiosInstance
        .patch(`/api/v1/users/resetPassword/${params.token}`, {
          password: enteredPIN,
          passwordConfirm: enteredPINConfirm,
        })
        .then(function (response) {
          console.log(response)
          navigate('/')
        })
        .catch(function (error) {
          console.log(error)
          setError(error)
          timeoutId = setTimeout(() => {
            setError('')
          }, 7000)
        })
      return () => clearTimeout(timeoutId)
    }
  }

  return (
    <>
      {error && (
        <ErrorPopup
          title={error.message}
          message={error.response.data.message}
        />
      )}
      <div className={classes.main}>
        <h3>Please fill in a new password and confirm it:</h3>
        <form onSubmit={signinHandler}>
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
          <input type="submit" value="Save" />
        </form>
      </div>
    </>
  )
}

export default ResetPassword
