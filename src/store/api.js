import axios from 'axios'

export const BASE_URL = 'https://real-app.ru/'

const API = axios.create({
  baseURL: BASE_URL
})

// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3BpY3ktZHJvcC5jb21cL2FwaVwvYXV0aFwvc3RlYW0iLCJpYXQiOjE1ODQ2OTI1MjUsImV4cCI6MTU4NTA1MjUyNSwibmJmIjoxNTg0NjkyNTI1LCJqdGkiOiJUMmhScUFBdWpUNW9xSjNBIiwic3ViIjozLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Ip2f_FAH0nz9ig7YYwEbft_G9WPynnIrITwhxCR2M8k'
// localStorage.setItem('user-token', token)
// API.defaults.headers.common.Authorization = 'Bearer' + token

if (localStorage.getItem('user-token')) {
  API.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('user-token')
}

export default API
