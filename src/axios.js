import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://lazy-erin-cormorant-sari.cyclic.app'
    : ''
// const baseURL =
//   process.env.NODE_ENV === 'production'
//     ? 'https://find-the-treasure-backend.herokuapp.com'
//     : ''

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL,
})

export default axiosInstance
