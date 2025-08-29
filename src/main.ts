/*
 * @Author: yzy
 * @Date: 2025-08-20 16:35:27
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-29 09:40:44
 */
// src/main.ts

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// 导入异步创建i18n实例的函数
import { createI18nInstance } from './i18n'
import router from './router'

import { useAuthStore } from './stores/auth.store' // 请根据你的实际路径调整
import { installLogger } from '@/utils/logger'
import './assets/styles/main.css'

// 异步启动应用
async function startApp() {
  const app = createApp(App)
  const pinia = createPinia()

  if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
    logger.log('Starting MSW...')
    try {
      if (typeof window !== 'undefined') {
        const { startMockServiceWorker } = await import('./mocks/browser')
        await startMockServiceWorker()
        logger.log('MSW successfully started.')
      }
    } catch (error) {
      logger.error('Failed to start MSW:', error)
    }
  }

  installLogger(app, { persistErrors: true })

  // 确保i18n实例和语言包加载完成后，再挂载应用
  const i18n = await createI18nInstance()

  router.beforeEach((to, from, next) => {
    // 动态设置页面标题
    const titleKey = to.meta.titleKey as string
    const brandName = i18n.global.t('brand.name') // 从语言包获取品牌名

    if (titleKey) {
      // 使用 i18n.global.t 来翻译
      document.title = `${i18n.global.t(titleKey)} - ${brandName}`
    } else {
      document.title = brandName
    }

    // 检查是否启用认证检查
    const enableAuth = import.meta.env.VITE_ENABLE_AUTH === 'true'
    if (!enableAuth) {
      next()
      return
    }

    const authStore = useAuthStore(pinia) // 确保在 router 守卫中 pinia 已初始化

    // 初始化用户状态
    authStore.initAuth()

    // 检查是否需要认证
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
      return
    }

    // 检查是否需要访客状态（已登录用户不能访问登录页）
    if (to.meta.requiresGuest && authStore.isAuthenticated) {
      next({ path: '/' })
      return
    }

    next()
  })

  // 挂载应用
  app.use(pinia)
  app.use(router)
  app.use(i18n)
  app.mount('#app')

  logger.log(`Application started with locale: ${i18n.global.locale.value}`)
}

// 启动应用
startApp()
