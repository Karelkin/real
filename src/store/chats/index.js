import API from '../api.js'

const state = {
  interests: {},
  createRoom: false,
  roomUsers: []
}

const getters = {
  rooms: state => state.rooms,
  createRoom: state => state.createRoom,
  roomUsers: state => state.roomUsers
}

const actions = {
  LOAD_ROOM_USERS ({ commit }, channel) {
    return new Promise((resolve, reject) => {
      API.get(`/api/rooms/${channel}/users`)
        .then((response) => {
          commit('SET_ROOM_USERS', response.data.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  SEND_MESSAGE ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.post(`/api/rooms/${data.channel}/message`, { message: data.message })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  LOAD_ROOMS ({ commit }) {
    return new Promise((resolve, reject) => {
      API.get('api/rooms')
        .then((response) => {
          commit('SET_ROOMS', response.data.data)
          resolve(response)
        })
        .catch((error) => {
          if (error.response.data.code === 111 || error.response.data.code === 112) {
            commit('SET_CREATE')
          }
          reject(error)
        })
    })
  }
}

const mutations = {
  SET_ROOM_USERS (state, payload) {
    state.roomUsers = payload
  },
  SET_ROOMS (state, payload) {
    state.rooms = payload
  },
  SET_CREATE (state) {
    state.createRoom = true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
