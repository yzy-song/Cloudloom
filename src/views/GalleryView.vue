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

    <!-- 过滤和排序栏 -->
    <div class="relative -top-8 z-10">
      <div class="bg-white rounded-3xl shadow-lg mx-4 md:mx-auto max-w-7xl px-6 py-4">
        <div
          class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-8"
        >
          <!-- 过滤器 -->
          <div class="flex flex-wrap gap-2 justify-center md:justify-start">
            <button
              v-for="(filter, index) in filters"
              :key="index"
              :class="[
                'px-4 py-2 text-sm rounded-full transition-all duration-300 transform',
                activeFilter === filter.value
                  ? 'bg-hanfu-red text-white shadow-md scale-105'
                  : 'bg-gray-200 text-gray-700 hover:bg-hanfu-red/20 hover:text-hanfu-red hover:scale-105',
              ]"
              @click="setFilter(filter.value)"
            >
              {{ t(filter.label) }}
            </button>
          </div>

          <!-- 排序 -->
          <div class="relative w-full md:w-auto">
            <select
              v-model="sortOption"
              @change="updateQuery"
              class="block w-full px-4 py-2 pr-8 rounded-full bg-gray-200 text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-hanfu-red transition-shadow cursor-pointer"
            >
              <option value="newest">{{ t('gallery.sort.newest') }}</option>
              <option value="popular">{{ t('gallery.sort.popular') }}</option>
              <option value="price-asc">{{ t('gallery.sort.priceAsc') }}</option>
              <option value="price-desc">{{ t('gallery.sort.priceDesc') }}</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 产品画廊网格 -->
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <router-link
        v-for="product in paginatedProducts"
        :key="product.id"
        :to="{ name: 'ProductDetail', params: { id: product.id } }"
        class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group relative cursor-pointer block"
      >
        <div class="relative pb-[125%] overflow-hidden">
          <img
            :src="product.images[0]"
            :alt="product.title"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div
            class="absolute top-4 right-4 bg-hanfu-red text-white text-xs font-semibold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {{ product.dynasty }}
          </div>
        </div>
        <div class="p-6 relative z-10">
          <h3 class="text-xl font-semibold text-gray-900 line-clamp-1">{{ product.title }}</h3>
          <p class="mt-1 text-sm text-gray-500 line-clamp-2">
            {{ product.description }}
          </p>
          <div class="mt-4 flex justify-between items-center">
            <span class="text-lg font-bold text-hanfu-red">{{ formatPrice(product.price) }}</span>
            <button
              class="px-4 py-2 bg-hanfu-red text-white rounded-full text-sm font-semibold shadow-md hover:bg-hanfu-red/90 transition-colors transform hover:-translate-y-0.5"
            >
              {{ t('gallery.addToCart') }}
            </button>
          </div>
        </div>
      </router-link>
    </div>

    <!-- 加载更多按钮 -->
    <div v-if="hasMore" class="text-center py-8">
      <button
        @click="loadMore"
        class="px-8 py-3 bg-hanfu-red text-white rounded-full font-semibold shadow-lg hover:bg-hanfu-red/90 transition-colors transform hover:-translate-y-1"
      >
        {{ t('gallery.loadMore') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product.store'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

// 过滤和排序
const activeFilter = ref<string>((route.query.filter as string) || 'all')
const sortOption = ref<string>((route.query.sort as string) || 'newest')
const filters = ref([
  { label: 'gallery.filter.all', value: 'all' },
  { label: 'gallery.filter.ming', value: 'Ming' },
  { label: 'gallery.filter.song', value: 'Song' },
  { label: 'gallery.filter.tang', value: 'Tang' },
  { label: 'gallery.filter.qin', value: 'Qin' },
])

// 价格格式化
const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`
}

// 设置过滤器并更新 URL
const setFilter = (filter: string) => {
  activeFilter.value = filter
  updateQuery()
}

// 更新URL查询参数
const updateQuery = () => {
  const newQuery: Record<string, any> = {
    ...route.query,
    filter: activeFilter.value,
    sort: sortOption.value,
  }
  Object.keys(newQuery).forEach((key) => {
    const value = newQuery[key]
    if (value === 'all' || value === 'newest') {
      delete newQuery[key]
    }
  })
  router.replace({ query: newQuery })
}

// 分页
const visibleCount = ref(12)
const loadMore = () => {
  visibleCount.value += 12
}
const hasMore = computed(() => visibleCount.value < filteredProducts.value.length)

// 初始化产品数据
onMounted(() => {
  productStore.fetchProducts({ limit: 100, page: 1 })
})

// 过滤和排序后的产品
const filteredProducts = computed(() => {
  let result = [...productStore.products]

  // 过滤
  if (activeFilter.value !== 'all') {
    result = result.filter(
      (p) => p.tags?.includes(activeFilter.value) || p.dynasty === activeFilter.value,
    )
  }

  // 排序
  if (sortOption.value === 'newest') {
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } else if (sortOption.value === 'popular') {
    // 随机排序模拟人气
    result.sort(() => Math.random() - 0.5)
  } else if (sortOption.value === 'price-asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (sortOption.value === 'price-desc') {
    result.sort((a, b) => b.price - a.price)
  }

  return result
})

// 分页产品
const paginatedProducts = computed(() => {
  return filteredProducts.value.slice(0, visibleCount.value)
})

// 监听路由变化来同步状态
watch(
  () => route.query,
  (newQuery) => {
    activeFilter.value = (newQuery.filter as string) || 'all'
    sortOption.value = (newQuery.sort as string) || 'newest'
  },
  { immediate: true },
)
</script>
<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}
</style>
