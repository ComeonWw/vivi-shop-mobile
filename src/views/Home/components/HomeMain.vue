<template>
  <div class="home-main">
    <!-- 区域1： 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.home-main {
  // 区域1：轮播图
  .my-swipe img {
    width: 100%;
  }
}
</style>