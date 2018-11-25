<template>
  <el-card class="box-card" style="width: 400px;height: 300px;margin: 0 auto">
    <div slot="header">
      <span>用户登录</span>
    </div>
    <el-form ref="login" :model="form" label-width="70px" :rules="rules" style="margin-top: 20px">
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" ></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="form.password" placeholder="密码" type="password" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('login')">提交</el-button>
        <el-button @click="resetForm('login')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: 'root',
        password: 'root'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let parm = {
            username: this.form.username,
            password: this.form.password
          }

          this.$requestUtils.post(this, '/login', parm)
            .then(res => {
              if (res) {
                // this.$comUtils.showSuccessMessage(this, res)
                this.$store.commit('updateUserInfo', res.data)
                this.$router.push({ name: 'Home' })
              }
            })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
