<template>
  <!-- 顶部导航 -->
  <home-nav></home-nav>

  <!-- 主体区域 -->
  <home-main class="home-main"></home-main>

  <!-- 公共底部 -->
  <layout-footer></layout-footer>
</template>

<script setup>
import HomeNav from './components/HomeNav.vue'
import HomeMain from './components/HomeMain.vue'
import LayoutFooter from '@/components/LayoutFooter.vue';
</script>

<style lang="scss" scoped>
.home-main {
  padding: 80px 0;
}
</style>