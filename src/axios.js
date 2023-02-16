import axios from 'axios'

// const baseURL = ''
// const baseURL = 'https://find-the-treasure.onrender.com'
const baseURL = 'https://treasure-hunting.herokuapp.com'
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL,
})

export default axiosInstance
