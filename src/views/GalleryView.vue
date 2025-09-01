<template>
  <div class="bg-gray-100 min-h-screen relative">
    <!-- 顶部填充块，为导航栏预留空间 -->
    <div class="h-[148px] md:h-[100px] lg:h-[100px]"></div>

    <!-- Banner -->
    <div class="relative h-[40vh] md:h-[50vh] overflow-hidden">
      <div
        class="absolute inset-0 bg-[url('https://placehold.co/1920x1080/DCC5AC/3A332A?text=Hanfu+Collection')] bg-cover bg-center"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-hanfu-dark-blue to-transparent opacity-60"
      ></div>
      <div class="absolute inset-0 flex items-center justify-center text-white text-center">
        <div class="p-4 md:p-8 rounded-lg animate-fade-in-up">
          <h1 class="text-3xl md:text-6xl font-display font-bold tracking-wide drop-shadow-md">
            {{ t('gallery.bannerTitle') }}
          </h1>
          <p class="mt-2 md:mt-4 text-sm md:text-xl opacity-90 drop-shadow-md">
            {{ t('gallery.bannerDesc') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Gallery Carousel Section -->
    <section class="w-full relative -top-8 z-10">
      <Swiper
        :modules="[Autoplay, EffectFade, Pagination]"
        :loop="true"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        effect="fade"
        class="w-full h-[50vh] md:h-[70vh] rounded-xl overflow-hidden shadow-2xl"
      >
        <SwiperSlide v-for="(slide, index) in gallerySlides" :key="index">
          <div class="relative w-full h-full">
            <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4"
            >
              <div>
                <h2 class="font-serif text-3xl font-bold tracking-wider text-white mb-2">
                  {{ slide.title }}
                </h2>
                <p class="text-md text-gray-200">{{ slide.description }}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>

    <!-- 过滤和排序栏 -->
    <div class="relative -top-8 z-10">
      <div
        class="max-w-screen-xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
      >
        <!-- 过滤选项 -->
        <div class="flex flex-wrap justify-center gap-2 md:gap-4">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="setFilter(filter.value)"
            class="px-4 py-2 rounded-full transition-colors duration-300 font-semibold text-sm md:text-base"
            :class="{
              'bg-[#C0392B] text-white shadow-md': activeFilter === filter.value,
              'bg-gray-200 text-gray-700 hover:bg-gray-300': activeFilter !== filter.value,
            }"
          >
            {{ t(filter.label) }}
          </button>
        </div>

        <!-- 排序选项 - 桌面端 -->
        <div class="hidden md:flex items-center space-x-2">
          <span class="text-sm font-medium text-gray-500">{{ t('gallery.sortBy') }}:</span>
          <select
            v-model="sortOption"
            class="rounded-full border border-gray-300 px-3 py-1 text-sm bg-white"
          >
            <option
              v-for="sort in sortOptions"
              :key="sort.value"
              :value="sort.value"
              class="text-gray-700"
            >
              {{ t(sort.label) }}
            </option>
          </select>
        </div>

        <!-- 排序选项 - 移动端 -->
        <button
          @click="showSortSheet = true"
          class="md:hidden w-full px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-300"
        >
          {{ t('gallery.sortBy') }}
        </button>
      </div>
    </div>

    <!-- 移动端排序底部弹窗 -->
    <div
      v-if="showSortSheet"
      class="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50"
      @click.self="showSortSheet = false"
    >
      <div
        class="w-full bg-white rounded-t-lg p-6 transform transition-transform duration-300 ease-out"
        :class="{ 'translate-y-0': showSortSheet, 'translate-y-full': !showSortSheet }"
      >
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

    <!-- 产品列表 -->
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

    <!-- 加载更多按钮 -->
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
import { ref, computed, watch, onMounted, type Directive } from 'vue'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import type { Product } from '@/types'
import { useApi } from '@/composables/useApi'
import { mockProducts } from '@/mocks/data/generators'

import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

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
    // 带参数请求
    const params = { page: 1, limit: 6, isActive: true }
    const data = await get<Product[]>('/products', { params })
    allProducts.value = data || []
  }
})

// 轮播图数据
const gallerySlides = ref([
  {
    image: '/images/gallery-banner/slide1.png',
    title: '东方雅韵',
    description: '精选历代汉服，品味传统之美',
  },
  {
    image: '/images/gallery-banner/slide1.png',
    title: '锦绣华裳',
    description: '每一件都是匠心独具的艺术品',
  },
  {
    image: '/images/gallery-banner/slide1.png',
    title: '古典情怀',
    description: '穿上汉服，穿越千年时光',
  },
  {
    image: '/images/gallery-banner/slide4.png',
    title: '惊鸿一瞥',
    description: '一瞬间的美丽，定格在古风之中',
  },
])

// 过滤和排序数据
const filters = [
  { value: 'all', label: 'gallery.filter.all' },
  { value: 'dress', label: 'gallery.filter.dress' },
  { value: 'set', label: 'gallery.filter.set' },
  { value: 'tang', label: 'gallery.filter.tang' },
  { value: 'song', label: 'gallery.filter.song' },
  { value: 'ming', label: 'gallery.filter.ming' },
  { value: 'accessories', label: 'gallery.filter.accessories' },
]

const sortOptions = [
  { value: 'newest', label: 'gallery.sort.newest' },
  { value: 'popular', label: 'gallery.sort.popular' },
  { value: 'price-asc', label: 'gallery.sort.priceAsc' },
  { value: 'price-desc', label: 'gallery.sort.priceDesc' },
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

// 检查是否还有更多产品可以加载
const hasMoreProducts = computed(() => {
  return visibleCount.value < filteredProducts.value.length
})

// 过滤和排序产品
const filteredProducts = computed(() => {
  let result = [...allProducts.value]

  // 过滤
  if (activeFilter.value !== 'all') {
    result = result.filter(
      (p) =>
        (p.tags && p.tags.includes(activeFilter.value)) ||
        p.dynasty === activeFilter.value ||
        p.category === activeFilter.value,
    )
  }

  return result
})

// 排序
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

// 分页
const paginatedProducts = computed(() => sortedProducts.value.slice(0, visibleCount.value))

// 监听路由变化来同步状态
watch(
  () => route.query,
  (newQuery) => {
    activeFilter.value = (newQuery.filter as string) || 'all'
    sortOption.value = (newQuery.sort as string) || 'newest'
  },
  { immediate: true },
)

// 移动端排序选择
const showSortSheet = ref(false)
const selectSort = (val: string) => {
  sortOption.value = val
  router.push({ query: { ...route.query, sort: val } })
  showSortSheet.value = false
}

// 自定义指令：用于元素进入视口时添加动画
const vObserveAnimation: Directive<HTMLElement, string> = {
  mounted(el, binding) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animationClass = binding.value || 'animate-fade-in-up'
            el.classList.add('opacity-100', animationClass)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.15 },
    )
    el.classList.add('opacity-0', 'transition-opacity', 'duration-1000', 'ease-out')
    observer.observe(el)
  },
}
</script>

<style scoped>
/* 定义各种动画效果 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fadeInDown 1s ease-out forwards;
}

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
  transform: translateY(30px);
  animation: fadeInUp 1s ease-out forwards;
}
</style>
