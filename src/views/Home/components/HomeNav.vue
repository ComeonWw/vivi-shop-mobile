<template>
  <div class="home-nav">
    <!-- logo区域 -->
    <img height="20" src="@/assets/logo.png" alt="">
    <!-- 搜索区域 -->
    <div class="search">
      <van-icon name="search" size="0.5rem"></van-icon>
    </div>
    <!-- 分类跳转区域 -->
    <van-icon name="wap-nav"></van-icon>
  </div>
</template>

<style lang="scss" scoped>
.home-nav {
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-right: 10px;
  box-sizing: border-box;
  margin-top: 20px;
  z-index: 1000;

  img {
    padding: 0 10px;
  }
  .search {
    background-color: #f7f7f7;
    width: 100%;
    border-radius: 25px;
    padding-left: 12px;
    margin-right: 10px;
  }
}
</style>