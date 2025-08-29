/*
 * @Author: yzy
 * @Date: 2025-08-20 15:36:39
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-21 15:50:03
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
        {
          id: 1,
          title: '唐制汉服',
          description: '唐代风格汉服',
          filterKey: 'tang',
          productCount: 28,
          image: '',
        },
        {
          id: 2,
          title: '宋制汉服',
          description: '宋代风格汉服',
          filterKey: 'song',
          productCount: 22,
          image: '',
        },
        {
          id: 3,
          title: '明制汉服',
          description: '明代风格汉服',
          filterKey: 'ming',
          productCount: 35,
          image: '',
        },
        {
          id: 4,
          title: '婚服系列',
          description: '传统婚服',
          filterKey: 'wedding',
          productCount: 12,
          image: '',
        },
        {
          id: 5,
          title: '汉服周边',
          description: '配饰和周边',
          filterKey: 'accessories',
          productCount: 15,
          image: '',
        },
        {
          id: 6,
          title: '文创产品',
          description: '文化创意产品',
          filterKey: 'cultural',
          productCount: 18,
          image: '',
        },
      ]
    } catch (e) {
      error.value = 'Failed to fetch categories'
      logger.error('Error fetching categories:', e)
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
