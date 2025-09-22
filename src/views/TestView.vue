<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { Toaster, toast } from 'vue-sonner'
// 假设的商品数据，实际项目中可以从后端 API 获取
const products = ref([
  {
    id: 1,
    name: '素雅 · 梨花',
    description: '淡雅梨花，清丽脱俗，古典韵味十足。',
    imageUrl: 'https://placehold.co/800x600/F0F3F4/4F5E68?text=Product+1',
  },
  {
    id: 2,
    name: '国色 · 牡丹',
    description: '富贵牡丹，雍容华贵，尽显盛唐风采。',
    imageUrl: 'https://placehold.co/800x600/D9D9D9/4F5E68?text=Product+2',
  },
  {
    id: 3,
    name: '青黛 · 墨竹',
    description: '墨竹清风，意境悠远，尽显文人雅士之风。',
    imageUrl: 'https://placehold.co/800x600/E5E5E5/4F5E68?text=Product+3',
  },
  {
    id: 4,
    name: '绯红 · 桃花',
    description: '灼灼桃花，绚烂夺目，带来春日般的生机。',
    imageUrl: 'https://placehold.co/800x600/E8E8E8/4F5E68?text=Product+4',
  },
])

const loading = ref(true)

onMounted(() => {
  console.log('TestView mounted')
  // 模拟数据加载
  setTimeout(() => {
    loading.value = false
  }, 1000)
  toast.success('Toast 初始化测试', { duration: 3000 })
})

// 使用 Vue Composition API 和 Tailwind CSS 构建组件

// Navbar 组件
const Navbar = {
  template: `
    <header class="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-sm shadow-md">
      <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" class="text-2xl font-serif tracking-widest text-gray-800">
          云织
        </a>
        <div class="hidden md:flex space-x-8 text-lg">
          <a href="#" class="nav-link">首页</a>
          <a href="#" class="nav-link">系列</a>
          <a href="#" class="nav-link">预约</a>
          <a href="#" class="nav-link">关于我们</a>
        </div>
        <button class="md:hidden p-2 text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>
    </header>
  `,
}

// Footer 组件
const Footer = {
  template: `
    <footer class="bg-gray-100 py-12 mt-20">
      <div class="container mx-auto px-4 text-center text-gray-600">
        <div class="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-4 md:space-y-0">
          <a href="#" class="hover:underline">联系我们</a>
          <a href="#" class="hover:underline">隐私政策</a>
          <a href="#" class="hover:underline">加入我们</a>
        </div>
        <p class="mt-8 text-sm">&copy; 2024 云织汉服体验馆. 保留所有权利。</p>
      </div>
    </footer>
  `,
}

// Loading Spinner 组件
const LoadingSpinner = {
  template: `
    <div v-if="loading" class="fixed inset-0 bg-white z-[99] flex items-center justify-center transition-opacity duration-500 ease-in-out">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  `,
  props: ['loading'],
}

// Product Card 组件
const ProductCard = {
  template: `
    <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <img :src="product.imageUrl" :alt="product.name" class="w-full h-96 object-cover object-center rounded-t-xl transition-transform duration-500 hover:scale-105">
      <div class="p-6">
        <h3 class="text-xl font-medium text-gray-800">{{ product.name }}</h3>
        <p class="mt-2 text-gray-600">{{ product.description }}</p>
        <button class="mt-4 px-6 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors duration-300">
          了解更多
        </button>
      </div>
    </div>
  `,
  props: ['product'],
}
</script>

<template>
  <LoadingSpinner :loading="loading" />
</template>

<style scoped>
/* 可以在这里添加一些自定义样式，但大部分样式由 Tailwind 处理 */
.nav-link {
  color: #1f2937; /* text-gray-800 */
  transition-property: color;
  transition-duration: 300ms;
}
.nav-link:hover {
  color: #6b7280; /* text-gray-500 */
}
</style>
