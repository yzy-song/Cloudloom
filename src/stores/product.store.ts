import { defineStore } from 'pinia'
import type { Product, PaginationState } from '@/types'
import { api } from '@/api/client' // [修改] 导入 api 而不是 apiClient

/**
 * Interface for product fetching filters.
 */
export interface ProductFilters {
  subcategoryId?: string | string[]
  page?: number
  limit?: number
}
/**
 * 使用 Pinia Options API 风格来管理产品相关的状态。
 * 这种风格结构清晰，易于理解和维护。
 */
export const useProductStore = defineStore('product', {
  /**
   * State: 定义这个 store 的所有状态属性。
   */
  state: () => ({
    products: [] as Product[],
    currentProduct: null as Product | null,
    pagination: {
      page: 1,
      limit: 12,
      total: 0,
      totalPages: 1,
    } as PaginationState,
    loading: false,
    error: null as string | null,
  }),

  /**
   * Getters: 类似于 Vue 组件中的 computed 属性。
   * 用于从 state 中派生出一些状态，例如过滤或计数。
   */
  getters: {
    getProductList: (state): Product[] => state.products,
    getCurrentProduct: (state): Product | null => state.currentProduct,
    getPagination: (state): PaginationState => state.pagination,
  },

  /**
   * Actions: 相当于组件中的 methods。
   * 用于定义业务逻辑，可以包含异步操作，并用于修改 state。
   */
  actions: {
    /**
     * Fetches a paginated and filterable list of products from the API.
     * @param filters - Optional filters for subcategory, page, and limit.
     */
    async fetchAllProducts(filters: ProductFilters = {}) {
      this.loading = true
      this.error = null
      try {
        const params = new URLSearchParams()
        if (filters.subcategoryId) {
          if (Array.isArray(filters.subcategoryId)) {
            filters.subcategoryId.forEach((id) => params.append('subcategoryId', id))
          } else {
            params.append('subcategoryId', filters.subcategoryId)
          }
        }
        if (filters.page) {
          params.append('page', filters.page.toString())
        }
        if (filters.limit) {
          params.append('limit', filters.limit.toString())
        }

        // [修改] 使用 api.get
        const response = await api.get<{
          data: Product[]
          total: number
        }>('/products', { params })

        // 现在这行代码不会报错了，因为 api.get 的返回类型就是 T
        const { data, total } = response
        this.products = data // 将获取到的商品列表赋值给 state

        const page = filters.page || 1
        const limit = filters.limit || 12
        this.pagination = {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        }

        logger.info(`Fetched ${data.length} products (Page ${page}/${this.pagination.totalPages})`)
      } catch (err: any) {
        this.error = '获取商品列表失败'
        logger.error('Failed to fetch products:', err)
      } finally {
        this.loading = false
      }
    },

    /**
     * 根据 ID 获取单个产品的详细信息。
     * 优先从已加载的列表中查找，以减少网络请求。
     * @param {number} id - The ID of the product to fetch.
     * @returns {Promise<Product | null>} The product data or null if not found.
     */
    async fetchProductById(id: number): Promise<Product | null> {
      // [优化] 优先在已有的列表中查找
      const existingProduct = this.products.find((p) => p.id === id)
      if (existingProduct) {
        this.currentProduct = existingProduct
        return existingProduct
      }

      // 如果本地没有，再通过 API 获取
      this.loading = true
      this.error = null
      try {
        const response = await api.get<Product>(`/products/${id}`)
        this.currentProduct = response
        return this.currentProduct
      } catch (err: any) {
        const errorMessage = `获取产品 #${id} 失败: ${err.response?.data?.message || err.message}`
        this.error = errorMessage
        console.error(errorMessage)
        return null
      } finally {
        this.loading = false
      }
    },
  },
})
