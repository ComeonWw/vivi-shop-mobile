<template>
  <van-pull-refresh class="home-main" v-model="refreshing" @refresh="onRefresh">
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
    <!-- 区域4： 商品列表 -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="initProductsData"
    >
      <product-list
        :products-data="productsData"
      ></product-list>
    </van-list>
  </van-pull-refresh>
</template>

<script setup>
import ProductList from '@/components/ProductList.vue'
import { ref, computed } from 'vue'
import { getDefaultdata } from '@/api/index.js'
import { getProductsData } from '@/api/product.js'

// -----首页功能-----
// 存储首页的所有数据（声明响应式数据）
const indexData = ref({})

// 首页控制加载状态
const loading = ref(false)
const finished = ref(false)

// 封装首页数据初始化功能
const initIndexData = async () => {
  const data = await getDefaultdata()
  if (data.status !== 200 ){
    return 
  }
  indexData.value = data.data.data
  // 加载完数据之后，将Refreshing设置为false
  refreshing.value = false
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

 // ------商品功能-----
 // 存储商品列表数据
 const productsData = ref([])

 let page = 1
 // 请求指定页得商品数据
 const initProductsData = async () => {
   const { data } = await getProductsData({
     limit: 4,
     page
   })
   if (data.status !== 200) { return }
   // 请求每次得到的是新一段数据，需要将新数据添加到productsData中
   productsData.value.push(...data.data)
   // 变更页数，准备下次数据请求
   page++
   // 加载成功之后，需要将loading设置为false
   loading.value = false
   // 如果所有数据已经加载完毕，需要将finished设置为true
   if (data.data.length < 4) {
     finished.value = true
   }
 }

 // -----下拉刷新功能-----
 // 下拉刷新状态
const refreshing = ref(false)
const onRefresh = () => {
  // 1: 清空数据
  indexData.value = {}
  productsData.value = []
  // 2: 页面还原
  page = 1
  // 3 触底加载的状态还原
  loading.value = false
  finished.value = false
  // 4：重新发送请求
  initIndexData()
  initProductsData()
}

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