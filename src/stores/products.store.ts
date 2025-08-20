import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Product, ProductCategory, ApiResponse } from '@/types'
import { apiClient } from '@/api/client'

export const useProductsStore = defineStore('products', () => {
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

  const fetchProducts = async (filters?: {
    category?: ProductCategory
    page?: number
    limit?: number
    featured?: boolean
  }) => {
    loading.value = true
    error.value = null

    try {
      const params = new URLSearchParams()
      if (filters?.category) params.append('category', filters.category)
      if (filters?.page) params.append('page', filters.page.toString())
      if (filters?.limit) params.append('limit', filters.limit.toString())

      const response = await apiClient.get<ApiResponse<Product[]>>(`/products?${params.toString()}`)

      products.value = response.data.data
      pagination.value = response.data.pagination || {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
      }
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Failed to fetch products'
      console.error('Fetch products error:', e)
    } finally {
      loading.value = false
    }
  }

  const fetchFeaturedProducts = async () => {
    try {
      const response = await apiClient.get<ApiResponse<Product[]>>('/products?featured=true')
      featuredProducts.value = response.data.data
    } catch (e) {
      console.error('Fetch featured products error:', e)
    }
  }

  const fetchProductById = async (id: string) => {
    loading.value = true
    try {
      const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`)
      currentProduct.value = response.data.data
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Product not found'
      throw e
    } finally {
      loading.value = false
    }
  }

  const getProductById = (id: string) => {
    return (
      products.value.find((product) => product.id === id) ||
      featuredProducts.value.find((product) => product.id === id)
    )
  }

  // 计算属性
  const totalProducts = computed(() => pagination.value.total)
  const currentPage = computed(() => pagination.value.page)
  const hasNextPage = computed(() => currentPage.value < pagination.value.totalPages)
  const hasPrevPage = computed(() => currentPage.value > 1)

  return {
    products,
    featuredProducts,
    currentProduct,
    loading,
    error,
    pagination,
    totalProducts,
    currentPage,
    hasNextPage,
    hasPrevPage,
    fetchProducts,
    fetchFeaturedProducts,
    fetchProductById,
    getProductById,
  }
})
