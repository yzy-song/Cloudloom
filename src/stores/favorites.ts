/*
 * @Author: yzy
 * @Date: 2025-08-19 10:42:35
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-19 10:42:49
 */
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<number[]>([])

  // 初始化时从本地存储加载收藏
  const loadFavorites = () => {
    const saved = localStorage.getItem('hanfu_favorites')
    if (saved) {
      try {
        favorites.value = JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse favorites from localStorage', e)
        favorites.value = []
      }
    }
  }

  // 保存收藏到本地存储
  const saveFavorites = () => {
    localStorage.setItem('hanfu_favorites', JSON.stringify(favorites.value))
  }

  // 初始化加载
  loadFavorites()

  // 监听变化自动保存
  watch(favorites, saveFavorites, { deep: true })

  // 切换收藏状态
  function toggleFavorite(productId: number) {
    const index = favorites.value.indexOf(productId)
    if (index > -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(productId)
    }
  }

  // 检查是否已收藏
  function isFavorite(productId: number) {
    return favorites.value.includes(productId)
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  }
})
