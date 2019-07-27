<template>
  <div class="master">
    <li>欢迎<a >{{this.$store.state.type_name}}</a>
      <a class="master user_name">{{this.$store.state.username}}</a>大驾光临！
    </li>
    <br/>
    <li>最近登录：{{this.$store.state.last_login}}</li>
    <li><img src="../../assets/image/fly.gif" style="margin-top: 3em"/></li>

  </div>
</template>

<script>
export default {
  name: 'HomeInfo'
}
</script>

<style scoped lang="scss">
  .master {
    width: 93%;
    height: 400px;
    margin: 0 auto;
    padding: 30px;
    .user_name {
      font-size: larger;
      color: blue;
      padding: 10px;
    }
    background: white;
    li {
      list-style: none;
    }
  }
</style>
