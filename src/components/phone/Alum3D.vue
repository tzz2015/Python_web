<template>
  <div class="box">
    3D相册
  </div>
</template>

<script>
export default {
  name: 'Alum3D'
}
</script>

<style scoped>

  * {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }

  .box {
    width: 200px;
    height: 200px;
    position: relative;
    margin: 300px auto;
    -webkit-transform-style: preserve-3d;
    -webkit-transform: rotateX(13deg);
    -webkit-animation: move 5s linear infinite;
  }

</style>
