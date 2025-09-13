<template>
  <div class="gallery-view">
    <!-- Gallery Banner Section -->
    <div class="banner-wrapper relative">
      <div class="banner">
        <img
          v-for="(image, index) in bannerImages"
          :key="index"
          :src="image"
          alt="Gallery Banner"
          :class="{
            'fade-in': currentBannerIndex === index,
            'fade-out': currentBannerIndex !== index,
          }"
        />
      </div>
      <div class="banner-overlay absolute inset-0 flex items-center justify-center text-white">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold font-serif shadow-lg">
          {{ $t('gallery.title') }}
        </h1>
      </div>
    </div>

    <!-- Gallery Content Section -->
    <div class="gallery-content container mx-auto px-4 py-8">
      <!-- Category Navigation -->
      <div class="category-nav mb-8 flex flex-wrap justify-center gap-4">
        <button
          v-for="(category, index) in categories"
          :key="category.id"
          @click="selectCategory(category.name)"
          :class="[
            'px-4 py-2 rounded-full transition-colors duration-300',
            currentCategory === category.name
              ? 'bg-red-900 text-white shadow-md'
              : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100',
          ]"
        >
          {{ $t(`categories.${category.name}`) }}
        </button>
      </div>

      <!-- Subcategory Navigation -->
      <div
        v-if="subcategories.length > 0"
        class="subcategory-nav mb-8 flex flex-wrap justify-center gap-4"
      >
        <button
          @click="selectSubcategory(null)"
          :class="[
            'px-4 py-2 rounded-full transition-colors duration-300',
            currentSubcategory === null
              ? 'bg-blue-900 text-white shadow-md'
              : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100',
          ]"
        >
          {{ $t('subcategories.all') }}
        </button>
        <button
          v-for="(subcategory, index) in subcategories"
          :key="subcategory.id"
          @click="selectSubcategory(subcategory.name)"
          :class="[
            'px-4 py-2 rounded-full transition-colors duration-300',
            currentSubcategory === subcategory.name
              ? 'bg-blue-900 text-white shadow-md'
              : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100',
          ]"
        >
          {{ $t(`subcategories.${subcategory.name}`) }}
        </button>
      </div>

      <!-- Product Grid -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <base-loading />
      </div>

      <div v-else-if="isError" class="text-center text-red-500 py-12">
        <p>{{ $t('errors.loadFailed') }}</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <product-card
          v-for="product in products"
          :key="product.id"
          :product="product"
          @favorite-toggled="handleFavoriteToggled"
        />
      </div>

      <!-- Pagination -->
      <base-pagination
        v-if="!isLoading && productStore.pagination.totalPages > 1"
        :current-page="productStore.pagination.page"
        :total-pages="productStore.pagination.totalPages"
        :total-items="productStore.pagination.total"
        :items-per-page="productStore.pagination.limit"
        @page-change="handlePageChange"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Product } from '@/types/index'
import type { Category, Subcategory } from '@/types/index'
import BaseLoading from '@/components/ui/BaseLoading.vue'
import BasePagination from '@/components/ui/BasePagination.vue'
import ProductCard from '@/components/ui/card/ProductCard.vue'
import { useCategoriesStore } from '@/stores/categories.store'
import { useProductStore } from '@/stores/product.store'

const { t } = useI18n()
const productStore = useProductStore()
const categoryStore = useCategoriesStore()

// Reactive state for the component
const isLoading = ref<boolean>(false)
const isError = ref<boolean>(false)
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const subcategories = ref<Subcategory[]>([])
const currentCategory = ref<string>('all')
const currentSubcategory = ref<string | null>(null)
const currentPage = ref<number>(1)
const totalPages = ref<number>(1)

// Banner state
const bannerImages = ref([
  '/images/gallery-banner/slide1.png',
  '/images/gallery-banner/slide2.png',
  '/images/gallery-banner/slide3.png',
  '/images/gallery-banner/slide4.png',
])
const currentBannerIndex = ref(0)
const bannerInterval = ref()

// Fetches products based on current filters and pagination
const fetchProducts = async () => {
  isLoading.value = true
  isError.value = false
  try {
    const data = await productStore.fetchAllProducts({
      category: currentCategory.value === 'all' ? undefined : currentCategory.value,
      subcategory:
        currentSubcategory.value === 'all' || currentSubcategory.value == null
          ? undefined
          : currentSubcategory.value,
      page: currentPage.value,
      limit: 12, // Assuming 12 items per page as per your original logic
    })
    products.value = data.data
    totalPages.value = data.totalPages
  } catch (error) {
    console.error('Failed to fetch products:', error)
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

// Fetches all categories and populates subcategories for the selected category
const fetchCategories = async () => {
  try {
    await categoryStore.fetchAllCategories()
    categories.value = categoryStore.categories
    updateSubcategories()
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    isError.value = true
  }
}

// Updates subcategories based on the selected category
const updateSubcategories = () => {
  const selectedCategory = categories.value.find((cat) => cat.name === currentCategory.value)
  if (selectedCategory) {
    subcategories.value = selectedCategory.subcategories
  } else {
    subcategories.value = []
  }
  // Reset subcategory selection when a new main category is chosen
  currentSubcategory.value = null
}

// Watch for changes in the active category or subcategory and refetch products
watchEffect(() => {
  // We don't need to manually call fetchProducts here anymore,
  // watchEffect will handle it automatically on initial load and whenever
  // currentCategory, currentSubcategory, or currentPage changes.
  // This consolidates the logic from onMounted and the two watchers.
  if (currentCategory.value || currentSubcategory.value || currentPage.value) {
    fetchProducts()
  }
})

// Category and subcategory selection handlers
const selectCategory = (category: string) => {
  currentCategory.value = category
  currentPage.value = 1 // Reset page on category change
  updateSubcategories()
}

const selectSubcategory = (subcategory: string | null) => {
  currentSubcategory.value = subcategory
  currentPage.value = 1 // Reset page on subcategory change
}

// Pagination handler
const handlePageChange = (page: number) => {
  currentPage.value = page
}

// Favorite toggle handler
const handleFavoriteToggled = () => {
  // Re-fetch data to reflect the favorite status change if needed,
  // or handle local state update if product store is reactive.
  // Assuming the store is reactive, this might not be needed.
  // For now, let's keep it simple.
  console.log('Favorite toggled, re-fetching products might be needed.')
}

// Lifecycle hooks
onMounted(() => {
  fetchCategories()
  startBannerRotation()
})

// Banner rotation logic
const startBannerRotation = () => {
  if (bannerInterval.value) {
    clearInterval(bannerInterval.value)
  }
  bannerInterval.value = setInterval(() => {
    currentBannerIndex.value = (currentBannerIndex.value + 1) % bannerImages.value.length
  }, 5000) // Change image every 5 seconds
}
</script>

<style scoped>
.banner-wrapper {
  height: 300px; /* Adjust height for a better mobile view */
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 1s ease-in-out;
}

.fade-in {
  opacity: 1;
}

.fade-out {
  opacity: 0;
}

.banner-overlay {
  background: rgba(0, 0, 0, 0.4);
}

.category-nav,
.subcategory-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.gallery-content {
  max-width: 1200px;
}

@media (max-width: 640px) {
  .gallery-content {
    padding: 0 1rem;
  }

  .category-nav,
  .subcategory-nav {
    justify-content: flex-start;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
