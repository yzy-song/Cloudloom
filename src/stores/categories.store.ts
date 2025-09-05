import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

// 1. 定义 Category 接口
export interface Category {
  id: number
  name: string
  description?: string
}

export const useCategoryStore = defineStore('categories', () => {
  const api = useApi()

  // 2. 添加类型定义和 isLoading 状态
  const categories = ref<Category[]>([])
  const isLoading = ref(false)

  async function fetchCategories() {
    isLoading.value = true
    try {
      // 3. 修正 API 响应处理
      const responseData = await api.get<Category[]>('/categories')
      if (responseData) categories.value = responseData
      else categories.value = []
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      categories.value = []
    } finally {
      isLoading.value = false
    }
  }

  return { categories, isLoading, fetchCategories }
})
