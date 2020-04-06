import API from '../api.js'

const state = {
  status: '',
  user: {},
  token: localStorage.getItem('user-token') || '',
  profile: {}
}

const getters = {
  status: state => state.status,
  user: state => state.user,
  token: state => state.token,
  profile: state => state.profile
}

const actions = {
  LOAD_PROFILE ({ commit }) {
    return new Promise((resolve, reject) => {
      API.get('api/profile')
        .then((response) => {
          commit('SET_PROFILE', response.data.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  REGISTER_REQUEST ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('REGISTER_REQUEST')
      API.post('api/auth/register', user)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  AUTH_REQUEST ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST')
      API.post('api/auth/login', user)
        .then((response) => {
          const data = response.data
          const token = data.token

          localStorage.setItem('user-token', token)

          API.defaults.headers.common.Authorization = 'Bearer ' + token
          commit('AUTH_SUCCESS', response)
          resolve(response)
        })
        .catch((error) => {
          commit('AUTH_LOGOUT')
          reject(error)
        })
    })
  },
  AUTH_LOGOUT ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('AUTH_LOGOUT')
    })
  }
}

const mutations = {
  SET_PROFILE (state, payload) {
    state.profile = payload
  },
  AUTH_REQUEST (state) {
    state.status = 'loading'
  },
  REGISTER_REQUEST (state) {
    state.status = 'loading'
  },
  AUTH_SUCCESS (state, payload) {
    state.status = 'success'
    state.user = payload
  },
  AUTH_LOGOUT (state) {
    state.token = ''
    state.status = ''
    state.user = {}
    localStorage.removeItem('user-token')
    delete API.defaults.headers.common.Authorization
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
