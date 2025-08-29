import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ApiResponse } from '@/types'
import { api, setAuthToken } from '@/api/client'

export interface User {
  id: string
  username: string
  nickName?: string
  email: string
  avatar?: string
  phone?: string
  role: 'admin' | 'customer'
}

export interface LoginCredentials {
  identifier: string
  password: string
  remember?: boolean
}

export interface RegisterData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface ProfileData {
  username: string
  email: string
  phone?: string
  avatar?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const loading = ref(false)
  const error = ref<string | null>(null)
  const isAuthenticated = ref(!!token.value)

  // 初始化认证状态
  const initAuth = () => {
    // 首先检查 localStorage (记住我功能)
    const savedUser = localStorage.getItem('cloudloom_user')
    const savedToken = localStorage.getItem('auth_token')
    const rememberMe = localStorage.getItem('remember_me') === 'true'

    // 检查 localStorage 中的数据是否有效
    if (savedUser && savedToken && rememberMe && savedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(savedUser)
        if (parsedUser && parsedUser.id) {
          // 简单验证用户对象
          user.value = parsedUser
          token.value = savedToken
          isAuthenticated.value = true
          // 设置token到API客户端
          setAuthToken(savedToken)
          return // 如果localStorage有效，直接返回
        }
      } catch (e) {
        // 解析失败时清除无效数据
        localStorage.removeItem('cloudloom_user')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('remember_me')
      }
    }

    // 如果没有记住我或localStorage无效，检查sessionStorage
    const sessionUser = sessionStorage.getItem('cloudloom_user')
    const sessionToken = sessionStorage.getItem('auth_token')
    if (sessionUser && sessionToken && sessionUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(sessionUser)
        if (parsedUser && parsedUser.id) {
          // 简单验证用户对象
          user.value = parsedUser
          token.value = sessionToken
          isAuthenticated.value = true
          setAuthToken(sessionToken)
          return
        }
      } catch (e) {
        // 解析失败时清除无效数据
        sessionStorage.removeItem('cloudloom_user')
        sessionStorage.removeItem('auth_token')
      }
    }

    // 如果都没有有效数据，确保状态是干净的
    if (!user.value) {
      user.value = null
      token.value = null
      isAuthenticated.value = false
      // 清除所有存储
      localStorage.removeItem('cloudloom_user')
      localStorage.removeItem('auth_token')
      localStorage.removeItem('remember_me')
      sessionStorage.removeItem('cloudloom_user')
      sessionStorage.removeItem('auth_token')
    }
  }

  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.post<{ user: User; accessToken: string }>('/auth/login', {
        identifier: credentials.identifier,
        password: credentials.password,
      })

      user.value = response.data.user
      token.value = response.data.accessToken
      isAuthenticated.value = true

      // 设置token到API客户端
      setAuthToken(response.data.accessToken)
      // 根据remember选项决定存储方式
      if (credentials.remember) {
        // 长期存储到localStorage
        localStorage.setItem('cloudloom_user', JSON.stringify(response.data.user))
        localStorage.setItem('auth_token', response.data.accessToken)
        localStorage.setItem('remember_me', 'true')
      } else {
        // 只存储到sessionStorage（浏览器关闭后清除）
        sessionStorage.setItem('cloudloom_user', JSON.stringify(response.data.user))
        sessionStorage.setItem('auth_token', response.data.accessToken)
        // 清除localStorage中的相关数据
        localStorage.removeItem('cloudloom_user')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('remember_me')
      }

      return { success: true }
    } catch (e: any) {
      error.value = e.message || '登录失败，请检查用户名和密码'
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
        username: userData.username,
        email: userData.email,
        password: userData.password,
      })

      user.value = response.data.user
      token.value = response.data.token
      isAuthenticated.value = true

      // 存储到本地
      localStorage.setItem('cloudloom_user', JSON.stringify(response.data.user))
      localStorage.setItem('auth_token', response.data.token)

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
      logger.error('Logout error:', e)
    } finally {
      user.value = null
      token.value = null
      isAuthenticated.value = false
      localStorage.removeItem('cloudloom_user')
      localStorage.removeItem('auth_token')
      localStorage.removeItem('remember_me')

      // 同样清除 sessionStorage
      sessionStorage.removeItem('cloudloom_user')
      sessionStorage.removeItem('auth_token')

      // 移除API认证头
      setAuthToken(null)
    }
  }

  const validateToken = async () => {
    if (!token.value) return false

    try {
      const response = await api.get<{ user: User }>('/auth/me')
      user.value = response.data.user
      isAuthenticated.value = true

      // 更新本地存储
      localStorage.setItem('cloudloom_user', JSON.stringify(response.data.user))

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
      user.value = response.data.user

      // 更新本地存储
      localStorage.setItem('cloudloom_user', JSON.stringify(response.data.user))

      return { success: true }
    } catch (e: any) {
      error.value = e.message || '更新个人资料失败'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const loginWithOAuth = async (payload: any) => {
    loading.value = true
    error.value = null
    logger.debug('OAuth Login Payload:', payload)
    try {
      const response = await api.post<{ user: User; token: string }>('/auth/oauth-login', payload)
      user.value = response.data.user
      token.value = response.data.token
      isAuthenticated.value = true
      localStorage.setItem('cloudloom_user', JSON.stringify(response.data.user))
      localStorage.setItem('auth_token', response.data.token)
      return { success: true }
    } catch (e: any) {
      error.value = e.message || '第三方登录失败'
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
    loginWithOAuth,
  }
})
