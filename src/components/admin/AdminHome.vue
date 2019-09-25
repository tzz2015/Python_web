<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/admin"><img src="../../assets/logo.png" style="padding-left:8px;"></a>
      </div>
      <div class="topbar-title">
        <span style="font-size: 18px;color: #fff;">超级无敌后台管理系统</span>
      </div>

      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont icon-user"></i>
            {{ userName }}
            <i class="iconfont icon-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="show_change_pw=true">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <!--面板下面-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="{showSidebar:!collapsed}">
        <el-menu @select="handleSelect" :default-active="$route.path" :router="true"
                 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <template v-for="item in menuList">
            <el-submenu :index="item.type_name" :key="item.id">
              <template slot="title">{{item.type_name}}</template>
              <el-menu-item v-for="childMenu in item.menu_list" :index="childMenu.menu_path"
                             :key="childMenu.id">
                {{childMenu.menu_name}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </aside>

      <!--右侧内容区-->
      <section class="content-container">
        <div>
          <router-view></router-view>
        </div>
      </section>

    </el-col>
    <el-dialog
      center
      title="修改密码"
      :visible.sync="show_change_pw"
      width="30%">
      <el-row style="padding-left: 20px;padding-right: 20px;margin-top: 10px">
        <el-col :span="4"><a>旧密码</a></el-col>
        <el-col :span="2">
          <img v-if="visible" @click="changePass" src="../../assets/image/xianshi.png" width="20px" height="20px"/>
          <img v-else @click="changePass" src="../../assets/image/yincang.png" width="20px" height="20px"/>
        </el-col>
        <el-col :span="18" style="padding-left: 10px;margin-top: -5px">
          <el-input v-if="visible" type="text" v-model="formPassword.oldPassword" size='small'
                    placeholder="请输入旧密码"></el-input>
          <el-input v-else type="password" v-model="formPassword.oldPassword" size='small'
                    placeholder="请输入旧密码"></el-input>
        </el-col>
      </el-row>
      <el-row style="padding-left: 20px;padding-right: 20px;margin-top: 20px">
        <el-col :span="4"><a>新密码</a></el-col>
        <el-col :span="2">
          <img v-if="visible" @click="changePass" src="../../assets/image/xianshi.png" width="20px" height="20px"/>
          <img v-else @click="changePass" src="../../assets/image/yincang.png" width="20px" height="20px"/>
        </el-col>
        <el-col :span="18" style="padding-left: 10px;margin-top: -5px">
          <el-input v-if="visible" type="text" v-model="formPassword.newPassword" size='small'
                    placeholder="请输入新密码"></el-input>
          <el-input v-else type="password" v-model="formPassword.newPassword" size='small'
                    placeholder="请输入新密码"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show_change_pw = false">取 消</el-button>
        <el-button type="primary" @click="change_password">确 定</el-button></span>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  name: 'AdminHome',
  data () {
    return {
      defaultActiveIndex: '1',
      collapsed: true,
      show_change_pw: false,
      formPassword: {
        oldPassword: '',
        newPassword: ''
      },
      visible: false,
      // 菜单列表
      menuList: [
        {
          id: 1,
          type_name: '用户管理',
          child_List: [{
            menu_name: '系统用户',
            menu_path: 'UserList'
          }
          ]
        },
        {
          id: 2,
          type_name: '菜单管理',
          child_List: [{
            menu_name: '菜单列表',
            menu_path: 'MenuList'
          }
          ]
        }
      ]
    }
  },
  computed: {
    userName () {
      if (this.$store.state.username) {
        return this.$store.state.username
      } else {
        return ''
      }
    }
  },
  created () {
    this.getMenuList()
    this.getUserInfo()
  },
  methods: {
    handleSelect (index) {
      this.$router.replace({name: index})
    },
    // 获取权限菜单列表
    getMenuList () {
      this.$requestUtils.get(this, '/permission_menu_list')
        .then(res => {
          if (res) {
            this.menuList = res.data
          }
        })
    },
    // 获取用户信息
    getUserInfo () {
      this.$requestUtils.post(this, '/user_info')
        .then(res => {
          if (res) {
            this.$store.commit('updateUserInfo', res.data)
          }
        })
    },
    /// 登出
    logout () {
      this.$requestUtils.post(this, '/logout')
        .then(res => {
          if (res) {
            this.handleSelect('Login')
          }
        })
    },
    changePass () {
      this.visible = !this.visible
    },
    // 修改密码
    change_password () {
      if (!this.formPassword.oldPassword) {
        this.$comUtils.showErrorMessage(this, '请输入旧密码')
        return
      }
      if (!this.formPassword.newPassword) {
        this.$comUtils.showErrorMessage(this, '请输入新密码')
        return
      }
      if (this.formPassword.newPassword === this.formPassword.oldPassword) {
        this.$comUtils.showErrorMessage(this, '新密码和旧密码一致')
        return
      }
      this.$requestUtils.post(this, 'change_password', this.formPassword)
        .then(resp => {
          this.$comUtils.showSuccessMessage(this, '修改成功')
          this.show_change_pw = false
          this.formPassword.newPassword = ''
          this.formPassword.oldPassword = ''
          this.handleSelect('Login')
        })
        .catch(e => {
          console.log(e)
        })
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
      background-image: url("../../assets/image/xianshi.png");
    }
    .el-input__icon .iconfont .icon-xianshi {
      background-image: url("../../assets/image/yincang.png");
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
      padding: 3%;

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
</style>
