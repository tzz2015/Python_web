<template>
  <div class="page-login">
    <el-card class="login-container">
      <h3 class="title">管理系统用户登录</h3>
      <el-form ref="login" :model="form" label-width="70px" :rules="rules" style="margin-top: 10px">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="yellow" type="warning" @click="submitForm('login')">登录</el-button>
          <el-button type="primary" @click="submitRegistForm('login')">注册</el-button>
          <el-button @click="resetForm('login')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 登录
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
                console.log(res)
                this.$store.commit('updateUserInfo', res.data)
                this.$router.push('/admin')
              }
            })
        } else {
          return false
        }
      })
    },
    // 注册
    submitRegistForm (formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let parm = {
            username: this.form.username,
            password: this.form.password
          }

          this.$requestUtils.post(this, '/create_update_user', parm)
            .then(res => {
              if (res) {
                console.log(res)
                that.submitForm('login')
              }
            })
        } else {
          return false
        }
      })
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.form.password = ''
      this.form.username = ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .page-login {
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../assets/image/bg-login.jpg) no-repeat center;
  }

  .el-dialog {
    padding-left: 3%;
    padding-right: 3%;
  }

  .yellow.el-button {
    color: #666666;
    background-color: #FFD753;
    border: none;
  }

  #msg {
    text-align: center;
    width: 100%;
  }

  #login {
    background-color: #FFD306;
    width: 220px;
    height: 40px;
  }

  .login-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 60%;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    background: -ms-linear-gradient(top, #ace, #00C1DE); /* IE 10 */
    background: -moz-linear-gradient(top, #ace, #00C1DE); /*火狐*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ace), to(#00C1DE)); /*谷歌*/
    background: -webkit-linear-gradient(top, #ace, #00C1DE); /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top, #ace, #00C1DE); /*Opera 11.10+*/

    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }

  }
</style>
