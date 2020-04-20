import axios from 'axios'

export const BASE_URL = 'https://real-app.ru/'

const API = axios.create({
  baseURL: BASE_URL
})

if (localStorage.getItem('user-token')) {
  API.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('user-token')
}

export default API
