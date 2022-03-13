<template>
  <div class="home-main">
    <!-- 区域1： 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="(item, index) in swipeData"
        :key="index"
      >
        <img :src="item.img">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getDefaultdata } from '@/api/index.js'

// 存储首页的所有数据（声明响应式数据）
const indexData = ref({})

// 封装首页数据初始化功能
const initIndexData = async () => {
  const data = await getDefaultdata()
  if (data.status !== 200 ){
    return 
  }
  indexData.value = data.data.data
}
initIndexData()

// 通过计算属性保存需要使用的数据
// 1. 轮播图数据
 const swipeData = computed(() => {
   return indexData.value.swiperBg?.default.imgList.list
 })
</script>

<style lang="scss" scoped>
.home-main {
  // 区域1：轮播图
  .my-swipe img {
    width: 100%;
  }
}
</style>