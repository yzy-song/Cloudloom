import axios from 'axios'
import type { ApiResponse } from '@/types'

// 创建axios实例
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    // 处理ApiResponse格式
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data
    }
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }

    const errorMessage =
      error.response?.data?.error || error.response?.data?.message || 'Network error'

    return Promise.reject(new Error(errorMessage))
  },
)

// 类型化的API调用方法
export const api = {
  get: <T>(url: string, params?: any) =>
    apiClient.get<ApiResponse<T>>(url, { params }).then((res) => res.data),

  post: <T>(url: string, data?: any) =>
    apiClient.post<ApiResponse<T>>(url, data).then((res) => res.data),

  put: <T>(url: string, data?: any) =>
    apiClient.put<ApiResponse<T>>(url, data).then((res) => res.data),

  delete: <T>(url: string) => apiClient.delete<ApiResponse<T>>(url).then((res) => res.data),
}
