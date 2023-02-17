import axiosInstance from '../../axios'

function DeleteUser(props) {
  axiosInstance
    .patch('/api/v1/users/updateMe', {
      active: false,
    })
    .then(function (response) {
      props.isClickedYes
    })
    .catch(function (error) {
      console.log(error)
      //   setError(error)
      //   timeoutId = setTimeout(() => {
      //     setError('')
      //   }, 7000)
    })
  //   return () => clearTimeout(timeoutId)
}

export default DeleteUser
