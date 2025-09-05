<template>
  <div class="bg-gray-100 min-h-screen relative">
    <!-- Spacer for fixed navbar -->
    <div class="h-[100px]"></div>

    <!-- Marquee Banner -->
    <div
      class="w-full h-auto bg-gradient-to-r from-[#F5EFE6] to-[#E8DFCA] py-4 md:py-6 overflow-hidden"
      aria-label="Hanfu Inspirations Marquee"
    >
      <Swiper
        :modules="[Autoplay]"
        :slides-per-view="'auto'"
        :space-between="30"
        :loop="true"
        :free-mode="true"
        :speed="10000"
        :autoplay="{ delay: 1, disableOnInteraction: false, reverseDirection: false }"
        class="w-full marquee-swiper"
      >
        <SwiperSlide v-for="(img, index) in marqueeImages" :key="index" class="marquee-slide">
          <img
            :src="img.src"
            :alt="img.alt"
            class="h-24 md:h-32 rounded-lg object-cover shadow-lg transform transition-transform duration-300 hover:scale-110"
          />
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- Filter Bar -->
    <div
      :class="[
        'sticky top-[100px] z-20 transition-transform duration-300 ease-in-out',
        { '-translate-y-full': isScrollingDown && isScrolled },
      ]"
    >
      <div class="max-w-screen-xl mx-auto bg-white/80 backdrop-blur-sm p-4 rounded-b-lg shadow-lg">
        <div class="hidden md:flex justify-between items-center">
          <div class="flex flex-wrap justify-center gap-2 md:gap-4">
            <button
              v-for="filter in filters"
              :key="filter.value"
              @click="setFilter(filter.value)"
              :class="[
                'px-4 py-2 rounded-full transition-colors duration-300 font-semibold text-sm',
                activeFilter === filter.value
                  ? 'bg-[#C0392B] text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
              ]"
            >
              {{ t(filter.label) }}
            </button>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-gray-600">{{ t('gallery.sortBy') }}:</span>
            <select
              v-model="sortOption"
              class="rounded-full border-gray-300 focus:ring-[#C0392B] focus:border-[#C0392B] px-3 py-1 text-sm bg-white"
              @change="updateSort"
            >
              <option v-for="sort in sortOptions" :key="sort.value" :value="sort.value">
                {{ t(sort.label) }}
              </option>
            </select>
          </div>
        </div>
        <div class="md:hidden flex justify-center">
          <button
            @click="showMobileSheet = true"
            class="w-full max-w-sm px-4 py-3 rounded-full bg-gray-800 text-white font-semibold hover:bg-gray-900 transition-colors duration-300 shadow-lg"
          ></button>
        </div>
      </div>
    </div>

    <!-- Mobile Filter Sheet -->
    <div
      v-if="showMobileSheet"
      class="fixed inset-0 z-50 flex items-end bg-black bg-opacity-60"
      @click.self="showMobileSheet = false"
    >
      <div
        :class="[
          'w-full bg-white rounded-t-2xl p-6 transform transition-transform duration-300 ease-out',
          { 'translate-y-0': showMobileSheet, 'translate-y-full': !showMobileSheet },
        ]"
      >
        <h3 class="text-xl font-semibold mb-4">{{ t('gallery.filterTitle') }}</h3>
        <div class="flex flex-wrap gap-2 mb-6">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="selectFilter(filter.value)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium',
              activeFilter === filter.value
                ? 'bg-[#C0392B] text-white'
                : 'bg-gray-100 text-gray-800',
            ]"
          >
            {{ t(filter.label) }}
          </button>
        </div>
        <h3 class="text-xl font-semibold mb-4">{{ t('gallery.sortBy') }}</h3>
        <ul class="space-y-2">
          <li v-for="sort in sortOptions" :key="sort.value">
            <button
              @click="selectSort(sort.value)"
              :class="[
                'w-full text-left py-3 px-4 rounded-lg transition-colors duration-200',
                {
                  'bg-[#C0392B] text-white': sortOption === sort.value,
                  'hover:bg-gray-100': sortOption !== sort.value,
                },
              ]"
            >
              {{ t(sort.label) }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Product Grid -->
    <div
      class="max-w-screen-xl mx-auto p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      v-if="!loading && !error"
    >
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>

    <!-- Load More Button -->
    <div class="text-center py-10" v-if="hasMoreProducts">
      <button
        @click="loadMore"
        class="inline-block bg-[#C0392B] text-white font-semibold tracking-wider px-8 py-3 rounded-full text-lg hover:bg-[#a53125] transition-transform hover:scale-105 duration-300"
      >
        {{ t('gallery.loadMore') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Autoplay, Pagination, EffectCreative } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import type { Product } from '@/types'
import ProductCard from '@/components/ui/card/ProductCard.vue'
import { useApi } from '@/composables/useApi'
import { useScroll, useScrollDirection } from '@/composables/useScroll'
import { mockProducts } from '@/mocks/data/generators'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-creative'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { isScrolled } = useScroll(150)
const { isScrollingDown } = useScrollDirection()
const { get, loading, error } = useApi()
const useMock = import.meta.env.VITE_ENABLE_MOCK === 'true'
const allProducts = ref<Product[]>([])

onMounted(async () => {
  if (useMock) {
    allProducts.value = mockProducts
  } else {
    const params = { page: 1, limit: 12, isActive: true }
    const data = await get<Product[]>('/products', { params })
    allProducts.value = data || []
  }
})

const marqueeImages = ref([
  { src: '/images/marquee/marquee01.png', alt: 'Elegant Tang Dynasty Hanfu' },
  { src: '/images/marquee/marquee02.png', alt: 'Graceful Song Dynasty Attire' },
  { src: '/images/marquee/marquee03.png', alt: 'Classic Ming Dynasty Robe' },
  { src: '/images/marquee/marquee04.png', alt: 'Hanfu with intricate embroidery' },
  { src: '/images/marquee/marquee05.png', alt: 'Flowing sleeves of a Hanfu' },
  { src: '/images/marquee/marquee06.png', alt: 'Children in traditional Hanfu' },
  { src: '/images/marquee/marquee07.png', alt: 'Hanfu accessories and details' },
])

const gallerySlides = ref([
  {
    image: '/images/gallery-banner/slide1.png',
    title: '东方雅韵',
    description: '精选历代汉服，品味传统之美',
  },
  {
    image: '/images/gallery-banner/slide2.png',
    title: '锦绣华裳',
    description: '每一件都是匠心独具的艺术品',
  },
  {
    image: '/images/gallery-banner/slide3.png',
    title: '古典情怀',
    description: '穿上汉服，穿越千年时光',
  },
  {
    image: '/images/gallery-banner/slide4.png',
    title: '惊鸿一瞥',
    description: '一瞬间的美丽，定格在古风之中',
  },
])

const filters = [
  { value: 'all', label: 'gallery.filter.all' },
  { value: 'dress', label: 'gallery.filter.dress' },
]
const sortOptions = [{ value: 'newest', label: 'gallery.sort.newest' }]

const activeFilter = ref((route.query.filter as string) || 'all')
const sortOption = ref((route.query.sort as string) || 'newest')
const visibleCount = ref(9)

const setFilter = (filter: string) => {
  activeFilter.value = filter
  router.push({ query: { ...route.query, filter } })
}

const loadMore = () => {
  visibleCount.value += 9
}

const hasMoreProducts = computed(() => visibleCount.value < filteredProducts.value.length)

const filteredProducts = computed(() => {
  let result = [...allProducts.value]
  if (activeFilter.value !== 'all') {
    result = result.filter(
      (p) =>
        p.tags?.includes(activeFilter.value) ||
        p.dynasty === activeFilter.value ||
        p.subcategory?.name === activeFilter.value,
    )
  }
  return result
})

const sortedProducts = computed(() => {
  const result = [...filteredProducts.value]
  switch (sortOption.value) {
    case 'newest':
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case 'popular':
      result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
      break
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
  }
  return result
})

const paginatedProducts = computed(() => sortedProducts.value.slice(0, visibleCount.value))

watch(
  () => route.query,
  (newQuery) => {
    activeFilter.value = (newQuery.filter as string) || 'all'
    sortOption.value = (newQuery.sort as string) || 'newest'
  },
  { immediate: true },
)

const showMobileSheet = ref(false)

const selectFilter = (val: string) => {
  activeFilter.value = val
}

const selectSort = (val: string) => {
  sortOption.value = val
  router.push({ query: { filter: activeFilter.value, sort: val } })
  showMobileSheet.value = false
}

const updateSort = () => {
  router.push({ query: { ...route.query, sort: sortOption.value } })
}
</script>

<style scoped>
.marquee-swiper .swiper-wrapper {
  transition-timing-function: linear !important;
}
.marquee-slide {
  width: auto !important;
}
</style>
