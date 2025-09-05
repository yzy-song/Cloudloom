import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth.store'
import { useApi } from '@/composables/useApi'

// 定义收藏项的接口，匹配后端返回的数据结构
export interface FavoriteItem {
  id: number
  user_id: number
  product_id: number
  product: {
    id: number
    name: string
    description: string
    price: number
    images: string[]
    // ... 其他产品字段
  }
}

export const useFavoriteStore = defineStore('favorite', () => {
  const api = useApi()
  const authStore = useAuthStore()

  // State
  const favorites = ref<FavoriteItem[]>([])
  const isLoading = ref(false)

  // Getters
  const isFavorite = computed(() => {
    return (productId: number) => favorites.value.some((fav) => fav.product.id === productId)
  })

  // Actions
  /**
   * 从服务器获取当前用户的收藏列表
   */
  async function fetchFavorites() {
    if (!authStore.isAuthenticated) {
      // 如果用户未登录，清空收藏列表并返回
      favorites.value = []
      return
    }
    isLoading.value = true
    try {
      // 关键改动：直接接收数据数组，不再访问 .data 属性
      const responseData = await api.get<FavoriteItem[]>('/user-favorites')

      // 关键改动：检查返回的数据是否存在
      if (responseData) favorites.value = responseData
      else favorites.value = [] // 如果返回 null 或 undefined，则设置为空数组
    } catch (error) {
      console.error('Failed to fetch favorites:', error)
      favorites.value = [] // 出错时清空
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 添加一个产品到收藏
   * @param productId - 要收藏的产品 ID
   */
  async function addFavorite(productId: number) {
    if (!authStore.isAuthenticated) {
      // 提示用户需要登录
      alert('Please log in to add items to your favorites.')
      return
    }
    try {
      await api.post('/user-favorites', { productId })
      // 添加成功后，立即重新获取完整的收藏列表以保证数据同步
      await fetchFavorites()
    } catch (error) {
      console.error('Failed to add favorite:', error)
    }
  }

  /**
   * 从收藏中移除一个产品
   * @param productId - 要移除的产品 ID
   */
  async function removeFavorite(productId: number) {
    if (!authStore.isAuthenticated) return
    try {
      await api.delete(`/user-favorites/${productId}`)
      // 移除成功后，在本地列表中直接过滤掉该项，实现即时更新
      favorites.value = favorites.value.filter((fav) => fav.product.id !== productId)
    } catch (error) {
      console.error('Failed to remove favorite:', error)
    }
  }

  /**
   * 切换一个产品的收藏状态
   * @param productId - 要切换的产品 ID
   */
  async function toggleFavorite(productId: number) {
    if (isFavorite.value(productId)) await removeFavorite(productId)
    else await addFavorite(productId)
  }

  return {
    favorites,
    isLoading,
    isFavorite,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  }
})
