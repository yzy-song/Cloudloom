import { defineStore } from 'pinia'
import type { Category } from '@/types'
import { apiClient } from '@/api/client'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [] as Category[],
    isLoading: false,
    error: null as string | null,
  }),
  getters: {
    /**
     * [保留] Getter for all categories.
     */
    getCategories(state): Category[] {
      return state.categories
    },
  },
  actions: {
    /**
     * [更名并优化] 从服务器获取所有分类（包含子分类）。
     * 同样加入了缓存机制。
     */
    async fetchAllCategories() {
      // 如果分类已经加载过，就不再重复获取
      if (this.categories.length > 0) {
        return
      }

      this.isLoading = true
      this.error = null
      try {
        const response = await apiClient.get<Category[]>('/categories')
        this.categories = response.data
      } catch (err: any) {
        this.error = err.response?.data?.message || '获取分类列表失败。'
        console.error(this.error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
