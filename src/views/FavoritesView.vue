<!--
 * @Author: yzy
 * @Date: 2025-08-20 18:29:41
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-20 19:28:44
-->
<template>
  <div class="bg-white min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-3xl font-display text-center mb-8">我的收藏</h1>

      <div v-if="favorites.length === 0" class="text-center py-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-gray-400 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">暂无收藏</h3>
        <p class="mt-2 text-gray-500">您还没有收藏任何汉服</p>
        <router-link to="/gallery" class="mt-4 inline-block btn-outline"> 去逛逛 </router-link>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard v-for="product in favorites" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { Product } from '@/types/index'
import ProductCard from '@/components/ui/card/ProductCard.vue'
import { useFavoriteStore } from '@/stores/favorite.store'
import { useProductStore } from '@/stores/product.store'
const favoritesStore = useFavoriteStore()
const productsStore = useProductStore()

// 获取收藏的产品并指定类型
const favorites = computed<Product[]>(() => {
  return productsStore.products.filter((product) =>
    favoritesStore.favorites.includes(String(product.id)),
  )
})

// 如果没有产品数据，先获取产品
onMounted(() => {
  if (productsStore.products.length === 0) {
    productsStore.fetchProducts()
  }
})
</script>
