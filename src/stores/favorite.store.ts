import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';
import { useAuthStore } from './auth.store';
import type { Product } from '@/types';
import api from '@/api/api';

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: [] as Product[],
    loading: false,
    error: '' as string,
  }),

  getters: {
    /**
     * 返回一个包含所有收藏产品ID的Set，用于快速查找。
     * @returns {Set<number>}
     */
    favoriteProductIds(state): Set<number> {
      return new Set(state.favorites.filter(p => p && typeof p.id === 'number').map(p => p.id));
    },
  },

  actions: {
    /**
     * 从服务器获取当前用户的收藏列表。
     */
    async fetchFavorites() {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        this.favorites = [];
        return;
      }

      this.loading = true;
      this.error = '';
      try {
        const response = await api.get<{ data: Product[]; total: number }>('/user-favorites');
        this.favorites = response.data.data;
      } catch (err: any) {
        this.error = err.response?.data?.message || '获取收藏列表失败。';
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * 切换一个产品的收藏状态。
     * @param {Product} product - 要切换收藏状态的产品对象。
     */
    async toggleFavorite(product: Product) {
      const authStore = useAuthStore();
      // 路由和UI逻辑由组件负责。Store只在用户已认证时执行操作。
      if (!authStore.isAuthenticated) {
        console.warn('User is not authenticated. Cannot toggle favorite.');
        return;
      }

      this.error = '';
      const isCurrentlyFavorited = this.favoriteProductIds.has(product.id);

      if (isCurrentlyFavorited) {
        try {
          await api.delete(`/user-favorites/${product.id}`);
          this.favorites = this.favorites.filter(p => p.id !== product.id);
          toast.info(`Removed from favorites ${product.title || ''}`);
          console.log('Removed from favorites:', product.id);
        } catch (err: any) {
          this.error = err.response?.data?.message || 'You need to sign in to remove favorites.';
          toast.error(this.error);
        }
      } else {
        // --- 添加收藏 ---
        try {
          await api.post('/user-favorites', { productId: product.id });
          this.favorites.push(product);
          toast.info(`Added to favorites ${product.title || ''}`);
          console.log('Added to favorites:', product.id);
        } catch (err: any) {
          this.error = err.response?.data?.message || 'You need to sign in to add favorites.';
          toast.error(this.error);
        }
      }
    },
  },
});
