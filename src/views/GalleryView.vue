<template>
  <div class="gallery-view">
    <!-- Banner Section -->
    <div class="banner-wrapper">
      <div class="banner">
        <img
          v-for="(image, index) in bannerImages"
          :key="index"
          :src="image"
          alt="Gallery Banner"
          :class="currentBannerIndex === index ? 'fade-in' : 'fade-out'"
        />
      </div>
      <div class="banner-overlay">
        <h1 class="text-3xl md:text-5xl font-display text-white font-bold shadow-lg">
          {{ t('gallery.title') }}
        </h1>
      </div>
    </div>
    <!-- 顶部筛选区 -->
    <div class="w-full md:max-w-screen-xl md:mx-auto md:px-6 lg:px-8 px-2">
      <div class="gallery-toolbar flex items-center justify-between gap-4 py-4 bg-white sticky top-0 z-10">
        <button class="btn-outline flex items-center gap-2" @click="drawerOpen = true">
          <svg width="22" height="22" fill="none">
            <path d="M3 6h16M6 12h12M10 18h8" stroke="#222" stroke-width="2" stroke-linecap="round" />
          </svg>
          <span>Filter</span>
        </button>
        <div class="flex gap-2">
          <button
            class="btn-outline px-3 py-2 rounded-lg"
            :class="{ 'bg-hanfu-blue text-white': layout === 'grid' }"
            @click="layout = 'grid'"
            aria-label="Grid"
          >
            <svg width="22" height="22" fill="none">
              <circle cx="6" cy="6" r="2.5" fill="currentColor" />
              <circle cx="16" cy="6" r="2.5" fill="currentColor" />
              <circle cx="6" cy="16" r="2.5" fill="currentColor" />
              <circle cx="16" cy="16" r="2.5" fill="currentColor" />
            </svg>
          </button>
          <button
            class="btn-outline px-3 py-2 rounded-lg"
            :class="{ 'bg-hanfu-blue text-white': layout === 'list' }"
            @click="layout = 'list'"
            aria-label="List"
          >
            <svg width="22" height="22" fill="none">
              <rect x="4" y="5" width="14" height="3" rx="1.5" fill="currentColor" />
              <rect x="4" y="14" width="14" height="3" rx="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>
        <div class="min-w-[120px]">
          <select v-model="sort" class="rounded-lg border border-hanfu-red px-4 py-2 text-base bg-white text-hanfu-dark">
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option value="new">Newest</option>
            <option value="priceUp">Price ↑</option>
            <option value="priceDown">Price ↓</option>
          </select>
        </div>
      </div>
    </div>
    <!-- 筛选抽屉 -->
    <div v-if="drawerOpen" class="filter-drawer" @click.self="drawerOpen = false">
      <div class="drawer-panel">
        <div class="flex items-center justify-between font-semibold mb-2">
          <span></span>
          <button class="text-2xl text-gray-500" @click="drawerOpen = false">&times;</button>
        </div>
        <div>
          <h3 class="font-bold mb-2">Category</h3>

          <div class="flex flex-wrap gap-2">
            <button
              @click="handleCategorySelect(null)"
              class="btn-outline px-4 py-2 rounded-full"
              :class="{ 'bg-hanfu-blue text-white': currentCategoryId === null }"
            >
              All
            </button>
            <button
              v-for="category in categories"
              :key="category.id"
              @click="handleCategorySelect(category.id)"
              class="btn-outline px-4 py-2 rounded-full"
              :class="{ 'bg-hanfu-blue text-white': currentCategoryId === category.id }"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
        <div v-if="subcategories.length > 0">
          <h3 class="font-bold mb-2">Subcategory</h3>
          <div class="flex flex-wrap gap-2">
            <button
              @click="handleSubcategorySelect(null)"
              class="btn-outline px-4 py-2 rounded-full"
              :class="{ 'bg-hanfu-blue text-white': currentSubcategoryId === null }"
            >
              All
            </button>
            <button
              v-for="subcategory in subcategories"
              :key="subcategory.id"
              @click="handleSubcategorySelect(subcategory.id)"
              class="btn-outline px-4 py-2 rounded-full"
              :class="{ 'bg-hanfu-blue text-white': currentSubcategoryId === subcategory.id }"
            >
              {{ subcategory.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 产品区 -->
    <div class="container mx-auto px-4 py-8">
      <div v-if="productStore.loading" class="flex justify-center items-center py-12">
        <BaseLoading />
      </div>
      <div v-else-if="productStore.error" class="text-center text-red-500 py-12">
        <p>{{ t('errors.loadFailed') }}</p>
      </div>
      <div v-else>
        <div v-if="layout === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in productStore.products"
            :key="product.id"
            :product="product"
            @favorite-toggled="handleFavoriteToggled"
          />
        </div>
        <div v-else class="flex flex-col gap-6">
          <ProductCard
            v-for="product in productStore.products"
            :key="product.id"
            :product="product"
            layout="list"
            @favorite-toggled="handleFavoriteToggled"
          />
        </div>
      </div>
      <BasePagination
        v-if="productStore.pagination.total > 1"
        :current-page="productStore.pagination.page"
        :total-pages="productStore.pagination.lastPage"
        :total-items="productStore.pagination.total"
        :items-per-page="productStore.pagination.limit"
        @page-change="handlePageChange"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Category, Subcategory } from '@/types';
import BaseLoading from '@/components/ui/BaseLoading.vue';
import BasePagination from '@/components/ui/BasePagination.vue';
import ProductCard from '@/components/ui/card/ProductCard.vue';
import { useCategoriesStore } from '@/stores/categories.store';
import { useProductStore } from '@/stores/product.store';

const { t } = useI18n();
const productStore = useProductStore();
const categoryStore = useCategoriesStore();

const categories = ref<Category[]>([]);
const subcategories = ref<Subcategory[]>([]);
const currentCategoryId = ref<number | null>(null);
const currentSubcategoryId = ref<number | null>(null);
const currentPage = ref(1);
// Banner
const bannerImages = ref([
  '/images/gallery-banner/slide1.png',
  '/images/gallery-banner/slide2.png',
  '/images/gallery-banner/slide3.png',
  '/images/gallery-banner/slide4.png',
]);
const currentBannerIndex = ref(0);
const bannerInterval = ref();
const drawerOpen = ref(false);
const layout = ref<'grid' | 'list'>('grid');
const sort = ref('az');

// 获取分类并初始化
const fetchCategories = async () => {
  try {
    await categoryStore.fetchAllCategories();
    categories.value = categoryStore.categories;
    currentCategoryId.value = null; // 不选中任何分类
    updateSubcategories();
  } catch (error) {}
};

// 根据当前分类更新子分类
const updateSubcategories = () => {
  if (currentCategoryId.value === null) {
    subcategories.value = [];
    currentSubcategoryId.value = null;
  } else {
    const selectedCategory = categories.value.find(cat => cat.id === currentCategoryId.value);
    subcategories.value = selectedCategory?.subcategories ?? [];
    currentSubcategoryId.value = null;
  }
};

// 获取产品
const fetchProducts = async () => {
  await productStore.fetchAllProducts({
    categoryId: currentCategoryId.value ?? undefined,
    subcategoryId: currentSubcategoryId.value ?? undefined,
    page: currentPage.value,
    limit: productStore.pagination.limit,
    sort: sort.value,
  });
};

// 分类选择
const selectCategory = (categoryId: number | null) => {
  currentCategoryId.value = categoryId;
  currentPage.value = 1;
  updateSubcategories();
};

// 子分类选择
const selectSubcategory = (subcategoryId: number | null) => {
  currentSubcategoryId.value = subcategoryId;
  currentPage.value = 1;
};

// 分页
const handlePageChange = (page: number) => {
  currentPage.value = page;
};

// 收藏操作
const handleFavoriteToggled = () => {};

const handleCategorySelect = (id: number | null) => {
  selectCategory(id);
  // drawerOpen.value = false;
};

// 轮播
const startBannerRotation = () => {
  if (bannerInterval.value) clearInterval(bannerInterval.value);
  bannerInterval.value = setInterval(() => {
    currentBannerIndex.value = (currentBannerIndex.value + 1) % bannerImages.value.length;
  }, 5000);
};

const handleSubcategorySelect = (id: number | null) => {
  selectSubcategory(id);
  // drawerOpen.value = false;
};

// 自动刷新产品
watch([currentCategoryId, currentSubcategoryId, currentPage, sort], () => {
  fetchProducts();
});
onMounted(async () => {
  await fetchCategories();
  await fetchProducts(); // 主动请求一次所有商品
  startBannerRotation();
});
</script>
