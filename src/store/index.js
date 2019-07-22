import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    email: '',
    last_login: '',
    is_superuser: false
  },
  mutations: {
    updateUserInfo (state, newVal) {
      state.username = newVal.username
      state.email = newVal.email
      state.last_login = newVal.last_login
      state.is_superuser = newVal.is_superuser
    }
  }
})
