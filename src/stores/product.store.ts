import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/types'
import { api } from '@/api/client'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null) // 新增
  const pagination = ref({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
  })
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Fetches a paginated and filterable list of products from the API.
   * @param filters - Optional filters for subcategory, page, and limit.
   */
  async function fetchAllProducts(
    filters: {
      category?: string
      subcategory?: string
      page?: number
      limit?: number
    } = {},
  ) {
    loading.value = true
    error.value = null
    try {
      const res = await api.get<{
        data: Product[]
        total: number
        page: number
        limit: number
        totalPages: number
      }>('/products', filters)
      products.value = res.data
      pagination.value = {
        page: res.page,
        limit: res.limit,
        total: res.total,
        totalPages: res.totalPages,
      }
      return res
    } catch (e: any) {
      error.value = e.message || '加载商品失败'
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * 根据 ID 获取单个产品的详细信息。
   * @param id - The ID of the product to fetch.
   */
  async function fetchProductById(id: number) {
    loading.value = true
    error.value = null
    try {
      const res = await api.get<{ data: Product }>(`/products/${id}`)
      currentProduct.value = res.data
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
