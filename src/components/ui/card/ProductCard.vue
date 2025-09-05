<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { useFavoriteStore } from '@/stores/favorite.store'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const favoriteStore = useFavoriteStore()
const authStore = useAuthStore()

// 计算当前产品是否已被收藏
const isFavorited = computed(() => favoriteStore.isFavorite(props.product.id))

// 切换收藏状态的函数
function handleToggleFavorite() {
  if (!authStore.isAuthenticated) {
    alert('请先登录才能使用收藏功能哦！')
    return
  }
  favoriteStore.toggleFavorite(props.product.id)
}
</script>

<template>
  <div
    class="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
  >
    <RouterLink :to="`/products/${product.id}`" class="block">
      <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img
          :src="product.images?.[0] || 'https://via.placeholder.com/400'"
          :alt="product.name"
          class="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
        />
      </div>
      <div class="p-4">
        <h3 class="text-sm text-gray-700 dark:text-gray-300">
          {{ product.name }}
        </h3>
        <p class="mt-1 text-lg font-medium text-gray-900 dark:text-white">€{{ product.price }}</p>
      </div>
    </RouterLink>

    <!-- 收藏按钮 -->
    <button
      class="absolute top-2 right-2 p-2 rounded-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 transition-colors duration-200 z-10"
      @click.prevent="handleToggleFavorite"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        :class="{
          'text-red-500 fill-current': isFavorited,
          'text-gray-600 dark:text-gray-300': !isFavorited,
        }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
        />
      </svg>
    </button>
  </div>
</template>
