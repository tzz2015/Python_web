<template>
  <img src="../assets/image/image_not_fund.jpg" class="container"/>
</template>
<script>
export default {
  name: 'NotFound',
  created () {
    setTimeout(_ => {
      this.$router.go(-1)
    }, 5000)
  }
}
</script>
<style>
  .container {
    width: 60%;
  }
</style>
