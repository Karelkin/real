import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import interests from './interests'
import chats from './chats'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    interests,
    chats
  },
  strict: debug
})
