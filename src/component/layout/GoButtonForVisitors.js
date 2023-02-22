import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axiosInstance from '../../axios'

import { currentUserActions } from '../../store/currentUser-slice'
import { errorInfoAction } from '../../store/errorInfo-slice'

function GoButtonForVisitors() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    axiosInstance
      .post('/api/v1/users/login', {
        email: 'visitors@Visitors.com',
        password: '12345678',
      })
      .then(function (response) {
        dispatch(currentUserActions.replaceUser(response.data.data.user))
        navigate('/admin-dashboard')
      })
      .catch(function (error) {
        console.log(error)
        dispatch(
          errorInfoAction.update([error.message, error.response.data.message])
        )
      })
  }, [])
  return null
}

export default GoButtonForVisitors
