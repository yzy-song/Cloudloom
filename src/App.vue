<template>
  <div class="font-sans min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
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
    <Toaster position="bottom-right" rich-colors />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { watch } from 'vue'
import { RouterView } from 'vue-router'
import { Toaster, toast } from 'vue-sonner'
import 'vue-sonner/style.css'
import Footer from '@/components/layout/Footer.vue'
import Navbar from '@/components/layout/Navbar.vue'
import { useAuthStore } from '@/stores/auth.store'
import { useCategoriesStore } from '@/stores/categories.store'
import { useFavoriteStore } from '@/stores/favorite.store'

const authStore = useAuthStore()
const favoriteStore = useFavoriteStore()
const categoriesStore = useCategoriesStore()

const fetchPublicData = () => {
  categoriesStore.fetchAllCategories()
}
fetchPublicData()

watch(
  // 同时侦听 isAuthReady 和 isAuthenticated
  () => [authStore.isAuthReady, authStore.isAuthenticated],
  async ([isReady, isAuth]) => {
    // 只有在认证状态就绪后才执行逻辑
    if (!isReady) {
      return
    }

    if (isAuth) {
      // 用户已登录且状态就绪
      await Promise.all([favoriteStore.fetchFavorites()])
    } else {
      // 用户未登录且状态就绪
      favoriteStore.favorites = []
    }
  },
  { immediate: true, deep: true }, // deep 确保数组变化被侦测
)

const showBackToTopButton = ref(false)

const handleScroll = () => {
  showBackToTopButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
/* 引入更优雅的衬线字体，提升设计感 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');

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
