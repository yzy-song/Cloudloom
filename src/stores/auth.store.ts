import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ApiResponse } from '@/types'
import { api } from '@/api/client'

export interface User {
  id: string
  name: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  phone?: string
  role: 'admin' | 'customer'
}

export interface LoginCredentials {
  email: string
  password: string
  remember?: boolean
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export interface ProfileData {
  firstName?: string
  lastName?: string
  phone?: string
  avatar?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('hanfu_token'))
  const loading = ref(false)
  const error = ref<string | null>(null)
  const isAuthenticated = ref(!!token.value)

  // 初始化认证状态
  const initAuth = () => {
    const savedUser = localStorage.getItem('hanfu_user')
    const savedToken = localStorage.getItem('hanfu_token')

    if (savedUser && savedToken) {
      user.value = JSON.parse(savedUser)
      token.value = savedToken
      isAuthenticated.value = true
    }
  }

  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post<{ user: User; token: string }>('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      })

      user.value = response.data.user
      token.value = response.data.token
      isAuthenticated.value = true

      // 存储到本地
      localStorage.setItem('hanfu_user', JSON.stringify(response.data.user))
      localStorage.setItem('hanfu_token', response.data.token)

      if (credentials.remember) {
        localStorage.setItem('hanfu_remember', 'true')
      }

      return { success: true }
    } catch (e: any) {
      error.value = e.message || '登录失败，请检查邮箱和密码'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const register = async (userData: RegisterData) => {
    loading.value = true
    error.value = null

    try {
      // 检查密码是否匹配
      if (userData.password !== userData.confirmPassword) {
        throw new Error('密码不匹配')
      }

      const response = await api.post<{ user: User; token: string }>('/auth/register', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      })

      user.value = response.data.user
      token.value = response.data.token
      isAuthenticated.value = true

      // 存储到本地
      localStorage.setItem('hanfu_user', JSON.stringify(response.data.user))
      localStorage.setItem('hanfu_token', response.data.token)

      return { success: true }
    } catch (e: any) {
      error.value = e.message || '注册失败，请稍后重试'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (e) {
      console.error('Logout error:', e)
    } finally {
      user.value = null
      token.value = null
      isAuthenticated.value = false
      localStorage.removeItem('hanfu_user')
      localStorage.removeItem('hanfu_token')
      localStorage.removeItem('hanfu_remember')
    }
  }

  const validateToken = async () => {
    if (!token.value) return false

    try {
      const response = await api.get<{ user: User }>('/auth/me')
      user.value = response.data.user
      isAuthenticated.value = true

      // 更新本地存储
      localStorage.setItem('hanfu_user', JSON.stringify(response.data.user))

      return true
    } catch (e) {
      // Token无效，清除存储
      await logout()
      return false
    }
  }

  const resetPassword = async (email: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/auth/reset-password', { email })
      return { success: true }
    } catch (e: any) {
      error.value = e.message || '密码重置失败'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (profileData: ProfileData) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.patch<{ user: User }>('/auth/profile', profileData)
      user.value = response.user

      // 更新本地存储
      localStorage.setItem('hanfu_user', JSON.stringify(response.user))

      return { success: true }
    } catch (e: any) {
      error.value = e.message || '更新个人资料失败'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // 初始化
  initAuth()

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    initAuth,
    login,
    register,
    logout,
    validateToken,
    resetPassword,
    updateProfile,
  }
})
