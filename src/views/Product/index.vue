<template>

</template>

<script setup>
// 引入useRouter
import { useRouter } from 'vue-router'
// -----请求商品数据------
import { getProductDetails } from '@/api/product'
import { ref } from '@vue/reactivity';

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
}
initProductDetails()
</script>

<style lang="scss" scoped>

</style>