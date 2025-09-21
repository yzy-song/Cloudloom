/*
 * @Author: yzy
 * @Date: 2025-08-21 12:36:08
 * @LastEditors: yzy
 * @LastEditTime: 2025-09-06 11:00:00
 */
import { ref } from 'vue'
import api from '@/api/api'
import { logger } from '@/utils/logger'

export function useApi() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const request = async <T>(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: string,
    data?: any,
    config?: any,
  ): Promise<T | null> => {
    loading.value = true
    error.value = null

    try {
      let response // 类型推断即可

      switch (method) {
        case 'get':
          response = await api.get<T>(url, config?.params)
          break
        case 'delete':
          response = await api.delete<T>(url)
          break
        case 'post':
          response = await api.post<T>(url, data)
          break
        case 'put':
          response = await api.put<T>(url, data)
          break
        case 'patch':
          response = await api.patch<T>(url, data)
          break
        default:
          throw new Error(`Unsupported method: ${method}`)
      }

      // 只返回 response.data
      return response.data
    } catch (err: any) {
      error.value = err.message || '请求失败'
      logger.error('API Error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    get: <T>(url: string, config?: any) => request<T>('get', url, undefined, config),
    post: <T>(url: string, data?: any, config?: any) => request<T>('post', url, data, config),
    put: <T>(url: string, data?: any, config?: any) => request<T>('put', url, data, config),
    delete: <T>(url: string, config?: any) => request<T>('delete', url, undefined, config),
    patch: <T>(url: string, data?: any, config?: any) => request<T>('patch', url, data, config),
    clearError: () => {
      error.value = null
    },
  }
}
