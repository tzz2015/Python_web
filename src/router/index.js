import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import NotFund from '@/components/NotFund'
import NotPermission from '@/components/NotPermission'
import SysError from '@/components/SysError'
import AdminHome from '@/components/admin/AdminHome'
import HomeInfo from '@/components/admin/HomeInfo'
import UserList from '@/components/admin/UserList'
import MenuList from '@/components/admin/MenuList'
import TopMenuList from '@/components/admin/TopMenuList'
import Alum3D from '@/components/phone/Alum3D'

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
      path: '/admin',
      component: AdminHome,
      children: [
        {
          path: '',
          name: 'HomeInfo',
          component: HomeInfo
        }, {
          path: 'user',
          name: 'UserList',
          component: UserList
        }, {
          path: 'menu',
          name: 'MenuList',
          component: MenuList
        }, {
          path: 'topMenu',
          name: 'TopMenuList',
          component: TopMenuList
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Alum3D',
      name: 'Alum3D',
      component: Alum3D
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
