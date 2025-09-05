<script setup lang="ts">
import { onMounted } from 'vue'
import BaseLoading from '@/components/ui/BaseLoading.vue'
import ProductCard from '@/components/ui/card/ProductCard.vue'
import { useFavoriteStore } from '@/stores/favorite.store'

const favoriteStore = useFavoriteStore()

// 当组件挂载时，获取收藏列表
onMounted(() => {
  favoriteStore.fetchFavorites()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">我的收藏</h1>

    <!-- 加载状态 -->
    <div v-if="favoriteStore.isLoading" class="flex justify-center items-center h-64">
      <BaseLoading class="w-12 h-12" />
    </div>

    <!-- 收藏列表为空 -->
    <div
      v-else-if="!favoriteStore.isLoading && favoriteStore.favorites.length === 0"
      class="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-lg shadow"
    >
      <p class="text-xl text-gray-500 dark:text-gray-400">您的收藏夹是空的。</p>
      <p class="mt-2 text-gray-400">快去逛逛，把喜欢的汉服都加进来吧！</p>
    </div>

    <!-- 显示收藏列表 -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="favorite in favoriteStore.favorites"
        :key="favorite.id"
        :product="favorite.product"
      />
    </div>
  </div>
</template>
