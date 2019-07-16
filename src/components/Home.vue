<template>
  <div>
    欢迎 <a style="color: red;font-size: xx-large">{{this.$store.state.username}}</a> 光临！
    <el-button type="primary" size="small" @click="logout()" plain>注销</el-button>
    <div style="width: 70%;margin: 50px auto 0;">
      <el-button type="primary" size="small" style="margin-bottom: 20px" @click="addUser()">新增用户</el-button>
      <el-table
        :data="userList"
        border>
        <el-table-column
          prop="id"
          align="center"
          label="id">
        </el-table-column>
        <el-table-column
          prop="username"
          align="center"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="email"
          align="center"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <!--<el-button type="text" size="small" @click="editUser(scope.row)">编辑</el-button>-->
            <el-button type="text" size="small" @click="delete_user(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      width="35%"
      :title='dialogTitle'
      :visible.sync="dialogVisible">
      <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="80px" style="margin-right: 50px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model.number="userInfo.username" size="small" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="userInfo.email" size="small" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="userInfo.password" size="small" placeholder="请输入登录密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm_password">
          <el-input v-model="userInfo.confirm_password" size="small" placeholder="请输入确认密码" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="confirmEditUser" size="small">确 定</el-button>
       </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userList: [],
      userInfo: '',
      dialogVisible: false,
      dialogTitle: '添加成员',
      rules: {
        username: [
          { required: true, message: '请输入正确的用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ],
        confirm_password: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 注销登录
    logout () {
      this.$requestUtils.get(this, 'logout')
        .then(res => {
          this.$router.push({name: 'Login'})
        })
        .catch(e => {
          this.$comUtils.showErrorMessage(this, '注销失败')
        })
    },
    // 获取列表
    getUserList () {
      this.$requestUtils.get(this, 'user_list')
        .then(res => {
          if (res) {
            console.log(res.data)
            this.userList = res.data
          }
        })
    },
    // 添加成员
    addUser () {
      this.dialogVisible = true
      this.dialogTitle = '添加用户'
      this.userInfo = {
        username: '',
        email: '',
        password: '',
        confirm_password: ''
      }
      this.$refs.userInfo.resetFields()
    },
    // 编辑成员
    editUser (row) {
      this.dialogVisible = true
      this.dialogTitle = '编辑用户'
      this.userInfo = Object.assign({}, row)
      this.userInfo.password = '**dfd**87kjdk**dsdhjh388'
      this.userInfo.confirm_password = '**dfd**87kjdk**dsdhjh388'
      this.$refs.userInfo.resetFields()
    },
    // 保存编辑
    confirmEditUser () {
      let that = this
      this.$refs.userInfo.validate((valid) => {
        if (valid) {
          // 判断密码是否相同
          if (that.userInfo.password !== that.userInfo.confirm_password) {
            that.$comUtils.showErrorMessage(that, '两次输入的密码不一致')
            return
          }
          if (that.userInfo.password === '**dfd**87kjdk**dsdhjh388') {
            that.userInfo.password = ''
            that.userInfo.confirm_password = ''
          }
          console.log(that.$comUtils.toJson(that.userInfo))

          that.$requestUtils.post(that, 'createAndEdit', that.userInfo)
            .then(res => {
              if (res) {
                that.dialogVisible = false
                that.$comUtils.showSuccessMessage(that, res.msg)
                that.getUserList()
              }
            })
        }
      })
    },
    delete_user (row) {
      let that = this
      that.$requestUtils.get(this, 'delete?id=' + row.id)
        .then(res => {
          if (res) {
            that.$comUtils.showSuccessMessage(that, res.msg)
            that.getUserList()
          }
        })
    }

  }
}
</script>
