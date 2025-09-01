<template>
  <!-- 设定了更具中国风的背景色和字体 -->
  <div class="bg-[#FBF9F6] text-[#333333] font-sans min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <!-- 路由视图的过渡动画，让页面切换更平滑 -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <!-- 页脚组件暂时移除，以便我们专注于首页和导航栏的核心体验 -->
    <Footer />
    <DevAccessInfo />
  </div>
</template>

<script setup lang="ts">
import DevAccessInfo from '@/components/DevAccessInfo.vue'
import Footer from '@/components/layout/Footer.vue'
import Navbar from '@/components/layout/Navbar.vue'
</script>

<style>
/* 引入更优雅的衬线字体，提升设计感 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');

body {
  font-family:
    'Helvetica Neue', 'Helvetica', 'Arial', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    'WenQuanYi Micro Hei', sans-serif;
}

/* 定义标题和特殊文本的字体 */
.font-serif {
  font-family: 'Noto Serif SC', serif;
}

/* 页面切换的淡入淡出效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
