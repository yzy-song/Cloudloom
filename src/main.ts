/*
 * @Author: yzy
 * @Date: 2025-08-20 16:35:27
 * @LastEditors: yzy
 * @LastEditTime: 2025-09-06 01:43:00
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Toaster } from 'vue-sonner'
import App from './App.vue'
import { createI18nInstance } from './i18n'
import './assets/styles/main.css'
import router from './router'
import { useAuthStore } from './stores/auth.store'
import { installLogger } from '@/utils/logger'

async function initializeApp() {
  const app = createApp(App)

  // 1. 安装 Logger 和 Pinia
  installLogger(app)
  const pinia = createPinia()
  app.use(pinia)

  // 2. 安装 i18n
  const i18n = createI18nInstance()
  app.use(i18n)

  // 3. 安装路由插件（此时不注册守卫）
  app.use(router)

  app.component('Toaster', Toaster)

  // 4. [关键步骤] 等待初始认证状态检查完成
  // 必须在路由守卫注册前完成，以确保 isAuthenticated 状态是可靠的
  const authStore = useAuthStore()
  await authStore.checkAuthState()

  // 5. [关键步骤] 在认证状态就绪后，动态注册全局导航守卫
  router.beforeEach((to, from, next) => {
    // 从环境变量决定是否启用认证逻辑
    const authEnabled = import.meta.env.VITE_ENABLE_AUTH === 'true'
    if (!authEnabled) {
      return next()
    }

    // 此刻，authStore.isAuthenticated 的值是初始化后最准确的状态
    const isAuthenticated = authStore.isAuthenticated

    if (to.meta.requiresAuth && !isAuthenticated) {
      // 如果目标路由需要认证但用户未登录，则重定向到登录页
      next({ name: 'Login', query: { redirect: to.fullPath } })
    } else if (to.meta.requiresGuest && isAuthenticated) {
      // 如果目标路由只允许访客访问但用户已登录，则重定向到首页
      next({ name: 'Home' })
    } else {
      // 其他情况，正常放行
      next()
    }
  })

  // 6. 等待路由完全就绪后，再挂载应用
  await router.isReady()
  app.mount('#app')
}

initializeApp()
