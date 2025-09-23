<template>
  <div class="relative w-full rounded-xl bg-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl overflow-hidden">
    <!-- 收藏按钮 -->
    <button
      @click.stop.prevent="handleFavoriteClick"
      class="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-primary shadow hover:bg-white hover:text-red-500 active:scale-90 transition-all"
      :aria-label="isFavorited ? '取消收藏' : '添加到收藏'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
          :class="{ 'fill-current text-red-500': isFavorited }"
        />
      </svg>
    </button>

    <router-link :to="`/product/${product.id}`" class="block group">
      <figure class="relative">
        <img
          :src="getBackendAssetURL(product.images[0])"
          :alt="product.title"
          class="h-64 w-full object-cover group-hover:brightness-95 transition"
        />
        <!-- 可选：标签/价格等 -->
        <div v-if="product.price" class="absolute left-4 bottom-4 bg-white/90 rounded px-2 py-1 text-sm font-bold text-hanfu-red shadow">
          €{{ product.price }}
        </div>
      </figure>
      <div class="p-4">
        <h2 class="font-bold text-lg truncate mb-1">{{ product.title }}</h2>
        <p class="line-clamp-2 text-sm text-gray-500 mb-2">
          {{ product.description }}
        </p>
        <!-- 可选：更多信息/标签 -->
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
}>();

const favoriteStore = useFavoriteStore();
const authStore = useAuthStore();
const router = useRouter();

// 计算属性，判断当前产品是否已被收藏
const isFavorited = computed(() => favoriteStore.favoriteProductIds.has(props.product.id));

// 处理点击收藏按钮的事件
async function handleFavoriteClick() {
  if (!authStore.isAuthenticated) {
    toast.error('请先登录才能收藏哦！');
    // router.push('/login')
    return;
  }
  await favoriteStore.toggleFavorite(props.product);
}
</script>

<style scoped>
/* 使用 line-clamp 来限制描述的行数 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
