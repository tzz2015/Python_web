<template>
  <img src="../assets/image/image_not_fund.jpg" class="container"/>
</template>
<script>
export default {
  name: 'NotFound',
  created () {
    console.log(window.history)
    setTimeout(_ => {
      this.$router.back()
    }, 5000)
  }

}
</script>
<style>
  .container {
    width: 60%;
  }
</style>
