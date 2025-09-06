<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="flex justify-center items-center h-96">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>

    <!-- 产品详情 -->
    <div v-else-if="product" class="space-y-8">
      <!-- 面包屑导航 -->
      <div class="text-sm breadcrumbs">
        <ul>
          <li v-for="(crumb, index) in breadcrumbs" :key="index">
            <router-link v-if="crumb.link" :to="crumb.link" class="link link-hover">{{
              crumb.name
            }}</router-link>
            <span v-else>{{ crumb.name }}</span>
          </li>
        </ul>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- 左侧：图片廊 -->
        <div class="flex flex-col gap-4">
          <figure class="border rounded-lg overflow-hidden aspect-square">
            <img
              :src="product.images[selectedImageIndex]"
              :alt="product.title"
              class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </figure>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              @click="selectedImageIndex = index"
              class="aspect-square border rounded-md overflow-hidden transition-all"
              :class="{
                'ring-2 ring-primary ring-offset-2': selectedImageIndex === index,
                'opacity-60 hover:opacity-100': selectedImageIndex !== index,
              }"
            >
              <img
                :src="image"
                :alt="`${product.title} thumbnail ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- 右侧：产品信息和操作 -->
        <div class="flex flex-col gap-4">
          <h1 class="text-3xl lg:text-4xl font-bold">{{ product.title }}</h1>

          <div class="flex flex-wrap items-center gap-2">
            <span class="badge badge-primary">{{ categoryName }}</span>
            <span class="badge badge-secondary">{{ product.subcategory.name }}</span>
            <span v-for="tag in product.tags" :key="tag" class="badge badge-outline">{{
              tag
            }}</span>
          </div>

          <p class="text-base-content/80 leading-relaxed">{{ product.description }}</p>

          <div class="text-3xl font-semibold text-primary">¥{{ product.price.toFixed(2) }}</div>

          <!-- 操作区域 -->
          <div class="card bg-base-200/50 p-4 rounded-lg space-y-4">
            <div v-if="product.stockQuantity > 0">
              <div class="flex items-center justify-between">
                <span class="font-medium">数量</span>
                <div class="join">
                  <button @click="quantity > 1 && quantity--" class="btn join-item btn-sm">
                    -
                  </button>
                  <input
                    type="text"
                    class="input input-sm join-item w-12 text-center"
                    :value="quantity"
                    readonly
                  />
                  <button
                    @click="quantity < product.stockQuantity && quantity++"
                    class="btn join-item btn-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              <div class="text-sm text-base-content/60 mt-1">
                库存: {{ product.stockQuantity }} 件
              </div>
            </div>
            <div class="flex items-center gap-4">
              <button
                class="btn btn-primary flex-grow"
                @click="handleBooking"
                :disabled="product.stockQuantity === 0"
              >
                {{ product.stockQuantity > 0 ? t('productDetail.bookNow') : '已售罄' }}
              </button>
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
            </div>
          </div>
        </div>
      </div>

      <!-- 详细信息选项卡 -->
      <div role="tablist" class="tabs tabs-lifted">
        <input
          type="radio"
          name="detail_tabs"
          role="tab"
          class="tab"
          aria-label="商品详情"
          checked
        />
        <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <div class="prose max-w-none">
            <h3 class="font-bold">核心信息</h3>
            <ul class="list-disc pl-5">
              <li v-if="product.dynasty"><strong>朝代:</strong> {{ product.dynasty }}</li>
              <li v-if="product.material"><strong>材质:</strong> {{ product.material }}</li>
            </ul>
            <h3 class="font-bold mt-4">规格参数</h3>
            <div class="overflow-x-auto">
              <table class="table w-full">
                <tbody>
                  <tr v-for="detail in product.details" :key="detail.key">
                    <th class="w-1/3">{{ detail.key }}</th>
                    <td>{{ detail.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <input type="radio" name="detail_tabs" role="tab" class="tab" aria-label="保养说明" />
        <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <p>{{ product.careInstructions || '暂无保养说明。' }}</p>
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
import { useCategoriesStore } from '@/stores/categories.store'
import { useFavoriteStore } from '@/stores/favorite.store'
import { useProductStore } from '@/stores/product.store'

const { t } = useI18n()
const route = useRoute()
const productStore = useProductStore()
const favoriteStore = useFavoriteStore()
const authStore = useAuthStore()
const categoriesStore = useCategoriesStore()

const product = ref<Product | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

// 新增：用于图片廊和数量选择
const selectedImageIndex = ref(0)
const quantity = ref(1)

const productId = computed(() => Number(route.params.id))

const categoryName = computed(() => {
  if (!product.value || categoriesStore.categories.length === 0) return ''
  for (const category of categoriesStore.categories) {
    if (
      Array.isArray(category.subcategories) &&
      category.subcategories.some((sub) => sub.id === product.value?.subcategoryId)
    ) {
      return category.name
    }
  }
  return ''
})

// 新增：用于面包屑导航
const breadcrumbs = computed(() => {
  if (!product.value) return []
  return [
    { name: '首页', link: '/' },
    { name: categoryName.value, link: `/gallery?category=${categoryName.value}` },
    {
      name: product.value.subcategory.name,
      link: `/gallery?subcategory=${product.value.subcategory.name}`,
    },
    { name: product.value.title },
  ]
})

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
  // 未来可以传递 quantity.value
  router.push({ name: 'Booking', query: { productId: productId.value, quantity: quantity.value } })
}

onMounted(async () => {
  isLoading.value = true
  error.value = null
  try {
    if (authStore.isAuthenticated && favoriteStore.favorites.length === 0) {
      await favoriteStore.fetchFavorites()
    }
    product.value = await productStore.fetchProductById(productId.value)
  } catch (err: any) {
    error.value = err.message || t('productDetail.fetchError')
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
