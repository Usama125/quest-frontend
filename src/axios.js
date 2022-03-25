import axios from 'axios'
// import logOut from './services/utills/Logout'; 

const token = window.localStorage.getItem('auth')

const instance = axios.create({
  baseURL: "https://quest-backend.herokuapp.com/api"
})

// https://quest-backend.herokuapp.com/api
// http://localhost:8081/api

if (token) {
  instance.defaults.headers.common['authorization'] = "Bearer" + " " + token
}

instance.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  if (error && error.response && error.response.status === 401) {
    //   logOut()
    window.location.reload(true)
  }
  return Promise.reject(error)
})

instance.defaults.headers.post['Content-Type'] = 'application/json'

export default instance  