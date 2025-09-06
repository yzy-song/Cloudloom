import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Photo } from '@/types'
import { api } from '@/api/client'

export const usePhotoStore = defineStore('photo', () => {
  const photos = ref<Photo[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPhotos() {
    isLoading.value = true
    error.value = null
    try {
      photos.value = await api.get<Photo[]>('/photos')
    } catch (e: any) {
      error.value = e?.message || '加载照片失败'
    } finally {
      isLoading.value = false
    }
  }

  async function uploadPhotos(files: File[], token: string) {
    error.value = null
    try {
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        await fetch(`${import.meta.env.VITE_API_BASE_URL.replace(/\/api$/, '')}/photos/upload`, {
          method: 'POST',
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
          body: formData,
        }).then(async (res) => {
          if (!res.ok) {
            const err = await res.json().catch(() => ({}))
            throw new Error(err.message || '上传失败')
          }
        })
      }
      await fetchPhotos()
    } catch (e: any) {
      error.value = e.message || '上传失败'
      throw e
    }
  }

  return { photos, isLoading, error, fetchPhotos, uploadPhotos }
})
