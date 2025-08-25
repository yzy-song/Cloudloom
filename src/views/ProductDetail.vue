<template>
  <div class="bg-white relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- 图片展示 -->
        <div>
          <!-- 主图 -->
          <div
            class="relative overflow-hidden rounded-2xl aspect-[3/4]"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
          >
            <img
              v-if="product?.images && product.images.length > 0"
              :src="product.images[activeImage]"
              :alt="product.title"
              class="w-full aspect-[3/4] object-cover rounded-2xl"
            />
            <div
              v-else
              class="bg-gray-200 border-2 border-dashed rounded-2xl aspect-[3/4] w-full"
            />

            <!-- 导航箭头 -->
            <button
              v-if="product?.images && product.images.length > 1"
              @click="prevImage"
              class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              v-if="product?.images && product.images.length > 1"
              @click="nextImage"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <!-- 缩略图 -->
          <div
            v-if="product?.images && product.images.length > 1"
            class="mt-6 grid grid-cols-4 gap-4"
          >
            <img
              v-for="(image, index) in product.images"
              :key="index"
              :src="image"
              :alt="`${product.title} - 图片 ${index + 1}`"
              class="w-full aspect-square object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
              :class="{ 'ring-2 ring-hanfu-red': activeImage === index }"
              @click="activeImage = index"
            />
          </div>
          <div v-else class="mt-6 grid grid-cols-4 gap-4">
            <div
              v-for="n in 4"
              :key="n"
              class="bg-gray-200 border-2 border-dashed rounded-xl aspect-square cursor-pointer hover:opacity-80 transition-opacity"
              :class="{ 'ring-2 ring-hanfu-red': activeImage === n - 1 }"
              @click="activeImage = n - 1"
            />
          </div>
        </div>
        <!-- 产品信息 -->
        <div>
          <div class="sticky top-24">
            <div>
              <span
                v-if="product"
                class="inline-block px-3 py-1 bg-hanfu-blue/10 text-hanfu-blue rounded-full text-sm"
              >
                {{ product.dynasty }}代汉服
              </span>
              <h1 class="mt-4 text-3xl md:text-4xl font-display text-gray-900">
                {{ product?.title }}
              </h1>

              <div class="mt-6 flex items-center">
                <div class="flex text-yellow-400">
                  <StarIcon v-for="i in 5" :key="i" class="h-5 w-5 fill-current" />
                </div>
                <span class="ml-2 text-gray-600">({{ product?.reviews }} 条评价)</span>
              </div>

              <p class="mt-6 text-xl text-hanfu-red font-medium">
                €{{ product?.price.toFixed(2) }}
              </p>

              <div class="mt-8 space-y-6">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">产品描述</h3>
                  <p class="mt-2 text-gray-600">
                    {{ product?.description }}
                  </p>
                </div>

                <div>
                  <h3 class="text-lg font-medium text-gray-900">工艺细节</h3>
                  <ul class="mt-2 text-gray-600 space-y-2">
                    <li
                      v-for="(detail, index) in product?.details"
                      :key="index"
                      class="flex items-start"
                    >
                      <CheckCircleIcon class="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{{ detail }}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-medium text-gray-900">尺寸选择</h3>
                  <div class="mt-3 flex flex-wrap gap-3">
                    <button
                      v-for="size in product?.sizeOptions"
                      :key="size"
                      :class="[
                        'w-14 h-14 rounded-full flex items-center justify-center border-2 transition',
                        selectedSize === size
                          ? 'border-hanfu-red text-hanfu-red'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400',
                      ]"
                      @click="selectedSize = size"
                    >
                      {{ size }}
                    </button>
                  </div>
                </div>

                <div class="flex flex-wrap gap-4">
                  <button
                    class="flex-1 btn-primary py-4 hover:scale-[1.02] transition-transform"
                    @click="bookExperience"
                  >
                    立即预约体验
                  </button>
                  <button
                    class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    @click="toggleFavorite"
                  >
                    <HeartIcon
                      :class="[
                        'h-6 w-6 transition-colors',
                        isFavorite ? 'text-hanfu-red fill-current' : 'text-gray-600',
                      ]"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="mt-24">
        <h2 class="text-2xl font-display text-gray-900 mb-8">相关推荐</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="related in relatedProducts"
            :key="related.id"
            :product="related"
            @click="navigateToProduct(related.id)"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import { StarIcon, HeartIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

import ProductCard from '@/components/ui/card/ProductCard.vue'
import { useApi } from '@/composables/useApi'
import { useFavoriteStore } from '@/stores/favorite.store'
import { type Product } from '@/types'

const { get } = useApi()
const product = ref<Product | null>(null)
const relatedProducts = ref<Product[]>([])
const loading = ref(true)
const router = useRouter()
const favoritesStore = useFavoriteStore()

const props = defineProps<{
  id: string
}>()

const currentId = ref(props.id)

const selectedSize = ref('M')
const activeImage = ref(0)
const isFavorite = computed(() => favoritesStore.isFavorite(props.id))

const route = useRoute()
// 监听路由参数变化
watch(
  () => route.params.id,
  async (newId) => {
    if (newId && newId !== currentId.value) {
      loading.value = true
      try {
        await Promise.all([fetchProduct(), fetchRelatedProducts()])
      } catch (error) {
        console.error('Failed to fetch product data:', error)
      } finally {
        loading.value = false
      }
    }
  },
)

const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  if (!touchStartX.value || !touchEndX.value) return

  const diff = touchStartX.value - touchEndX.value
  const minSwipeDistance = 50 // 最小滑动距离

  if (Math.abs(diff) > minSwipeDistance) {
    if (diff > 0) {
      nextImage() // 向左滑动，下一张
    } else {
      prevImage() // 向右滑动，上一张
    }
  }

  // 重置触摸数据
  touchStartX.value = 0
  touchEndX.value = 0
}

const nextImage = () => {
  if (product.value?.images) {
    activeImage.value = (activeImage.value + 1) % product.value.images.length
  }
}

const prevImage = () => {
  if (product.value?.images) {
    activeImage.value =
      (activeImage.value - 1 + product.value.images.length) % product.value.images.length
  }
}
// 获取产品详情
const fetchProduct = async () => {
  const data = await get<Product>(`/products/${props.id}`)
  if (data) {
    product.value = data
  }
}
// 获取相关产品
const fetchRelatedProducts = async () => {
  const data = await get<Product[]>(`/products/${props.id}/related`)
  if (data) {
    relatedProducts.value = data
  }
}

// 添加到收藏
function toggleFavorite() {
  favoritesStore.toggleFavorite(props.id)
}

// 预约体验
function bookExperience() {
  router.push({
    path: '/booking',
    query: {
      productId: props.id,
      size: selectedSize.value,
    },
  })
}

// 导航到产品详情
function navigateToProduct(id: number) {
  router.push(`/product/${id}`)
}

// 初始化数据
onMounted(async () => {
  try {
    await Promise.all([fetchProduct(), fetchRelatedProducts()])
  } catch (error) {
    console.error('Failed to fetch product data:', error)
  } finally {
    loading.value = false
  }
})
</script>
