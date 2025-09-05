<template>
  <div class="bg-white">
    <!-- Spacer for the fixed navbar -->
    <div class="h-20 md:h-24"></div>

    <main class="max-w-screen-xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <!-- Loading Skeleton (Uses 'loading' from Pinia Store) -->
      <div v-if="productStore.loading" class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div class="animate-pulse">
          <div class="bg-gray-200 rounded-lg aspect-[3/4]"></div>
          <div class="mt-4 grid grid-cols-5 gap-4">
            <div v-for="i in 5" :key="i" class="bg-gray-200 rounded-md aspect-square"></div>
          </div>
        </div>
        <div class="animate-pulse space-y-6">
          <div class="h-6 w-1/4 bg-gray-200 rounded"></div>
          <div class="h-12 w-3/4 bg-gray-200 rounded"></div>
          <div class="h-10 w-1/3 bg-gray-200 rounded"></div>
          <div class="h-20 w-full bg-gray-200 rounded"></div>
          <div class="h-14 w-full bg-gray-200 rounded mt-4"></div>
        </div>
      </div>

      <!-- Product Content -->
      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <!-- 美化后的图片画廊 -->
        <div class="sticky top-28">
          <!-- 主图区域，增加了平滑的淡入淡出过渡效果 -->
          <div class="relative overflow-hidden rounded-xl shadow-lg aspect-[3/4] bg-gray-100 mb-4">
            <transition name="fade" mode="out-in">
              <img
                v-if="product.images && product.images.length > 0"
                :src="product.images[activeImage]"
                :alt="product.title"
                class="w-full h-full object-cover"
                :key="activeImage"
                @error="
                  ($event.target as HTMLImageElement).src =
                    'https://placehold.co/600x800/f8f8f8/ccc?text=Image'
                "
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <span class="text-gray-500">暂无图片</span>
              </div>
            </transition>
          </div>
          <!-- 缩略图列表 -->
          <div v-if="product.images && product.images.length > 1" class="grid grid-cols-5 gap-4">
            <div
              v-for="(image, index) in product.images"
              :key="index"
              @click="activeImage = index"
              class="aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200"
              :class="[
                activeImage === index
                  ? 'border-[#C0392B]'
                  : 'border-transparent hover:border-gray-300',
              ]"
            >
              <img
                :src="image"
                :alt="`${product.title} - thumbnail ${index + 1}`"
                class="w-full h-full object-cover"
                @error="
                  ($event.target as HTMLImageElement).src =
                    'https://placehold.co/100x100/f8f8f8/ccc?text=Image'
                "
              />
            </div>
          </div>
        </div>

        <!-- 商品信息区域 -->
        <div>
          <!-- 面包屑导航 -->
          <nav class="text-sm mb-4" aria-label="Breadcrumb">
            <ol class="list-none p-0 inline-flex space-x-2 text-gray-500">
              <li><router-link to="/" class="hover:text-[#C0392B]">首页</router-link></li>
              <li><span>/</span></li>
              <li v-if="product.subcategory">
                <a href="#" class="hover:text-[#C0392B]">{{ product.subcategory.name }}</a>
                <span>/</span>
              </li>
              <li class="font-medium text-gray-800 truncate">{{ product.title }}</li>
            </ol>
          </nav>

          <span
            class="inline-block px-3 py-1 bg-red-100 text-[#C0392B] rounded-full text-sm font-semibold"
          >
            {{ product.dynasty }}
          </span>
          <h1 class="mt-3 text-4xl md:text-5xl font-bold font-serif text-gray-900">
            {{ product.title }}
          </h1>
          <p class="mt-3 text-3xl font-semibold text-gray-800">€{{ product.price.toFixed(2) }}</p>

          <div class="mt-4 flex items-center">
            <div class="flex text-yellow-400">
              <StarIcon v-for="i in 5" :key="i" class="h-5 w-5 fill-current" />
            </div>
            <a href="#reviews" class="ml-3 text-sm font-medium text-gray-600 hover:text-gray-900">
              {{ product.reviews }} reviews
            </a>
          </div>

          <p class="mt-6 text-base text-gray-700 leading-relaxed prose">
            {{ product.description }}
          </p>

          <div v-if="product.sizeOptions && product.sizeOptions.length > 0" class="mt-8">
            <h3 class="text-lg font-medium text-gray-900 mb-3">尺寸选择</h3>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="size in product.sizeOptions"
                :key="size"
                @click="selectedSize = size"
                :class="[
                  'w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-200 font-semibold transform hover:scale-105',
                  selectedSize === size
                    ? 'border-[#C0392B] bg-red-50 text-[#C0392B] shadow-md'
                    : 'border-gray-300 text-gray-700 hover:border-gray-500',
                ]"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <div class="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              class="flex-1 btn-primary py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              立即预约体验
            </button>
            <button
              class="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <HeartIcon class="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div class="mt-10 space-y-4">
            <div
              v-for="(item, index) in accordionItems"
              :key="index"
              class="border-t border-gray-200 pt-4"
            >
              <button
                @click="toggleAccordion(index)"
                class="w-full flex justify-between items-center text-left"
              >
                <h3 class="text-lg font-medium text-gray-900">{{ item.title }}</h3>
                <ChevronUpIcon
                  :class="[
                    'w-6 h-6 text-gray-500 transition-transform duration-300',
                    activeAccordion !== index && 'rotate-180',
                  ]"
                />
              </button>
              <transition
                enter-active-class="transition-all duration-300 ease-out overflow-hidden"
                leave-active-class="transition-all duration-200 ease-in overflow-hidden"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-96 opacity-100"
                leave-from-class="max-h-96 opacity-100"
                leave-to-class="max-h-0 opacity-0"
              >
                <div v-if="activeAccordion === index" class="pt-4 prose prose-sm text-gray-600">
                  <ul>
                    <li v-for="detail in item.details" :key="detail">{{ detail }}</li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>

      <!-- Error and Not Found Message -->
      <div v-else-if="productStore.error" class="text-center py-20">
        <h2 class="text-2xl font-semibold text-gray-700">未能加载商品详情</h2>
        <p class="text-gray-500 mt-2">{{ productStore.error }}</p>
        <router-link to="/gallery" class="mt-6 inline-block btn-primary">返回商品列表</router-link>
      </div>

      <!-- ... 其他部分保持不变 ... -->
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { StarIcon, HeartIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import type { ProductDetailItem } from '@/types'
import { useProductStore } from '@/stores/product.store'

const route = useRoute()
const productStore = useProductStore()
const { currentProduct: product, loading, error } = storeToRefs(productStore)

const activeImage = ref(0)
const selectedSize = ref('')
const activeAccordion = ref<number | null>(0)

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      productStore.fetchProductById(newId as string)
      activeImage.value = 0
    }
  },
  { immediate: true },
)

const accordionItems = computed(() => {
  if (!product.value) return []
  const items = []
  if (
    product.value.details &&
    Array.isArray(product.value.details) &&
    product.value.details.length > 0
  ) {
    const detailsList = (product.value.details as ProductDetailItem[]).map(
      (d) => `${d.key}: ${d.value}`,
    )
    items.push({ title: '工艺细节', details: detailsList })
  }
  if (product.value.material) {
    items.push({
      title: '材质与保养',
      details: [
        `面料: ${product.value.material}`,
        product.value.careInstructions || '建议干洗，避免暴晒',
      ],
    })
  }
  items.push({
    title: '配送信息',
    details: ['都柏林地区次日达', '全爱尔兰境内3-5个工作日送达', '支持国际配送'],
  })
  return items
})

const toggleAccordion = (index: number) => {
  activeAccordion.value = activeAccordion.value === index ? null : index
}
</script>

<style>
/* 为主图切换增加平滑的淡入淡出效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
