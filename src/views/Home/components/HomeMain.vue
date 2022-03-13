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
    <!-- 区域2: 菜单列表 -->
    <van-grid icon-size="40">
      <van-grid-item
        v-for="(item, index) in menusData"
        :key="index"
        :icon="item.img"
        :text="item.info[0].value"
      />
    </van-grid>
    <!-- 区域3：公告栏 -->
    <van-notice-bar left-icon="volume-o" :scrollable="false">
    <span>热点资讯公告：</span>
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item
         v-for="(item, index) in newsData"
         :key="index"
         v-text="item.chiild[0].val"
        >
        </van-swipe-item>
      </van-swipe>
    </van-notice-bar>
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
 // 2. 菜单列表数据
 const menusData = computed(() => {
   return indexData.value.menus?.default.imgList.list
 })
 // 3. 公告区域数据
 const newsData = computed(() => {
   return indexData.value.news?.default.newList.list
 })
</script>

<style lang="scss" scoped>
.home-main {
  // 区域1：轮播图
  .my-swipe img {
    width: 100%;
  }
  // 区域3：公告区域
  :deep(.van-notice-bar__content) {
    display: flex;
    align-items: center;
  }
  .van-notice-bar {
    height: 70px;
  }
  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
}
</style>