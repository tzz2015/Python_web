// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CommonUtils from './util/CommonUtils.js'
import ConstMange from './ConstMange.js'
import RequestUtils from './RequestUtils'
import store from './store'
import vueCookie from 'vue-cookie'
import Clipboard from 'v-clipboard'

Vue.use(Clipboard)
Vue.config.productionTip = false
Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.use(vueCookie)
Vue.prototype.$comUtils = CommonUtils
Vue.prototype.$vHOST = '/api/'
Vue.prototype.$requestUtils = RequestUtils
Vue.prototype.$constMange = ConstMange

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
