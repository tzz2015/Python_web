// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CommonUtils from './CommonUtils.js'
import RequestUtils from './RequestUtils'
import store from './store'
import vueCookie from 'vue-cookie'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(vueCookie)
Vue.prototype.$comUtils = CommonUtils
Vue.prototype.$vHOST = '/api/'
Vue.prototype.$requestUtils = RequestUtils
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
