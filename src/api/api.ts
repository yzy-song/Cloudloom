/*
 * @Author: yzy
 * @Date: 2025-08-20 15:42:00
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-28 17:30:39
 */
import axios from 'axios'
import { toast } from 'vue-sonner'
import { useAuthStore } from '@/stores/auth.store'

const isMockEnabled = import.meta.env.VITE_ENABLE_MOCK === 'true'
const baseURL = isMockEnabled ? '/api' : import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const errorMessage = error.response?.data?.message || error.message || '网络错误'

    if (status === 401) {
      toast.error(errorMessage)
      return Promise.reject(new Error(errorMessage))
    }
    if (status === 403 || status === 404 || status === 500) {
      toast.error(errorMessage)
      return Promise.reject(new Error(errorMessage))
    }
    return Promise.reject(new Error(errorMessage))
  },
)

export default api
