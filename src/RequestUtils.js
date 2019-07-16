import axios from 'axios'

export default {
  handleResp: function (context, resp, resolve, reject, isToLogin) {
    console.log(resp.data)
    // 正确返回
    if (resp.data.code === 200) {
      resolve(resp.data)
      // 没有登录
    } else if (resp.data.code === 303) {
      // 没有登录跳转到登录页面
      if (isToLogin === undefined || isToLogin) {
        context.$router.push({name: 'Login'})
      }
      reject(new Error('没有登录'))
      // 没有权限
    } else if (resp.data.code === 400) {
      context.$router.replace({name: 'NotPermission'})
      reject(new Error('没有权限'))
      // 系统错误
    } else if (resp.data.code === 500) {
      context.$router.replace({name: 'SysError'})
      reject(new Error('系统错误'))
      // 其他错误 显示错误dialog
    } else {
      context.$comUtils.showErrorMessage(context, resp.data.msg)
      reject(new Error('其他错误'))
    }
  },
  commonRequest: function (context, method, url, params, isToLogin) {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        baseURL: '/api/',
        url: url,
        params: (method === 'get' ? params : null),
        data: (method !== 'get' ? params : null)
      })
        .then((resp) => {
          if (this.handleResp) {
            this.handleResp(context, resp, resolve, reject, isToLogin)
          } else {
            resolve(resp)
          }
        })
        .catch((e) => {
          context.$comUtils.showErrorMessage(context, '网络异常，请稍后重试')
          console.log(e)
          reject(e)
        })
    })
  },
  get: function (context, url, params, isToLogin) {
    return this.commonRequest(context, 'get', url, params, isToLogin)
  },
  post: function (context, url, params, isToLogin) {
    return this.commonRequest(context, 'post', url, params, isToLogin)
  },
  put: function (context, url, params, isToLogin) {
    return this.commonRequest(context, 'put', url, params, isToLogin)
  },
  delete: function (context, url, params, isToLogin) {
    return this.commonRequest(context, 'delete', url, params, isToLogin)
  }
}
