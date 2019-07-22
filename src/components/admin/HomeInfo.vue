<template>
  <div class="master">
    <li>欢迎<a v-if="this.$store.state.is_superuser">超级管理员</a>
      <a class="master user_name">{{this.$store.state.username}}</a>大驾光临！
    </li>
    <br/>
    <li>最近登录：{{this.$store.state.last_login}}</li>

  </div>
</template>

<script>
export default {
  name: 'HomeInfo'
}
</script>

<style scoped lang="scss">
  .master {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    .user_name {
      font-size: larger;
      color: blue;
      padding: 10px;
    }
    li {
      list-style: none;
    }
  }
</style>
