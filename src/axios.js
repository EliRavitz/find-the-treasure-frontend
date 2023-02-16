import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://find-the-treasure-backend.herokuapp.com'
    : ''
console.log('baseURL', baseURL)
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL,
})

export default axiosInstance
