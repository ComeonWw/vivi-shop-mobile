<template>
<!-- 不需要居中，关闭即可,同时关闭边框显示 -->
  <van-grid
    class="product-list"
    :column-num="2"
    :gutter="10"
    :center="false"
    :border="false"
  >
    <van-grid-item
      v-for="item in productsData"
      :key="item.id"
      :to="{
        name: 'product',
        params: {
          productId: item.id
        }
        }"
    >
      <!-- 商品图 -->
      <img
        :src="item.image"
        height="165"
      >
      <!-- 商品的标题 -->
      <p
        class="title"
        v-text="item.store_name"
      ></p>
      <!-- 商品价格 -->
      <p class="price">￥{{ item.price }}</p>
      <!-- 销量 -->
      <p class="sales">已售{{ item.sales }}件</p>
    </van-grid-item>
  </van-grid>
</template>

<script setup>
// 定义数据，用于接收父组件传值
// 接收父组件传递得数据，并进行解构使用
const { productsData } = defineProps({
  productsData: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.product-list {
  margin: 10px 0;

  :deep(.van-grid-item__content) {
    border-radius: 10px;
    overflow: hidden;
    padding: 0;
    margin-bottom: 10px;
  }

  // 标题
  .title {
    font-size: 14px;
    padding: 5px 8px 0;
    // 描述字体比较多的话，点点点怎么做出来。
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  // 价格
  .price {
    color: #ee3e3e;
    font-size: 22px;
    font-weight: 700;
    padding-left: 6px;
  }

  // 小流量
  .sales {
    color: #ccc;
    font-size: 14px;
    padding-left: 8px;
  }
}
</style>

