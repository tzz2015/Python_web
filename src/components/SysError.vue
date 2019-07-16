<template>
  <div>
    <img src="../assets/image/sys_error.gif" class="container"/>
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
