import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/types'
import type { PaginatedResult } from '@/utils/pagination'
import api from '@/api/api'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null)
  const pagination = ref<PaginatedResult<Product>['meta']>({
    total: 0,
    page: 1,
    limit: 12,
    lastPage: 1,
  })
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * 获取商品列表（带分页和筛选）
   */
  async function fetchAllProducts(
    filters: {
      category?: string
      subcategory?: string
      page?: number
      limit?: number
    } = {},
  ): Promise<PaginatedResult<Product>> {
    loading.value = true
    error.value = null
    try {
      const res = await api.get<{ data: Product[]; total: number; message: string }>('/products', {
        params: filters,
      })
      const { data, total } = res.data
      const page = filters.page ?? 1
      const limit = filters.limit ?? 12
      const lastPage = Math.ceil(total / limit)
      const meta = { total, page, limit, lastPage }
      products.value = data
      pagination.value = meta
      return { data, meta }
    } catch (e: any) {
      error.value = e.message || '加载商品失败'
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * 根据ID获取单个商品详情
   */
  async function fetchProductById(id: number): Promise<Product | null> {
    loading.value = true
    error.value = null
    try {
      const res = await api.get<{ data: Product }>(`/products/${id}`)
      currentProduct.value = res.data.data
      return currentProduct.value
    } catch (e: any) {
      error.value = e.message || '加载商品详情失败'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    currentProduct,
    pagination,
    loading,
    error,
    fetchAllProducts,
    fetchProductById,
  }
})
