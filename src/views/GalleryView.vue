<template>
  <div class="bg-white min-h-screen">
    <!-- 顶部大图 -->
    <div class="relative h-64 md:h-96 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-hanfu-blue/70 to-hanfu-red/40"></div>
      <div class="absolute inset-0 bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
      <div class="absolute bottom-8 left-8 text-white max-w-2xl">
        <h1 class="text-3xl md:text-5xl font-display">汉服珍藏馆</h1>
        <p class="mt-2 md:mt-4 text-lg md:text-xl opacity-90">
          探索跨越千年的服饰艺术，每一件都承载着华夏文明的精髓
        </p>
      </div>
    </div>

    <!-- 筛选与排序 -->
    <div
      class="sticky-filter-bar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sticky top-16 bg-white z-10 border-b"
    >
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(filter, index) in filters"
            :key="index"
            :class="[
              'px-4 py-2 rounded-full transition transform hover:-translate-y-0.5',
              activeFilter === filter.key
                ? 'bg-hanfu-red text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
            @click="setFilter(filter.key)"
          >
            {{ filter.label }}
          </button>
        </div>

        <div class="flex items-center space-x-4">
          <span class="text-gray-600">排序:</span>
          <select
            v-model="sortOption"
            class="border border-gray-300 rounded-full px-4 py-2 focus:ring-hanfu-red focus:border-hanfu-red bg-white"
          >
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- 瀑布流展示 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="loading" class="flex justify-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hanfu-red"
        ></div>
      </div>

      <div v-else class="columns-1 sm:columns-2 lg:columns-3 gap-6">
        <div
          v-for="(product, index) in filteredProducts"
          :key="product.id"
          class="mb-6 break-inside-avoid"
        >
          <div
            class="overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <div class="bg-gray-200 border-2 border-dashed aspect-[3/4] w-full" />
            <div class="p-4 bg-white">
              <div class="flex justify-between">
                <h3 class="font-display text-lg font-medium">{{ product.title }}</h3>
                <span class="text-hanfu-red font-medium">{{ product.dynasty }}</span>
              </div>
              <p class="mt-2 text-gray-600 text-sm line-clamp-2">
                {{ product.description }}
              </p>
              <div class="mt-4 flex justify-between items-center">
                <span class="text-hanfu-red font-medium">€{{ product.price.toFixed(2) }}</span>
                <router-link
                  :to="`/product/${product.id}`"
                  class="text-hanfu-blue hover:underline flex items-center"
                >
                  查看详情
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 加载更多 -->
      <div v-if="!loading && hasMore" class="mt-12 text-center">
        <button
          @click="loadMore"
          class="inline-flex items-center px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition bg-white shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          加载更多汉服
        </button>
      </div>

      <!-- 没有更多提示 -->
      <div v-if="!hasMore && !loading" class="mt-12 text-center text-gray-500">
        已展示所有汉服藏品
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { type Product } from '@/types'

const route = useRoute()

// 筛选条件
const filters = [
  { label: '全部汉服', key: 'all' },
  { label: '唐制', key: 'tang' },
  { label: '宋制', key: 'song' },
  { label: '明制', key: 'ming' },
  { label: '男装', key: 'male' },
  { label: '女装', key: 'female' },
  { label: '婚服系列', key: 'wedding' },
  { label: '汉服周边', key: 'accessories' },
  { label: '文创产品', key: 'cultural' },
]

// 排序选项
const sortOption = ref('newest')
const sortOptions = [
  { label: '最新添加', value: 'newest' },
  { label: '人气最高', value: 'popular' },
  { label: '价格从低到高', value: 'price-asc' },
  { label: '价格从高到低', value: 'price-desc' },
]

// 当前激活的筛选条件
const activeFilter = ref('all')

// 监听路由变化
watch(
  () => route.query.filter,
  (newFilter) => {
    if (newFilter && filters.some((f) => f.key === newFilter)) {
      activeFilter.value = newFilter as string
    } else {
      activeFilter.value = 'all'
    }
  },
  { immediate: true },
)

// 设置筛选条件并更新URL
function setFilter(filterKey: string) {
  activeFilter.value = filterKey
  // 更新URL参数
  const query = { ...route.query }

  if (filterKey === 'all') {
    delete query.filter
  } else {
    query.filter = filterKey
  }

  // 扁平化 query 对象，确保所有值都是字符串
  const flatQuery: Record<string, string> = {}
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      flatQuery[key] = value[0] ?? ''
    } else if (value !== null && value !== undefined) {
      flatQuery[key] = value
    }
  })

  // 使用 replaceState 更新 URL
  window.history.replaceState(
    {},
    '',
    `${window.location.pathname}?${new URLSearchParams(flatQuery).toString()}`,
  )
}

// 产品数据
const products = ref<Product[]>([])
const loading = ref(true)
const visibleCount = ref(12)
const hasMore = computed(() => visibleCount.value < products.value.length)

// 初始化产品数据
onMounted(() => {
  // 模拟API请求
  setTimeout(() => {
    products.value = Array.from({ length: 36 }, (_, i) => ({
      id: i + 1,
      title: `汉服系列 #${i + 1}`,
      description: `这是一件精美的汉服，采用传统工艺制作，具有浓郁的中国风。灵感来自${['唐', '宋', '明'][i % 3]}代服饰特点。`,
      price: 50 + Math.floor(Math.random() * 100),
      category: '汉服',
      dynasty: ['tang', 'song', 'ming'][i % 3] as 'tang' | 'song' | 'ming',
      tags: ['热门', '新品'],
      images: [],
      material: '丝绸',
      sizeOptions: ['S', 'M', 'L'],
      careInstructions: '手洗',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      details: [
        '100% 天然桑蚕丝面料',
        '手工刺绣装饰纹样',
        '可拆卸披帛设计',
        '渐变染色工艺',
        '传统缠枝莲纹样',
      ],
    }))
    loading.value = false
  }, 1200)
})

// 过滤和排序后的产品
const filteredProducts = computed(() => {
  let result = [...products.value]

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
    // 模拟人气排序（随机）
    result.sort(() => Math.random() - 0.5)
  } else if (sortOption.value === 'price-asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (sortOption.value === 'price-desc') {
    result.sort((a, b) => b.price - a.price)
  }

  return result.slice(0, visibleCount.value)
})

// 加载更多
function loadMore() {
  visibleCount.value += 12
}
</script>

<style scoped>
.sticky-filter-bar {
  top: 5rem; /* 适配导航栏高度 */
}

@media (max-width: 768px) {
  .sticky-filter-bar {
    top: 4rem; /* 移动端适配 */
  }
}
</style>
