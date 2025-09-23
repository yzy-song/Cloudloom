import { signInWithPopup, signOut, onAuthStateChanged, type AuthProvider } from 'firebase/auth';
import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';
import type { User } from '@/types';
import type { LoginUserDto, RegisterUserDto, OAuthLoginDto } from '@/types/dto';
import api from '@/api/api';
import { auth } from '@/firebase';
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
      return !!state.token;
    },
    getUser(state): User | null {
      return state.user;
    },
  },

  actions: {
    /**
     * 从后端获取用户 profile 信息
     */
    async fetchUserProfile() {
      if (!this.token) return;
      this.loading = true;
      try {
        const response = await api.get<{ data: User }>('/auth/profile');
        this.user = response.data.data;
      } catch (err: any) {
        if (err.response?.status === 401) {
          this.token = null;
          this.user = null;
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
        } else {
          this.error = err.message || '获取用户信息失败';
        }
      } finally {
        this.loading = false;
      }
    },

    /**
     * 用户名密码登录
     */
    async login(loginDto: LoginUserDto) {
      this.loading = true;
      this.error = null;
      try {
        const router = (await import('@/router')).default;
        const response = await api.post<{ data: { accessToken: string; user: User }; message: string }>('/auth/login', loginDto);
        const { accessToken, user } = response.data.data;
        this.token = accessToken;
        this.user = user;
        localStorage.setItem('token', accessToken);
        toast.success(response.data.message || 'Login successful');
        router.push('/');
      } catch (err: any) {
        toast.error(err.message || 'Login failed');
        console.error('Login error:', err);
      } finally {
        this.loading = false;
      }
    },

    /**
     * 用户注册
     */
    async register(registerDto: RegisterUserDto) {
      this.loading = true;
      this.error = null;
      try {
        const router = (await import('@/router')).default;
        await api.post('/auth/register', registerDto);
        toast.success('Registration successful, please sign in.');
        router.push('/login');
      } catch (err: any) {
        console.error('Registration error:', err);
      } finally {
        this.loading = false;
      }
    },

    /**
     * [最终正确版本] 通用的 OAuth 登录方法，匹配你最新的后端API
     * @param provider - Firebase Auth Provider (e.g., GoogleAuthProvider)
     */
    async loginWithOAuth(provider: AuthProvider) {
      this.loading = true;
      this.error = null;
      try {
        const router = (await import('@/router')).default;
        const result = await signInWithPopup(auth, provider);
        const firebaseToken = await result.user.getIdToken();
        const oauthLoginDto: OAuthLoginDto = { idToken: firebaseToken };
        const response = await api.post<{ data: { accessToken: string; user: User } }>('/auth/oauth-login', oauthLoginDto);
        const { accessToken, user } = response.data.data;
        this.token = accessToken;
        this.user = user;
        localStorage.setItem('token', accessToken);
        toast.success('登录成功');
        router.push('/');
      } catch (err: any) {
        logger.error('OAuth login error:', err);
      } finally {
        this.loading = false;
      }
    },

    /**
     * 用户登出
     */
    async logout() {
      this.loading = true;
      const router = (await import('@/router')).default;
      try {
        if (auth.currentUser) {
          await signOut(auth);
          toast.success('已登出');
        }
      } catch (error) {
        console.error('Firebase signOut error:', error);
      } finally {
        this.user = null;
        this.token = null;
        localStorage.removeItem('token');
        logger.info('User logged out, redirecting to home.');
        delete api.defaults.headers.common['Authorization'];
        this.loading = false;
        router.push('/');
      }
    },

    async updateProfile(profileData: { username?: string; nickName?: string; phone?: string; description?: string }) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.patch('/users/me', profileData);
        // 假设返回的是更新后的用户对象
        this.user = { ...this.user, ...response.data };
        return { success: true };
      } catch (err: any) {
        this.error = err.response?.data?.message || '更新失败';
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    /**
     * 检查认证状态持久化
     */
    async checkAuthState() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        try {
          await this.fetchUserProfile();
          // 如果 user 还是 null，说明 token 无效，强制清空
          if (!this.user) {
            this.token = null;
            localStorage.removeItem('token');
          }
        } catch {
          this.token = null;
          localStorage.removeItem('token');
        }
      }
      this.isAuthReady = true;
    },
  },
});
