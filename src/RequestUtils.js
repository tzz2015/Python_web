import axios from 'axios'

export default {
  handleResp: function (context, resp, resolve, reject) {
    console.log(resp.data)
    if (resp.data.code === 200) {
      resolve(resp.data)
    } else if (resp.data.code === 401) {
      context.$comUtils.showErrorMessage(context, resp.data.msg)
      reject(new Error('Code Error'))
      // 失败的话就原地跳转咯
      window.location.href = 'http://localhost:8090/' + 'login'
      // }
    } else if (resp.data.code === 403) {
      context.$router.replace({ name: 'NotAuth' })
    } else {
      context.$comUtils.showErrorMessage(context, resp.data.msg)
      reject(new Error('Code Error'))
    }
  },
  commonRequest: function (context, method, url, params) {
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
            this.handleResp(context, resp, resolve, reject)
          } else {
            resolve(resp)
          }
        })
        .catch((e) => {
          console.log(e)
          reject(e)
        })
    })
  },
  get: function (context, url, params) {
    return this.commonRequest(context, 'get', url, params)
  },
  post: function (context, url, params) {
    return this.commonRequest(context, 'post', url, params)
  },
  put: function (context, url, params) {
    return this.commonRequest(context, 'put', url, params)
  },
  delete: function (context, url, params) {
    return this.commonRequest(context, 'delete', url, params)
  }
}
