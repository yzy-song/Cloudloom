import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ApiResponse, Product, ProductCategory } from '@/types'
import { api } from '@/api/client'

export const useProductStore = defineStore('product', () => {
  // State
  const products = ref<Product[]>([])
  const featuredProducts = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null)
  const relatedProducts = ref<Product[]>([])
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
    subcategoryId?: string | string[]
    page?: number
    limit?: number
  }) => {
    const params: Record<string, any> = {}
    if (filters?.subcategoryId) params.subcategoryId = filters.subcategoryId
    if (filters?.page) params.page = filters.page
    if (filters?.limit) params.limit = filters.limit

    const { list, total } = await fetchProductList(params)
    products.value = list
    pagination.value = {
      page: filters?.page || 1,
      limit: filters?.limit || 12,
      total,
      totalPages: Math.ceil(total / (filters?.limit || 12)),
    }
  }

  const fetchProductById = async (id: string) => {
    loading.value = true
    try {
      const response = await api.get<Product>(`/products/${id}`)
      currentProduct.value = {
        ...response.data,
        reviews: Number(response.data.price),
      }
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Product not found'
      throw e
    } finally {
      loading.value = false
    }
  }

  const fetchFeaturedProducts = async () => {
    const { list } = await fetchProductList({ page: 1, limit: 6 })
    featuredProducts.value = list
  }

  const fetchRelatedProducts = async (id: string | number, limit = 8) => {
    loading.value = true
    error.value = null
    try {
      // 推荐后端实现 /products/:id/related，否则用同分类/标签模拟
      const response = await api.get(`/products/${id}/related`, { limit })
      const list = Array.isArray(response.data) ? response.data : []
      relatedProducts.value = list.map((p) => ({
        ...p,
        price: Number(p.price),
      }))
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Failed to fetch related products'
      relatedProducts.value = []
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

  async function fetchProductList(params: Record<string, any> = {}) {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/products', params)
      const list = Array.isArray(response.data) ? response.data : []
      return {
        list: list.map((p) => ({
          ...p,
          price: Number(p.price),
        })),
        total: list.length,
      }
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Failed to fetch products'
      logger.error('Fetch products error:', e)
      return { list: [], total: 0 }
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    products,
    featuredProducts,
    currentProduct,
    relatedProducts,
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
    fetchRelatedProducts,
    fetchProductList,
  }
})
