import Vue from 'vue'
import Vuex from 'vuex'
import ConstMange from '../ConstMange'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: 0,
    username: '',
    email: '',
    last_login: '',
    is_superuser: false,
    user_type: -1,
    type_name: ''
  },
  mutations: {
    updateUserInfo (state, newVal) {
      state.id = newVal.id
      state.username = newVal.username
      state.email = newVal.email
      state.last_login = newVal.last_login
      state.is_superuser = newVal.is_superuser
      state.user_type = newVal.user_type
      if (state.user_type !== 2) {
        state.type_name = ConstMange.getStateName(state.user_type, ConstMange.user_type_list)
      } else {
        state.type_name = ''
      }
    }
  }
})
