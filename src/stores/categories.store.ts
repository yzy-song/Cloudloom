/*
 * @Author: yzy
 * @Date: 2025-08-20 15:36:39
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-20 16:02:44
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Category } from '@/types'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 500))

      // 模拟数据
      categories.value = [
        { id: 1, name: '唐制汉服', description: '唐代风格汉服', productCount: 28, image: '' },
        { id: 2, name: '宋制汉服', description: '宋代风格汉服', productCount: 22, image: '' },
        { id: 3, name: '明制汉服', description: '明代风格汉服', productCount: 35, image: '' },
        { id: 4, name: '婚服系列', description: '传统婚服', productCount: 12, image: '' },
        { id: 5, name: '汉服周边', description: '配饰和周边', productCount: 15, image: '' },
        { id: 6, name: '文创产品', description: '文化创意产品', productCount: 18, image: '' },
      ]
    } catch (e) {
      error.value = 'Failed to fetch categories'
      console.error('Error fetching categories:', e)
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
  }
})
