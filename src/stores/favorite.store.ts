import { defineStore } from 'pinia'
import { useAuthStore } from './auth.store'
import type { Product, UserFavorite } from '@/types'
import { apiClient } from '@/api/client'

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: [] as Product[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    /**
     * 返回一个包含所有收藏产品ID的Set，用于快速查找。
     * @returns {Set<number>}
     */
    favoriteProductIds(state): Set<number> {
      return new Set(state.favorites.map((p) => p.id))
    },
  },

  actions: {
    /**
     * 从服务器获取当前用户的收藏列表。
     */
    async fetchFavorites() {
      const authStore = useAuthStore()
      if (!authStore.isAuthenticated) {
        this.favorites = []
        return
      }

      this.loading = true
      this.error = null
      try {
        const response = await apiClient.get<UserFavorite[]>('/user-favorites')
        this.favorites = response.data.map((fav) => fav.product)
      } catch (err: any) {
        this.error = err.response?.data?.message || '获取收藏列表失败。'
        console.error(this.error)
      } finally {
        this.loading = false
      }
    },

    /**
     * 切换一个产品的收藏状态。
     * @param {Product} product - 要切换收藏状态的产品对象。
     */
    async toggleFavorite(product: Product) {
      const authStore = useAuthStore()
      // 路由和UI逻辑由组件负责。Store只在用户已认证时执行操作。
      if (!authStore.isAuthenticated) {
        console.warn('User is not authenticated. Cannot toggle favorite.')
        return
      }

      this.error = null
      const isCurrentlyFavorited = this.favoriteProductIds.has(product.id)

      if (isCurrentlyFavorited) {
        // --- 取消收藏 ---
        try {
          await apiClient.delete(`/user-favorites/${product.id}`)
          this.favorites = this.favorites.filter((p) => p.id !== product.id)
        } catch (err: any) {
          this.error = err.response?.data?.message || '取消收藏失败。'
          console.error(this.error)
        }
      } else {
        // --- 添加收藏 ---
        try {
          await apiClient.post('/user-favorites', { productId: product.id })
          this.favorites.push(product)
        } catch (err: any) {
          this.error = err.response?.data?.message || '添加收藏失败。'
          console.error(this.error)
        }
      }
    },
  },
})
