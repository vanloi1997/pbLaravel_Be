import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user'

const service = axios.create({
  baseURL: process.env.SERVER_API || 'http://localhost:8000/api/', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000
})

// Request interceptors
service.interceptors.request.use(
  config => {
    // Add X-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers['Authorization'] = 'Bearer ' + UserModule.token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (res: any) => {
    // Some example codes here:
    // code == 20000: valid
    // code == 50008: invalid token
    // code == 50012: already login in other place
    // code == 50014: token expired
    // code == 60204: account or password is incorrect
    // You can change this part for your own usage.
    if (res.status > 300) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      if (res.status === 508 || res.status === 512 || res.status === 514) {
        MessageBox.confirm(
          'You want to logout?，You can stop sign out out or login again!',
          'Continue to logout?',
          {
            confirmButtonText: 'Login again',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          UserModule.ResetToken()
          location.reload() // To prevent bugs from vue-router
        })
      }
      return Promise.reject(new Error('error with code: ' + res.status))
    } else {
      return res.data
    }
  },
  error => {
    Message({
      message: error.response.data.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
