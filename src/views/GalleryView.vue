<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Spacer for fixed navbar -->
    <div class="h-[100px]"></div>
    <!-- Category Filter -->
    <div class="mb-8 flex flex-wrap items-center justify-center gap-4">
      <button
        @click="selectCategory(null)"
        :class="['btn', !selectedCategory ? 'btn-primary' : 'btn-ghost']"
      >
        {{ t('gallery.allCategories') }}
      </button>
      <button
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category)"
        :class="['btn', selectedCategory?.id === category.id ? 'btn-primary' : 'btn-ghost']"
      >
        {{ category.name }}
      </button>
    </div>

    <!-- Subcategory Filter -->
    <div
      v-if="selectedCategory && subcategories.length"
      class="mb-8 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        @click="selectSubcategory(null)"
        :class="['btn btn-sm', !selectedSubcategory ? 'btn-active' : 'btn-outline']"
      >
        {{ t('gallery.allSubcategories') }}
      </button>
      <button
        v-for="subcategory in subcategories"
        :key="subcategory.id"
        @click="selectSubcategory(subcategory)"
        :class="[
          'btn btn-sm',
          selectedSubcategory?.id === subcategory.id ? 'btn-active' : 'btn-outline',
        ]"
      >
        {{ subcategory.name }}
      </button>
    </div>

    <!-- Product Grid -->
    <div v-if="productStore.loading || favoriteStore.loading" class="flex justify-center py-10">
      <span class="loading loading-lg"></span>
    </div>
    <div
      v-else-if="paginatedProducts.length > 0"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <ProductCard v-for="product in paginatedProducts" :key="product.id" :product="product" />
    </div>
    <div v-else class="text-center text-gray-500">
      <p>{{ t('gallery.noProducts') }}</p>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-12 flex justify-center">
      <div class="join">
        <button @click="prevPage" :disabled="currentPage === 1" class="join-item btn">«</button>
        <button class="join-item btn">{{ t('gallery.page', { currentPage, totalPages }) }}</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="join-item btn">
          »
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Category, Subcategory, Product } from '@/types'
import ProductCard from '@/components/ui/card/ProductCard.vue'
import { useAuthStore } from '@/stores/auth.store'
import { useCategoriesStore } from '@/stores/categories.store'
import { useFavoriteStore } from '@/stores/favorite.store'
import { useProductStore } from '@/stores/product.store'

const { t } = useI18n()

const productStore = useProductStore()
const categoriesStore = useCategoriesStore()
const favoriteStore = useFavoriteStore()
const authStore = useAuthStore()

const selectedCategory = ref<Category | null>(null)
const selectedSubcategory = ref<Subcategory | null>(null)
const currentPage = ref(1)
const itemsPerPage = 12

const categories = computed(() => categoriesStore.categories)
const subcategories = computed(() => {
  if (!selectedCategory.value) return []
  return categories.value.find((c) => c.id === selectedCategory.value?.id)?.subcategories || []
})

const filteredProducts = computed(() => {
  // [修正] 增加防御性代码，确保 productStore.products 存在
  if (!productStore.products) {
    return []
  }

  let products: Product[] = productStore.products
  if (selectedCategory.value) {
    if (selectedSubcategory.value) {
      products = products.filter((p) => p.subcategory?.id === selectedSubcategory.value?.id)
    } else {
      const subcategoryIds = new Set(subcategories.value.map((s) => s.id))
      products = products.filter((p) =>
        p.subcategory?.id ? subcategoryIds.has(p.subcategory.id) : false,
      )
    }
  }
  return products
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))
const paginatedProducts = computed(() => {
  // [修正] 增加防御性代码，确保 filteredProducts.value 总是数组
  const products = filteredProducts.value || []
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return products.slice(start, end)
})

function selectCategory(category: Category | null) {
  selectedCategory.value = category
  selectedSubcategory.value = null
  currentPage.value = 1
}

function selectSubcategory(subcategory: Subcategory | null) {
  selectedSubcategory.value = subcategory
  currentPage.value = 1
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

watch(filteredProducts, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value || 1
  }
})

onMounted(async () => {
  // 只保留特定于此页面且依赖于认证状态的逻辑
  if (authStore.isAuthenticated && favoriteStore.favorites.length === 0) {
    await favoriteStore.fetchFavorites()
  }
})
</script>
