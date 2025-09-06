import { signInWithPopup, signOut, onAuthStateChanged, type AuthProvider } from 'firebase/auth'
import { defineStore } from 'pinia'
import type { User } from '@/types'
import type { LoginUserDto, RegisterUserDto, OAuthLoginDto } from '@/types/dto'
import { apiClient } from '@/api/client'
import { auth } from '@/firebase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || null,
    error: null as string | null,
    loading: false,
    isAuthReady: false,
  }),

  getters: {
    isAuthenticated(state): boolean {
      // [修正] 认证状态应该只依赖于 token 的存在。
      return !!state.token
    },
    getUser(state): User | null {
      return state.user
    },
  },

  actions: {
    /**
     * 从后端获取用户 profile 信息
     */
    async fetchUserProfile() {
      if (!this.token) return

      this.loading = true
      try {
        const response = await apiClient.get<User>('/auth/profile')
        this.user = response.data
      } catch (err: any) {
        // [修正] 只有在认证失败 (401) 时才清除 token，避免其他错误导致意外登出
        if (err.response?.status === 401) {
          this.user = null
          this.token = null
          localStorage.removeItem('token')
          delete apiClient.defaults.headers.common['Authorization']
          this.handleAuthError(err, '会话已过期或无效，请重新登录。')
        } else {
          // 对于其他错误（如网络问题），只记录错误，不清除登录状态
          this.handleAuthError(err, '获取用户信息失败。')
        }
      } finally {
        this.loading = false
      }
    },

    /**
     * 用户名密码登录
     */
    async login(loginDto: LoginUserDto) {
      this.loading = true
      this.error = null
      try {
        // [修正] 动态导入 router
        const router = (await import('@/router')).default
        // [修正] 后端登录接口返回了 accessToken 和 user，直接使用它们
        const response = await apiClient.post<{ accessToken: string; user: User }>(
          '/auth/login',
          loginDto,
        )
        const { accessToken, user } = response.data

        // 直接设置 token 和 user
        this.token = accessToken
        this.user = user
        localStorage.setItem('token', accessToken)
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

        // 登录成功后跳转
        router.push('/')
      } catch (err: any) {
        this.handleAuthError(err, '登录失败，请检查您的邮箱和密码。')
      } finally {
        this.loading = false
      }
    },

    /**
     * 用户注册
     */
    async register(registerDto: RegisterUserDto) {
      this.loading = true
      this.error = null
      try {
        // [修正] 动态导入 router
        const router = (await import('@/router')).default
        await apiClient.post('/auth/register', registerDto)
        alert('注册成功，请登录！')
        router.push('/login')
      } catch (err: any) {
        this.handleAuthError(err, '注册失败，该邮箱可能已被使用。')
      } finally {
        this.loading = false
      }
    },

    /**
     * [最终正确版本] 通用的 OAuth 登录方法，匹配你最新的后端API
     * @param provider - Firebase Auth Provider (e.g., GoogleAuthProvider)
     */
    async loginWithOAuth(provider: AuthProvider) {
      this.loading = true
      this.error = null
      try {
        // [修正] 动态导入 router
        const router = (await import('@/router')).default
        // 步骤 1: 通过 Firebase 进行第三方认证
        const result = await signInWithPopup(auth, provider)
        const firebaseToken = await result.user.getIdToken()

        // 步骤 2: 将 Firebase token 发送到你后端真实的 /auth/oauth-login 接口
        const oauthLoginDto: OAuthLoginDto = { idToken: firebaseToken }
        const response = await apiClient.post<{ accessToken: string; user: User }>(
          '/auth/oauth-login',
          oauthLoginDto,
        )

        // 步骤 3: 从后端一次性获取 token 和 user 对象并保存
        const { accessToken, user } = response.data
        this.token = accessToken
        this.user = user
        localStorage.setItem('token', accessToken)
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

        router.push('/')
      } catch (err: any) {
        logger.error('OAuth login error:', err)
        this.handleAuthError(err, '第三方登录失败。')
      } finally {
        this.loading = false
      }
    },

    /**
     * 用户登出
     */
    async logout() {
      this.loading = true
      const router = (await import('@/router')).default
      try {
        // [修正] 动态导入 router
        // 仍然需要登出 Firebase 的会话
        if (auth.currentUser) {
          await signOut(auth)
        }
      } catch (error) {
        console.error('Firebase signOut error:', error)
      } finally {
        this.user = null
        this.token = null
        localStorage.removeItem('token')
        logger.info('User logged out, redirecting to home.')
        delete apiClient.defaults.headers.common['Authorization']
        this.loading = false
        if (router.currentRoute.value.path !== '/') {
          router.push('/')
        }
      }
    },

    /**
     * 检查认证状态持久化
     */
    async checkAuthState() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        // 如果有 token，尝试获取用户信息
        await this.fetchUserProfile()
      }
      // 无论如何，最后都将 isAuthReady 设为 true
      this.isAuthReady = true
    },

    /**
     * 统一的错误处理器
     */
    handleAuthError(error: any, defaultMessage: string) {
      const errorMessage = error.response?.data?.message || error.message || defaultMessage
      this.error = Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage
      console.error('Auth Error:', this.error)
    },
  },
})
