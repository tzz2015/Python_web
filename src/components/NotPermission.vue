<template>
  <div>
    <img src="../assets/image/image_not_permiss.jpeg" class="container"/>
    <br/>
    <a class="permission">你没有权限访问该页面!</a>
  </div>

</template>
<script>
export default {
  name: 'NotPermission',
  created () {
    setTimeout(_ => {
      this.$router.go(-1)
    }, 5000)
  }
}
</script>
<style>
  .container {
    width: 40%;
  }

  .permission {
    font-size: x-large;
    color: red;
  }
</style>
