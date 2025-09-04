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
    <Footer />

    <!-- 回到顶部按钮 -->
    <transition name="fade-in-up">
      <button
        v-if="showBackToTopButton"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 p-4 bg-[#C0392B] text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#C0392B] z-40"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          ></path>
        </svg>
      </button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import DevAccessInfo from '@/components/DevAccessInfo.vue'
import Footer from '@/components/layout/Footer.vue'
import Navbar from '@/components/layout/Navbar.vue'

// “回到顶部”按钮的显示状态
const showBackToTopButton = ref(false)

/**
 * 监听滚动事件，根据滚动位置决定是否显示按钮。
 */
const handleScroll = () => {
  showBackToTopButton.value = window.scrollY > 300
}

/**
 * 平滑滚动到页面顶部。
 */
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 在组件挂载时添加滚动事件监听器
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 在组件卸载时移除事件监听器，避免内存泄漏
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
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

/* 页面切换的淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 回到顶部按钮的淡入和向上滑动动画 */
.fade-in-up-enter-active {
  transition: all 0.5s ease-out;
}

.fade-in-up-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-in-up-enter-from,
.fade-in-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
