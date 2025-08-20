/*
 * @Author: yzy
 * @Date: 2025-08-19 10:42:35
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-20 19:16:19
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/types'

export const useFavoriteStore = defineStore('favorite', () => {
  // State
  const favorites = ref<string[]>([])

  // Getters
  const favoriteCount = computed(() => favorites.value.length)
  const isFavorite = computed(() => (productId: string) => favorites.value.includes(productId))

  // Actions
  const addFavorite = (productId: string) => {
    if (!favorites.value.includes(productId)) {
      favorites.value.push(productId)
      saveToLocalStorage()
    }
  }

  const removeFavorite = (productId: string) => {
    const index = favorites.value.indexOf(productId)
    if (index > -1) {
      favorites.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const toggleFavorite = (productId: string) => {
    if (favorites.value.includes(productId)) {
      removeFavorite(productId)
    } else {
      addFavorite(productId)
    }
  }

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('hanfu_favorites')
    if (saved) {
      favorites.value = JSON.parse(saved)
    }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('hanfu_favorites', JSON.stringify(favorites.value))
  }

  // Initialize
  loadFromLocalStorage()

  return {
    // State
    favorites,

    // Getters
    favoriteCount,
    isFavorite,

    // Actions
    addFavorite,
    removeFavorite,
    toggleFavorite,
    loadFromLocalStorage,
  }
})
