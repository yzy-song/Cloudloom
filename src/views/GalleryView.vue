<template>
  <div class="bg-gray-100 min-h-screen relative">
    <div class="h-[148px] md:h-[100px] lg:h-[100px]"></div>

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
        :autoplay="{
          delay: 1,
          disableOnInteraction: false,
          reverseDirection: false,
        }"
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

    <section class="w-full py-12 md:py-16">
      <div class="max-w-screen-xl mx-auto px-4">
        <Swiper
          :modules="[Autoplay, EffectCreative, Pagination]"
          :loop="true"
          :autoplay="{ delay: 5000, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          :grab-cursor="true"
          :effect="'creative'"
          :creative-effect="{
            prev: {
              shadow: true,
              translate: ['-120%', 0, -500],
            },
            next: {
              shadow: true,
              translate: ['120%', 0, -500],
            },
          }"
          class="w-full h-[50vh] md:h-[70vh] rounded-xl overflow-hidden shadow-2xl"
        >
          <SwiperSlide v-for="(slide, index) in gallerySlides" :key="index">
            <div class="relative w-full h-full">
              <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-start p-8 md:p-12 text-left"
              >
                <div>
                  <h2
                    class="font-serif text-3xl md:text-5xl font-bold tracking-wider text-white mb-2 animate-fade-in-up"
                  >
                    {{ slide.title }}
                  </h2>
                  <p
                    class="text-md md:text-lg text-gray-200 animate-fade-in-up animation-delay-300"
                  >
                    {{ slide.description }}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>

    <div class="sticky top-[100px] z-20">
      <div class="max-w-screen-xl mx-auto bg-white/80 backdrop-blur-sm p-4 rounded-b-lg shadow-lg">
        <div class="hidden md:flex justify-between items-center">
          <div class="flex flex-wrap justify-center gap-2 md:gap-4">
            <button
              v-for="filter in filters"
              :key="filter.value"
              @click="setFilter(filter.value)"
              class="px-4 py-2 rounded-full transition-colors duration-300 font-semibold text-sm"
              :class="{
                'bg-[#C0392B] text-white shadow-md': activeFilter === filter.value,
                'bg-gray-200 text-gray-700 hover:bg-gray-300': activeFilter !== filter.value,
              }"
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
          >
            {{ t('gallery.filterAndSort') }}
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showMobileSheet"
      class="fixed inset-0 z-50 flex items-end bg-black bg-opacity-60"
      @click.self="showMobileSheet = false"
    >
      <div
        class="w-full bg-white rounded-t-2xl p-6 transform transition-transform duration-300 ease-out"
        :class="{ 'translate-y-0': showMobileSheet, 'translate-y-full': !showMobileSheet }"
      >
        <h3 class="text-xl font-semibold mb-4">{{ t('gallery.filterTitle') }}</h3>
        <div class="flex flex-wrap gap-2 mb-6">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="selectFilter(filter.value)"
            class="px-4 py-2 rounded-full text-sm font-medium"
            :class="{
              'bg-[#C0392B] text-white': activeFilter === filter.value,
              'bg-gray-100 text-gray-800': activeFilter !== filter.value,
            }"
          >
            {{ t(filter.label) }}
          </button>
        </div>
        <h3 class="text-xl font-semibold mb-4">{{ t('gallery.sortBy') }}</h3>
        <ul class="space-y-2">
          <li v-for="sort in sortOptions" :key="sort.value">
            <button
              @click="selectSort(sort.value)"
              class="w-full text-left py-3 px-4 rounded-lg transition-colors duration-200"
              :class="{
                'bg-[#C0392B] text-white': sortOption === sort.value,
                'hover:bg-gray-100': sortOption !== sort.value,
              }"
            >
              {{ t(sort.label) }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="max-w-screen-xl mx-auto p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="product-card bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div class="relative pb-[125%] overflow-hidden">
          <img
            :src="product.images[0]"
            :alt="product.title"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div class="p-5 text-center">
          <h3 class="font-serif text-lg font-semibold text-gray-900 mb-1">
            {{ product.title }}
          </h3>
          <p class="text-sm text-gray-500 mb-2">{{ product.dynasty }}</p>
          <p class="text-lg font-bold text-[#C0392B]">
            {{ t('gallery.price', { price: product.price }) }}
          </p>
        </div>
      </div>
    </div>

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
import { Autoplay, Pagination, EffectCreative } from 'swiper/modules' // 引入 EffectCreative
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import type { Product } from '@/types'
import { useApi } from '@/composables/useApi'
import { mockProducts } from '@/mocks/data/generators'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-creative' // 引入 EffectCreative 的样式

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const { get, loading, error } = useApi()
const useMock = import.meta.env.VITE_ENABLE_MOCK === 'true'
const allProducts = ref<Product[]>([])

onMounted(async () => {
  if (useMock) {
    allProducts.value = mockProducts
  } else {
    const params = { page: 1, limit: 6, isActive: true }
    const data = await get<Product[]>('/products', { params })
    allProducts.value = data || []
  }
})

// 跑马灯图片数据
const marqueeImages = ref([
  { src: '/images/marquee/marquee01.png', alt: 'Elegant Tang Dynasty Hanfu' },
  { src: '/images/marquee/marquee02.png', alt: 'Graceful Song Dynasty Attire' },
  { src: '/images/marquee/marquee03.png', alt: 'Classic Ming Dynasty Robe' },
  { src: '/images/marquee/marquee04.png', alt: 'Hanfu with intricate embroidery' },
  { src: '/images/marquee/marquee05.png', alt: 'Flowing sleeves of a Hanfu' },
  { src: '/images/marquee/marquee06.png', alt: 'Children in traditional Hanfu' },
  { src: '/images/marquee/marquee07.png', alt: 'Hanfu accessories and details' },
])

// 轮播图数据 (可以保持不变)
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

// 过滤和排序数据 (保持不变)
const filters = [
  { value: 'all', label: 'gallery.filter.all' },
  { value: 'dress', label: 'gallery.filter.dress' },
  // ... 其他过滤项
]
const sortOptions = [
  { value: 'newest', label: 'gallery.sort.newest' },
  // ... 其他排序项
]

// 响应式状态
const activeFilter = ref((route.query.filter as string) || 'all')
const sortOption = ref((route.query.sort as string) || 'newest')
const visibleCount = ref(9)

// 设置过滤器，并更新路由
const setFilter = (filter: string) => {
  activeFilter.value = filter
  router.push({ query: { ...route.query, filter } })
}

// 加载更多产品
const loadMore = () => {
  visibleCount.value += 9
}

const hasMoreProducts = computed(() => {
  return visibleCount.value < filteredProducts.value.length
})

// 过滤和排序产品 (逻辑保持不变)
const filteredProducts = computed(() => {
  let result = [...allProducts.value]
  if (activeFilter.value !== 'all') {
    result = result.filter(
      (p) =>
        p.tags?.includes(activeFilter.value) ||
        p.dynasty === activeFilter.value ||
        p.category === activeFilter.value,
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

// 移动端排序和过滤选择
const showMobileSheet = ref(false)

const selectFilter = (val: string) => {
  activeFilter.value = val
  // 不需要关闭面板，让用户可以同时设置排序
}

const selectSort = (val: string) => {
  sortOption.value = val
  router.push({ query: { filter: activeFilter.value, sort: val } })
  showMobileSheet.value = false // 选择排序后关闭面板并应用
}

// 桌面端排序更新
const updateSort = () => {
  router.push({ query: { ...route.query, sort: sortOption.value } })
}

// 关于导航栏的说明：
// 导航栏文字颜色根据背景变化的功能，通常是在 App.vue 或你的主布局文件中实现的。
// 你需要在那里监听页面的滚动事件，并根据滚动距离来切换导航栏的 CSS 类。
// 示例逻辑 (请放在你的主布局组件中):
/*
const isScrolled = ref(false)
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

然后你的导航栏组件可以这样绑定 class:
<nav :class="{ 'bg-white/80 shadow-md text-gray-800': isScrolled, 'text-white': !isScrolled }">...</nav>
*/
</script>

<style scoped>
/* 新增：跑马灯样式 */
.marquee-swiper .swiper-wrapper {
  transition-timing-function: linear !important;
  -webkit-transition-timing-function: linear !important;
}
.marquee-slide {
  width: auto !important;
}

/* 动画效果 (可以保留或自定义) */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  opacity: 0; /* 初始状态 */
  animation: fadeInUp 0.8s ease-out forwards;
}
.animation-delay-300 {
  animation-delay: 300ms;
}
</style>
