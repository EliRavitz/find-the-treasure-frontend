import axiosInstance from '../../axios'

function DeleteUser(props) {
  axiosInstance
    .patch('/api/v1/users/updateMe', {
      active: false,
    })
    .then(function (response) {
      props.isClickedYes()
    })
    .catch(function (error) {
      props.deleteError(error)
    })
}

export default DeleteUser
