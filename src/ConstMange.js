export default {
  user_type_list: [
    {
      label: '超级管理员',
      value: 0
    },
    {
      label: '管理员',
      value: 1
    },
    {
      label: '普通用户',
      value: 2
    }
  ],
  active_list: [
    {
      label: '启用',
      value: true
    },
    {
      label: '禁用',
      value: false
    }
  ],
  getStateName (state, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].value === state) {
        return arr[i].label
      }
    }
    return ''
  }
}
