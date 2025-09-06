<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="isLoading" class="flex justify-center items-center h-96">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="product" class="card lg:card-side bg-base-100 shadow-xl">
      <figure class="lg:w-1/2">
        <img :src="product.mainImage" :alt="product.name" class="w-full h-full object-cover" />
      </figure>
      <div class="card-body lg:w-1/2">
        <h1 class="card-title text-3xl font-bold">{{ product.name }}</h1>
        <div class="my-2">
          <span class="badge badge-primary">{{ product.subcategory.category.name }}</span>
          <span class="badge badge-secondary ml-2">{{ product.subcategory.name }}</span>
        </div>
        <p class="py-4">{{ product.description }}</p>
        <div class="text-2xl font-semibold text-primary">€{{ product.price.toFixed(2) }}</div>
        <div class="card-actions justify-end items-center gap-4 mt-4">
          <!-- 收藏按钮 -->
          <button
            @click="handleFavoriteClick"
            class="btn btn-ghost btn-circle"
            :aria-label="isFavorited ? '取消收藏' : '添加到收藏'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
                class="transition-colors"
                :class="{ 'fill-current text-red-500': isFavorited }"
              />
            </svg>
          </button>
          <button class="btn btn-primary" @click="handleBooking">
            {{ t('productDetail.bookNow') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import type { Product } from '@/types'
import router from '@/router'
import { useAuthStore } from '@/stores/auth.store'
import { useFavoriteStore } from '@/stores/favorite.store'
import { useProductStore } from '@/stores/product.store'
const { t } = useI18n()
const route = useRoute()
const productStore = useProductStore()
const favoriteStore = useFavoriteStore()
const authStore = useAuthStore()

const product = ref<Product | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

const productId = computed(() => Number(route.params.id))

const isFavorited = computed(() => {
  if (!product.value) return false
  return favoriteStore.favoriteProductIds.has(product.value.id)
})

async function handleFavoriteClick() {
  if (!product.value) return
  if (!authStore.isAuthenticated) {
    alert('请先登录才能收藏哦！')
    router.push('/login')
    return
  }
  await favoriteStore.toggleFavorite(product.value)
}

function handleBooking() {
  router.push({ name: 'Booking', query: { productId: productId.value } })
}

onMounted(async () => {
  isLoading.value = true
  error.value = null
  try {
    // 确保收藏列表已加载
    if (authStore.isAuthenticated && favoriteStore.favorites.length === 0) {
      await favoriteStore.fetchFavorites()
    }
    // 获取产品详情
    product.value = await productStore.fetchProductById(productId.value)
  } catch (err: any) {
    error.value = err.message || t('productDetail.fetchError')
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
