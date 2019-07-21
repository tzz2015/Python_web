<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/admin"><img src="../../assets/logo.png" style="padding-left:8px;"></a>
      </div>
      <div class="topbar-title">
        <span style="font-size: 18px;color: #fff;">未知后台管理系统</span>
      </div>

      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont icon-user"></i>
             刘宇飞
            <i class="iconfont icon-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <!--面板下面-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="{showSidebar:!collapsed}">
        <el-menu @select="handleSelect" :default-active="$route.path"
                 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <template v-for="item in menuList">
            <el-submenu :index="item.name" :key="item.id">
              <template slot="title">{{item.name}}</template>
              <el-menu-item v-for="childMenu in item.childMenuList" :index="childMenu.path" :key="childMenu.id">
                {{childMenu.name}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </aside>

      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <transition name="fade" mode="out-in">
              <router-view></router-view>
          </transition>
        </div>
      </section>

    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AdminHome',
  data () {
    return {
      defaultActiveIndex: '1',
      collapsed: true,
      // 菜单列表
      menuList: [
        {
          id: 1,
          name: '用户管理',
          childMenuList: [{
            name: '系统用户',
            path: 'UserList'
          }
          ]
        },
        {
          id: 2,
          name: '菜单管理',
          childMenuList: [{
            name: '菜单列表',
            path: 'MenuList'
          }
          ]
        }
      ]
    }
  },
  methods: {
    handleSelect (index) {
      this.$router.replace({name: index})
    }
  }
}
</script>

<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .topbar-wrap {
      height: 50px;
      line-height: 50px;
      background: #373d41;

      .topbar-btn {
        color: #fff;
      }

      .topbar-logo {
        float: left;
        width: 59px;
        line-height: 26px;
      }

      .topbar-logo img,
      .topbar-logos img {
        height: 40px;
        margin-top: 5px;
        margin-left: 2px;
      }
      .topbar-title {
        float: left;
        text-align: left;
        width: 200px;
        padding-left: 10px;
        border-left: 1px solid #000;
      }
      .topbar-account {
        float: right;
        padding-right: 12px;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        padding-right: 15px;
      }
    }
    .main {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      top: 50px;
      bottom: 0px;
      overflow: hidden;
    }
    .el-input__icon .iconfont .icon-yincang {
      background-image: url("../../assets/logo.png");
    }
    .el-input__icon .iconfont .icon-xianshi {
      background-image: url("../../assets/logo.png");
    }
    aside {
      min-width: 50px;
      background: #333744;
      &::-webkit-scrollbar {
        display: none;
      }

      &.showSidebar {
        overflow-x: hidden;
        overflow-y: auto;
      }

      .el-menu {
        height: 100%; /*写给不支持calc()的浏览器*/
        border-radius: 0px;
        background-color: #333744;
        border-right: 0px;
      }

      .el-submenu {
        background-color: #faffd7;
        .el-menu-item {
          font-size: small;
          margin-left: 20px;
          min-width: 60px;
          background-color: #f1edff;
        }
      }
      .el-menu {
        width: 160px;
      }
      .el-menu--collapse {
        width: 60px;
      }
      // .el-menu .el-menu-item,
      // .el-submenu .el-submenu__title {
      //   height: 46px;
      //   line-height: 46px;
      // }

      .el-menu-item:hover,
      .el-submenu .el-menu-item:hover,
      .el-submenu__title:hover {
        background-color: #7ed2df;
      }
    }

    .menu-toggle {
      background: #4a5064;
      text-align: center;
      color: white;
      height: 26px;
      line-height: 30px;
    }

    .content-container {
      background: #f0f2f5;
      flex: 1;
      overflow-y: auto;
      padding: 20px;

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
</style>
