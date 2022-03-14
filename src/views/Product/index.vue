<template>
  <van-nav-bar left-arrow fixed></van-nav-bar>
  <van-tabs sticky scrollspy>
    <!-- 商品 -->
    <van-tab title="商品">
      <!-- 1：轮播 -->
      <van-swipe class="my-swipe" :autoplay="3000" height="200">
        <van-swipe-item
          v-for="(index, item) in sliderImage"
          :key="index"
        >
          <img :src="item">
        </van-swipe-item>
      </van-swipe>
      <!-- 2: 商品头部 -->
      <van-cell
        class="productHeader"
        :border="false"
      >
        <!-- 插槽 -->
        <template #title>
          <div class="price">
            <!-- 商品价格 -->
            <span>￥{{ storeInfo?.price }}</span>
            <!-- 分享按钮 -->
            <van-icon name="share-o" class="share"></van-icon>
          </div>
          <!-- 商品标题 -->
          <div class="title">{{ storeInfo?.store_name }}</div>
        </template>
        <template #label>
          <span>原价：￥{{ storeInfo?.ot_price }}</span>
          <span>库存: {{ storeInfo?.stock }}</span>
          <span>销量：{{ storeInfo?.sales }}</span>
        </template>
      </van-cell>
    </van-tab>
    <van-tab title="评价">内容 2</van-tab>
    <van-tab title="推荐">内容 3</van-tab>
    <van-tab title="详情">内容 4</van-tab>
  </van-tabs>
</template>

<script setup>
// 引入useRouter
import { useRouter } from 'vue-router'
// -----请求商品数据------
import { getProductDetails } from '@/api/product'
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';

//@ts-check
const router = new useRouter()

// 接收父组件传递的值,获取商品id
const { productId } = defineProps({
  productId: {
    type: String,
    required: true
  }
})
// 存储商品详情的所有信息
const productDetails = ref({})
const initProductDetails = async () => {
  const { data } = await getProductDetails(productId)
  console.log(data)
  if (data.status !== 200) {
    // 找不到对应商品，直接跳回首页
    return router.push({
      name: 'home'
    })
  }
  productDetails.value = data.data
  console.log(data.data)
}
initProductDetails()

// =====商品数据处理=====
// 1 商品详情信息
const storeInfo = computed(() => productDetails.value.storeInfo)
// 1.1 轮播图数据
const sliderImage = computed(() => storeInfo.value?.slider_image)

</script>

<style lang="scss" scoped>
// 为了避免问题， 添加fixed样式权重
.van-nav-bar {
  position: fixed !important;
}

.van-tabs {
  background-color: #f2f2f2;
}

// 顶部tabs的标题部分
:deep(.van-tabs__wrap) {
  position: fixed;
  top: 0;
  z-index: 999;
  // 常规居中设置
  left: 50%;
  transform: translateX(-50%);
  // 设置宽度
  width: 80%;
  .van-tab {
    line-height: center !important;
  }
}

// 底部主题内容容器
:deep(.van-tabs__content) {
  margin-top: 60px;
}

// 轮播图样式
.van-swipe-item img {
  width: 375px;
}

// 商品信息区域
.productHeader {
  margin-bottom: 10px;

  // title 插槽部分
  .van-cell__title {
    .price {
      span {
        font-size: 24px;
        font-weight: 700;
      }

      .share {
        float: right;
      }
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      margin: 5px 0 10px;
    }
  }
}
</style>