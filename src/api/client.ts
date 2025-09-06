/*
 * @Author: yzy
 * @Date: 2025-08-20 15:42:00
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-28 17:30:39
 */
import axios from 'axios'

// 根据环境变量动态设置 baseURL
// 如果启用 Mock，则使用相对路径，确保 MSW 能拦截请求
const isMockEnabled = import.meta.env.VITE_ENABLE_MOCK === 'true'
const baseURL = isMockEnabled ? '/api' : import.meta.env.VITE_API_BASE_URL

// 创建axios实例
export const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // 避免某些服务器的 CSRF 检查
  },
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 拼接完整URL（包含baseURL和params）
    const url = config.baseURL
      ? config.baseURL.replace(/\/$/, '') + '/' + config.url?.replace(/^\//, '')
      : config.url
    let fullUrl = url
    if (config.params) {
      const params = new URLSearchParams(config.params).toString()
      fullUrl += (fullUrl?.includes('?') ? '&' : '?') + params
    }
    logger.info('[API Request]', config.method?.toUpperCase(), fullUrl)

    const token = localStorage.getItem('token')
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
    // 处理response格式
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data
    }
    return response
  },
  (error) => {
    const errorMessage =
      error.response?.data?.error || error.response?.data?.message || 'Network error'

    return Promise.reject(new Error(errorMessage))
  },
)

export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete apiClient.defaults.headers.common['Authorization']
  }
}

// 类型化的API调用方法 - 更新返回类型
export const api = {
  get: <T>(url: string, params?: any): Promise<T> =>
    apiClient.get<T>(url, { params }).then((res) => res.data),

  post: <T>(url: string, data?: any): Promise<T> =>
    apiClient.post<T>(url, data).then((res) => res.data),

  put: <T>(url: string, data?: any): Promise<T> =>
    apiClient.put<T>(url, data).then((res) => res.data),

  delete: <T>(url: string): Promise<T> => apiClient.delete<T>(url).then((res) => res.data),

  patch: <T>(url: string, data?: any): Promise<T> =>
    apiClient.patch<T>(url, data).then((res) => res.data),
}
