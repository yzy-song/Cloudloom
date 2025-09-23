<template>
  <div
    :class="[
      'relative bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl',
      layout === 'list' ? 'flex items-center gap-4 p-4' : 'block',
    ]"
  >
    <!-- 收藏按钮 -->
    <button
      @click.stop.prevent="handleFavoriteClick"
      class="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-primary shadow hover:bg-white hover:text-red-500 active:scale-90 transition-all"
      :aria-label="isFavorited ? '取消收藏' : '添加到收藏'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
          :class="{ 'fill-current text-red-500': isFavorited }"
        />
      </svg>
    </button>

    <router-link :to="`/product/${product.id}`" class="group flex-1 min-w-0">
      <!-- 网格布局 -->
      <figure v-if="layout !== 'list'" class="relative w-full h-64 m-0 p-0">
        <img :src="getBackendAssetURL(product.images[0])" :alt="product.title" class="absolute inset-0 w-full h-full object-cover" />
        <div v-if="product.price" class="absolute left-4 bottom-4 bg-white/90 rounded px-2 py-1 text-sm font-bold text-hanfu-red shadow">
          €{{ product.price }}
        </div>
      </figure>
      <!-- 列表布局 -->
      <div v-else class="flex items-center gap-4">
        <figure class="relative flex-shrink-0 w-40 h-40 rounded-lg overflow-hidden m-0 p-0">
          <img :src="getBackendAssetURL(product.images[0])" :alt="product.title" class="absolute inset-0 w-full h-full object-cover" />
          <div v-if="product.price" class="absolute left-2 bottom-2 bg-white/90 rounded px-2 py-1 text-sm font-bold text-hanfu-red shadow">
            €{{ product.price }}
          </div>
        </figure>
        <div class="flex flex-col justify-center min-w-0">
          <h2 class="font-bold text-lg truncate mb-1">{{ product.title }}</h2>
          <p class="line-clamp-2 text-sm text-gray-500 mb-2">{{ product.description }}</p>
        </div>
      </div>
      <!-- 网格布局下的信息区 -->
      <div v-if="layout !== 'list'" class="p-4">
        <h2 class="font-bold text-lg truncate mb-1">{{ product.title }}</h2>
        <p class="line-clamp-2 text-sm text-gray-500 mb-2">{{ product.description }}</p>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import type { Product } from '@/types';
import { useAuthStore } from '@/stores/auth.store';
import { useFavoriteStore } from '@/stores/favorite.store';
import { getBackendAssetURL } from '@/utils/url';

const props = defineProps<{
  product: Product;
  layout?: 'grid' | 'list';
}>();

const favoriteStore = useFavoriteStore();
const authStore = useAuthStore();
const router = useRouter();

const isFavorited = computed(() => favoriteStore.favoriteProductIds.has(props.product.id));

async function handleFavoriteClick() {
  if (!authStore.isAuthenticated) {
    toast.error('请先登录才能收藏哦！');
    return;
  }
  await favoriteStore.toggleFavorite(props.product);
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
