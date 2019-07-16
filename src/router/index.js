import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import NotFund from '@/components/NotFund'
import NotPermission from '@/components/NotPermission'
import SysError from '@/components/SysError'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/404',
      name: 'NotFund',
      component: NotFund
    },
    {
      path: '/NotPermission',
      name: 'NotPermission',
      component: NotPermission
    },
    {
      path: '/SysError',
      name: 'SysError',
      component: SysError
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
