/**
 * Created by lyf on 2018/7/19.
 */
export default {
// 格式化成json
  toJson (object) {
    try {
      var seen = []
      if (object) {
        return JSON.parse(JSON.stringify(object, function (key, val) {
          if (typeof val === 'object') {
            if (seen.indexOf(val) >= 0) return
            seen.push(val)
          }
          return val
        }))
      }
    } catch (e) {
      console.log('格式化错误：' + e.toString())
    }
    return '{}'
  },
  // 验证手机号码
  isPoneAvailable (context, poneInput) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (poneInput && poneInput && myreg.test(poneInput)) {
      return true
    } else {
      context.$message({
        message: '请输入正确的手机号码',
        type: 'warning'
      })
      return false
    }
  },
  // 提示错误提示
  showErrorMessage (context, message) {
    context.$message({
      message: message,
      type: 'error'
    })
  },
  // 提示错误提示
  showWarningMessage (context, message) {
    context.$message({
      message: message,
      type: 'warning'
    })
  },
  // 提示成功提示
  showSuccessMessage (context, message) {
    context.$message({
      message: message,
      type: 'success'
    })
  },
  formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
      }
    }
    return fmt
  },
  padLeftZero (str) {
    return ('00' + str).substr(str.length)
  },
  // 是否为管理员
  isAdmin () {
    return this.$store.state.role === 'admin'
  },
  // 数字判断
  // 检查是否为数字
  checkNumber (value) {
    console.log(value)
    let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    // 计算毛利润
    if (!value || !new RegExp(reg).test(value)) { // 非数字
      return false
    }
    return true
  },
  randomString (len) {
    len = len || 32
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'
    var maxPos = $chars.length
    var pwd = ''
    for (var i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  }

}
