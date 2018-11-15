import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    email: ''
  },
  mutations: {
    updateUserInfo (state, newVal) {
      state.username = newVal.username
      state.email = newVal.email
      console.log(newVal.username)
      console.log(newVal.email)
      console.log(state.username)
      console.log(state.email)
    }
  }
})
