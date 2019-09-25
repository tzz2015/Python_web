<template>
  <div>
    <el-card>
      <div slot="header">
        <span>筛选查询</span>
      </div>
      <el-form ref="search_form" :inline="true" :model="search_form">
        <el-form-item label="输入搜索">
          <el-input v-model="search_form.username" placeholder="用户名" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="search_form.user_type" placeholder="请选择" size="small" clearable>
            <el-option
              label="全部"
              value="-1">
            </el-option>
            <el-option
              v-for="item in user_type_list"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="启用状态">
          <el-select v-model="search_form.is_active" placeholder="请选择" size="small" clearable>
            <el-option
              label="全部"
              value="">
            </el-option>
            <el-option
              v-for="item in active_list"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" size="small" style="margin-top: 4px" round @click="doSearch">查询</el-button>

      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <div slot="header">
        <span>用户列表</span>
        <span style="float: left">
           <el-button type="danger" :disabled="isDisabledEdit()" size="small" icon="el-icon-delete" round
                      @click="delete_all">删除全部</el-button>
      </span>
        <span style="float: right">
           <el-button type="success" :disabled="isDisabledEdit()" size="small" round
                      @click="show_add_user">添加成员</el-button>
      </span>
      </div>
      <el-table
        :data="user_list"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="110">
        </el-table-column>
        <el-table-column
          label="用户角色"
          width="150">
          <template slot-scope="scope">
            <a>{{getStateName(scope.row.user_type,user_type_list)}}</a>
          </template>
        </el-table-column>
        <el-table-column
          width="125"
          label="菜单权限">
          <template slot-scope="scope">
            <a v-if="scope.row.user_type===0">我是老大，拥有全部权限</a>
            <a v-else>空空如也~~</a>
          </template>
        </el-table-column>
        <el-table-column
          width="125"
          label="操作权限">
          <template slot-scope="scope">
            <a v-if="scope.row.user_type===0">我是老大，拥有全部权限</a>
            <a v-else>空空如也~~</a>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          prop="last_login"
          label="最近登录">
        </el-table-column>
        <el-table-column
          align="center"
          label="启用状态">
          <template slot-scope="scope">
            <el-switch
              :disabled="isDisabledEdit(scope.row)"
              @change="edit_user_status(scope.row)"
              v-model="scope.row.is_active"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button
              :disabled="isDisabledEdit(scope.row)"
              @click="show_edit_user(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              :disabled="isDisabledEdit(scope.row)"
              @click="delete_user(scope.row)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination class="pagination"
                       background
                       @current-change="handleCurrentChange"
                       layout="prev, pager, next"
                       :page-size="page_size"
                       :total="total">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog
      width="35%"
      center
      :title='dialogTitle'
      :visible.sync="dialogVisible">
      <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="80px" style="margin-right: 50px">
        <el-form-item label="用户账号" prop="username" size="small">
          <el-input v-model="userInfo.username" size="small" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="user_type" size="small">
          <el-select v-model="userInfo.user_type" placeholder="请选择" size="small" style="width: 100%">
            <el-option
              v-for="item in can_type_list()"
              :disabled="item.disabled"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单权限" multiple size="small">
          <el-select v-model="userInfo.menu" placeholder="请选择" size="small" style="width: 100%">
            <el-option
              v-for="item in menu_list"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作权限" multiple prop="isCraftsman" size="small">
          <el-select v-model="userInfo.option" placeholder="请选择" size="small" style="width: 100%">
            <el-option
              v-for="item in option_list"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录密码" prop="password" size="small">
          <el-input v-model="userInfo.password" size="small" placeholder="请输入登录密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm_password" size="small">
          <el-input v-model="userInfo.confirm_password" size="small" placeholder="请输入确认密码" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="confirm_user" size="small">确 定</el-button>
       </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'UserList',
  data () {
    return {
      search_form: {
        username: '',
        user_type: '-1',
        is_active: true
      },
      // 是否为编辑状态
      isEdit: false,
      curr_page: 1,
      page_size: 5,
      total: 1,
      user_list: [],
      user_select: [],
      menu_list: [],
      option_list: [],
      user_type_list: this.$constMange.user_type_list,
      active_list: this.$constMange.active_list,
      dialogVisible: false,
      dialogTitle: '添加用户',
      userInfo: {},
      rules: {
        username: [
          {required: true, message: '请输入用户名称', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入登录密码', trigger: 'blur'}
        ],
        confirm_password: [
          {required: true, message: '请输入确认密码', trigger: 'blur'}
        ],
        user_type: [
          {required: true, message: '请用户角色', trigger: 'change'}
        ]
      }
    }
  },
  created () {
    this.get_user_list(1)
  },
  methods: {
    getStateName (state, arr) {
      return this.$constMange.getStateName(state, arr)
    },
    // 多选
    handleSelectionChange (val) {
      this.user_select = val
      console.log(`选中: ${val}`)
    },
    // 选择当前页码
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.get_user_list(val)
    },
    // 获取用户列表
    get_user_list (page, params) {
      if (params === undefined) {
        params = {
          page: page,
          page_size: this.page_size
        }
      }
      this.$requestUtils.post(this, '/user_list', params)
        .then(res => {
          if (res) {
            if (res.data !== null || res.data !== undefined) {
              this.total = res.data.total
              this.user_list = res.data.list
              this.curr_page = page
            }
          }
        })
    },
    // 编辑用户
    delete_user (row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$requestUtils.post(this, '/delete_user', row)
          .then(res => {
            this.dialogVisible = false
            this.get_user_list(this.curr_page)
            this.$comUtils.showSuccessMessage(this, res.data)
          })
      })
    },
    // 编辑用户状态
    edit_user_status (row) {
      this.$requestUtils.post(this, '/active', row)
        .then(res => {
          this.dialogVisible = false
          this.get_user_list(this.curr_page)
          this.$comUtils.showSuccessMessage(this, res.data)
        })
    },
    // 用户查询
    doSearch () {
      this.get_user_list(this.curr_page, this.search_form)
    },
    // 删除全部
    delete_all () {
      if (this.user_select.length === 0) {
        this.$comUtils.showErrorMessage(this, '请至少选择一个用户')
      }
    },
    // 添加成员
    show_add_user () {
      this.dialogVisible = true
      this.isEdit = false
      this.dialogTitle = '添加用户'
      this.userInfo = {
        id: 0,
        username: '',
        user_type: 2,
        menu: [],
        option: [],
        password: '',
        confirm_password: ''
      }
    },
    // 编辑成员
    show_edit_user (row) {
      this.dialogVisible = true
      this.isEdit = true
      this.dialogTitle = '编辑用户'
      this.userInfo = Object.assign({}, row)
      this.userInfo.password = '**dfd**87kjdk**dsdhjh388'
      this.userInfo.confirm_password = '**dfd**87kjdk**dsdhjh388'
      this.$refs.userInfo.resetFields()
    },
    // 新增或者编辑用户
    confirm_user () {
      this.$refs.userInfo.validate((valid) => {
        if (valid) {
          let password = this.userInfo.password
          // 判断密码是否相同
          if (password && password !== this.userInfo.confirm_password) {
            this.$comUtils.showErrorMessage(this, '两次输入的密码不一致')
            return
          }
          if (password === '**dfd**87kjdk**dsdhjh388') {
            this.userInfo.password = ''
          }
          this.$requestUtils.post(this, '/create_update_user', this.userInfo)
            .then(res => {
              this.dialogVisible = false
              this.get_user_list(this.curr_page)
            })
        }
      })
    },
    // 判断用户是否有编辑权限
    isDisabledEdit (row) {
      if (row) {
        if (row.id === this.$store.state.id) {
          return true
        }
        if (this.$store.state.user_type === 1 && row.user_type === 2) {
          return false
        }
      } else {
        if (this.$store.state.user_type === 1) {
          return false
        }
      }
      return this.$store.state.user_type !== 0
    },
    // 获取可操作的用户角色列表
    can_type_list () {
      var userType = this.$constMange.user_type_list
      userType[0].disabled = true
      if (this.$store.state.user_type === 1) {
        userType[1].disabled = true
      }
      return userType
    }
  }
}
</script>

<style scoped>
  .pagination {
    float: right;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
