import axios from 'axios'

// const baseURL = ''
// const baseURL = 'https://find-the-treasure.onrender.com'
const baseURL = 'https://find-the-treasure-backend.herokuapp.com/'
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL,
})

export default axiosInstance
