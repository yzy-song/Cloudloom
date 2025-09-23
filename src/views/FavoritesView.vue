<script setup lang="ts">
import { onMounted } from 'vue';
import { HeartIcon } from '@heroicons/vue/24/outline';
import { useI18n } from 'vue-i18n';
import BaseLoading from '@/components/ui/BaseLoading.vue';
import ProductCard from '@/components/ui/card/ProductCard.vue';
import { useFavoriteStore } from '@/stores/favorite.store';

const { t } = useI18n();
const favoriteStore = useFavoriteStore();

onMounted(() => {
  favoriteStore.fetchFavorites();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">{{ t('favorites.title') }}</h1>

    <!-- 加载状态 -->
    <div v-if="favoriteStore.loading" class="flex justify-center items-center h-64">
      <BaseLoading class="w-12 h-12" />
    </div>

    <!-- 收藏列表为空，样式与订单一致 -->
    <div
      v-else-if="!favoriteStore.loading && favoriteStore.favorites.length === 0"
      class="flex flex-col items-center justify-center h-64 text-center bg-white dark:bg-gray-800 rounded-lg shadow"
    >
      <!-- 图标 -->
      <HeartIcon class="h-16 w-16 text-gray-300 mb-4" />
      <!-- 标题 -->
      <h2 class="text-2xl font-bold font-serif text-gray-900 mb-2 dark:text-gray-100">
        {{ t('favorites.title') }}
      </h2>
      <!-- 空提示 -->
      <p class="text-gray-500 mb-2 dark:text-gray-400">{{ t('favorites.empty') }}</p>
      <!-- 跳转按钮 -->
      <router-link to="/gallery" class="mt-2 text-[#C0392B] font-semibold hover:underline">
        {{ t('favorites.goBrowse') }}
      </router-link>
    </div>

    <!-- 显示收藏列表 -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="favorite in favoriteStore.favorites" :key="favorite.id" :product="favorite" />
    </div>
  </div>
</template>
