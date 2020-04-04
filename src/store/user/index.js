// import API from '../api.js'
//
// const state = {
//   status: '',
//   token: localStorage.getItem('user-token') || ''
// }
//
// const getters = {
//   status: state => state.status
// }
//
// const actions = {
//   AUTH_REQUEST ({ commit, dispatch }) {
//     return new Promise((resolve, reject) => {
//       commit('AUTH_REQUEST')
//       API.get('api/')
//         .then((response) => {
//           const data = response.data
//           const token = data.access_token
//
//           localStorage.setItem('user-token', token)
//
//           API.defaults.headers.common.Authorization = 'Bearer' + token
//           commit('AUTH_SUCCESS', data)
//           resolve(response)
//         })
//         .catch((err) => {
//           commit('AUTH_LOGOUT')
//           reject(err)
//         })
//     })
//   },
//   AUTH_LOGOUT ({ commit, dispatch }) {
//     return new Promise((resolve, reject) => {
//       commit('AUTH_LOGOUT')
//     })
//   }
// }
//
// const mutations = {
//   AUTH_REQUEST (state) {
//     state.status = 'loading'
//   },
//   AUTH_SUCCESS (state, payload) {
//     state.status = 'success'
//     state.token = payload.access_token
//   },
//   AUTH_ERROR (state) {
//     state.status = 'error'
//   },
//   AUTH_LOGOUT (state) {
//     state.token = ''
//     state.status = ''
//     localStorage.removeItem('user-token')
//     delete API.defaults.headers.common.Authorization
//   }
// }
//
// export default {
//   state,
//   getters,
//   actions,
//   mutations
// }
