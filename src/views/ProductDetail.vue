<template>
  <div class="bg-white">
    <!-- Spacer for the fixed navbar -->
    <div class="h-[100px]"></div>

    <main class="max-w-screen-xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb Navigation -->
      <nav v-if="product" class="text-sm mb-8" aria-label="Breadcrumb">
        <ol class="list-none p-0 inline-flex space-x-2 text-gray-500">
          <li><router-link to="/" class="hover:text-[#C0392B]">首页</router-link></li>
          <li><span>/</span></li>
          <li><router-link to="/gallery" class="hover:text-[#C0392B]">汉服展示</router-link></li>
          <li><span>/</span></li>
          <!-- Display subcategory name if available -->
          <li v-if="product.subcategory">
            <span>{{ product.subcategory.name }}</span>
            <span>/</span>
          </li>
          <li class="font-medium text-gray-800">{{ product.title }}</li>
        </ol>
      </nav>

      <!-- Loading Skeleton (Uses 'loading' from Pinia Store) -->
      <div v-if="productStore.loading" class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div class="animate-pulse">
          <div class="bg-gray-200 rounded-lg aspect-[3/4]"></div>
          <div class="mt-4 grid grid-cols-5 gap-3">
            <div v-for="i in 5" :key="i" class="bg-gray-200 rounded-md aspect-square"></div>
          </div>
        </div>
        <div class="animate-pulse">
          <div class="h-6 w-1/4 bg-gray-200 rounded"></div>
          <div class="h-12 w-3/4 bg-gray-200 rounded mt-4"></div>
          <div class="h-10 w-1/3 bg-gray-200 rounded mt-4"></div>
          <div class="h-20 w-full bg-gray-200 rounded mt-6"></div>
          <div class="h-14 w-full bg-gray-200 rounded mt-8"></div>
        </div>
      </div>

      <!-- Product Content -->
      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <!-- Image Gallery -->
        <div>
          <div class="sticky top-28">
            <div class="relative overflow-hidden rounded-lg shadow-lg aspect-[3/4]">
              <img
                v-if="product.images && product.images.length > 0"
                :src="product.images[activeImage]"
                :alt="product.title"
                class="w-full h-full object-cover transition-opacity duration-300"
                :key="activeImage"
                @error="
                  ($event.target as HTMLImageElement).src =
                    'https://placehold.co/600x800/f8f8f8/ccc?text=Image'
                "
              />
              <div v-else class="w-full h-full bg-gray-100 flex items-center justify-center">
                <span class="text-gray-500">暂无图片</span>
              </div>
            </div>
            <div
              v-if="product.images && product.images.length > 1"
              class="mt-4 grid grid-cols-5 gap-3"
            >
              <img
                v-for="(image, index) in product.images"
                :key="index"
                :src="image"
                :alt="`${product.title} - thumbnail ${index + 1}`"
                @click="activeImage = index"
                :class="[
                  'w-full aspect-square object-cover rounded-md cursor-pointer transition-all duration-200',
                  activeImage === index
                    ? 'ring-2 ring-offset-2 ring-[#C0392B]'
                    : 'hover:opacity-80',
                ]"
                @error="
                  ($event.target as HTMLImageElement).src =
                    'https://placehold.co/100x100/f8f8f8/ccc?text=Image'
                "
              />
            </div>
          </div>
        </div>

        <!-- Product Information -->
        <div>
          <span
            class="inline-block px-3 py-1 bg-red-100 text-[#C0392B] rounded-full text-sm font-semibold"
          >
            {{ product.dynasty }}
          </span>
          <h1 class="mt-4 text-4xl md:text-5xl font-bold font-serif text-gray-900">
            {{ product.title }}
          </h1>
          <p class="mt-4 text-3xl font-semibold text-gray-800">€{{ product.price.toFixed(2) }}</p>

          <div class="mt-4 flex items-center">
            <div class="flex text-yellow-400">
              <StarIcon v-for="i in 5" :key="i" class="h-5 w-5 fill-current" />
            </div>
            <a href="#reviews" class="ml-3 text-sm font-medium text-gray-600 hover:text-gray-900">
              {{ product.reviews }} reviews
            </a>
          </div>

          <p class="mt-6 text-base text-gray-700 leading-relaxed">
            {{ product.description }}
          </p>

          <div v-if="product.sizeOptions && product.sizeOptions.length > 0" class="mt-8">
            <h3 class="text-lg font-medium text-gray-900">尺寸选择</h3>
            <div class="mt-3 flex flex-wrap gap-3">
              <button
                v-for="size in product.sizeOptions"
                :key="size"
                :class="[
                  'w-14 h-14 rounded-full flex items-center justify-center border-2 transition font-semibold',
                  selectedSize === size
                    ? 'border-[#C0392B] bg-red-50 text-[#C0392B]'
                    : 'border-gray-300 text-gray-700 hover:border-gray-500',
                ]"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <div class="mt-8 flex gap-4">
            <button class="flex-1 btn-primary py-4 text-lg">立即预约体验</button>
            <button class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <HeartIcon class="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div class="mt-10 border-t border-gray-200 pt-6 space-y-4">
            <div
              v-for="(item, index) in accordionItems"
              :key="index"
              class="border-b border-gray-200 pb-4"
            >
              <button
                @click="toggleAccordion(index)"
                class="w-full flex justify-between items-center text-left"
              >
                <h3 class="text-lg font-medium text-gray-900">{{ item.title }}</h3>
                <ChevronUpIcon
                  :class="[
                    'w-6 h-6 text-gray-500 transition-transform',
                    activeAccordion !== index && 'rotate-180',
                  ]"
                />
              </button>
              <transition
                enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-200 ease-in"
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
      <div v-else-if="productStore.error || !product" class="text-center py-20">
        <h2 class="text-2xl font-semibold text-gray-700">未能加载商品详情</h2>
        <p class="text-gray-500 mt-2">
          {{ productStore.error || '很抱歉，我们找不到您要的商品。请稍后重试或返回商品列表。' }}
        </p>
        <router-link to="/gallery" class="mt-6 inline-block btn-primary">返回商品列表</router-link>
      </div>

      <!-- Other sections remain the same -->
      <section id="reviews" class="mt-24 py-16 border-t border-gray-200">
        <h2 class="text-3xl font-bold font-serif text-gray-900 mb-8">客户评价</h2>
      </section>
      <section class="mt-16">
        <h2 class="text-3xl font-bold font-serif text-gray-900 mb-8">相关推荐</h2>
      </section>
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

// Use storeToRefs to make state and getters reactive in the component.
// We get 'currentProduct' and rename it to 'product' for easier use in the template.
const { currentProduct: product, loading, error } = storeToRefs(productStore)

const activeImage = ref(0)
const selectedSize = ref('')
const activeAccordion = ref<number | null>(0)

// Watch for changes in the route parameter 'id' to fetch new product data.
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      // Dispatch the action from the store.
      productStore.fetchProductById(newId as string)
      activeImage.value = 0 // Reset main image on new product
    }
  },
  { immediate: true },
)

// Computed property to generate items for the accordion section.
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
