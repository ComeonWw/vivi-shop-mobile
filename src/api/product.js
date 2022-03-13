import request from '@/utils/request'

// 商品列表请求
export const getProductsData = params => request({
  method: 'GET',
  url: '/products',
  params
})

// 获取某个指定商品详情
export const getProductDetails = params => request({
  method: 'GET',
  url: `/product/detail/${params.productId}`,
  params
})