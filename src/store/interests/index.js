import API from '../api.js'

const state = {
  interests: [],
  subsInterests: []
}

const getters = {
  interests: state => state.interests,
  subsInterests: state => state.subsInterests
}

const actions = {
  LOAD_INTERESTS ({ commit }) {
    return new Promise((resolve, reject) => {
      API.get('api/interests')
        .then((response) => {
          commit('SET_INTERESTS', response.data.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  SELECT_MAIN_INTEREST ({ commit }, id) {
    return new Promise((resolve, reject) => {
      API.post(`api/interests/${id}/select`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  LOAD_SUBS_INTERESTS ({ commit }) {
    return new Promise((resolve, reject) => {
      API.get('api/interests/subs/available')
        .then((response) => {
          commit('SET_SUBS_INTERESTS', response.data.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  SELECT_SUBS_INTEREST ({ commit }, sub) {
    return new Promise((resolve, reject) => {
      API.post(`api/interests/subs/${sub.id}/select`, sub.select)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const mutations = {
  SET_INTERESTS (state, payload) {
    state.interests = payload
  },
  SET_SUBS_INTERESTS (state, payload) {
    state.subsInterests = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
