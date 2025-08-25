import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Product, ProductCategory, ApiResponse } from '@/types'
import { api } from '@/api/client'

export const useProductStore = defineStore('product', () => {
  // State
  const products = ref<Product[]>([])
  const featuredProducts = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  })

  // Getters
  const totalProducts = computed(() => pagination.value.total)
  const currentPage = computed(() => pagination.value.page)
  const hasNextPage = computed(() => currentPage.value < pagination.value.totalPages)
  const hasPrevPage = computed(() => currentPage.value > 1)

  // Actions
  const fetchProducts = async (filters?: {
    category?: ProductCategory
    page?: number
    limit?: number
  }) => {
    loading.value = true
    error.value = null
    try {
      const params = new URLSearchParams()
      if (filters?.category) params.append('category', filters.category)
      if (filters?.page) params.append('page', filters.page.toString())
      if (filters?.limit) params.append('limit', filters.limit.toString())

      const response = await api.get<ApiResponse<Product[]>>(`/products?${params.toString()}`)
      // 兼容 data 可能不存在的情况
      const data = response.data as ApiResponse<Product[]> & { total?: number }
      const list = Array.isArray(data) ? data : []
      logger.info('data list:', list)
      products.value = list.map((p) => ({
        ...p,
        price: Number(p.price),
      }))
      // 兼容 total 字段
      pagination.value = {
        page: filters?.page || 1,
        limit: filters?.limit || 12,
        total: typeof data.total === 'number' ? data.total : list.length,
        totalPages: Math.ceil(
          (typeof data.total === 'number' ? data.total : list.length) / (filters?.limit || 12),
        ),
      }
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Failed to fetch products'
      console.error('Fetch products error:', e)
    } finally {
      loading.value = false
    }
  }

  const fetchProductById = async (id: string) => {
    loading.value = true
    try {
      const response = await api.get<ApiResponse<Product>>(`/products/${id}`)
      // 统一转换 price 为数字
      currentProduct.value = {
        ...response.data.data,
        price: Number(response.data.data.price),
      }
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Product not found'
      throw e
    } finally {
      loading.value = false
    }
  }

  const fetchFeaturedProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/products?page=1&limit=6')
      // 兼容 data 可能不存在的情况
      const data = response.data as ApiResponse<Product[]>
      const list = Array.isArray(data) ? data : []
      featuredProducts.value = list.map((p) => ({
        ...p,
        price: Number(p.price),
      }))
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Failed to fetch featured products'
      console.error('Fetch featured products error:', e)
    } finally {
      loading.value = false
    }
  }

  const getProductById = (id: string) => {
    const productId = parseInt(id, 10)
    return (
      products.value.find((product) => product.id === productId) ||
      featuredProducts.value.find((product) => product.id === productId)
    )
  }

  return {
    // State
    products,
    featuredProducts,
    currentProduct,
    loading,
    error,
    pagination,

    // Getters
    totalProducts,
    currentPage,
    hasNextPage,
    hasPrevPage,

    // Actions
    fetchProducts,
    fetchProductById,
    getProductById,
    fetchFeaturedProducts,
  }
})
