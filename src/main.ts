/*
 * @Author: yzy
 * @Date: 2025-08-20 16:35:27
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-29 11:36:51
 */
import { createApp, watchEffect } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createI18nInstance } from './i18n'
import { createRouterInstance } from './router' // 从 router/index.ts 导入创建函数
import { useAuthStore } from './stores/auth.store'
import { installLogger, logger } from '@/utils/logger' // 确保同时导入 logger
import './assets/styles/main.css'

async function startApp() {
  const app = createApp(App)

  // 安装 Logger
  installLogger(app)

  const pinia = createPinia()
  app.use(pinia)

  // 使用导入的函数创建 router 实例
  const router = createRouterInstance()
  // 不再需要 await
  const i18n = createI18nInstance()

  // 1. 导航守卫逻辑 (保持不变)
  router.beforeEach((to, from, next) => {
    const enableAuth = import.meta.env.VITE_ENABLE_AUTH === 'true'
    if (enableAuth) {
      const authStore = useAuthStore()
      // Pinia store 在这里可以安全使用，因为 app.use(pinia) 已经执行

      if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        logger.warn('Route requires auth, but user is not authenticated. Redirecting to login.')
        next({ name: 'Login', query: { redirect: to.fullPath } })
      } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
        logger.debug('Route requires guest, but user is authenticated. Redirecting to home.')
        next('/')
      } else {
        next()
      }
    } else {
      next()
    }
  })

  // 2. 使用 watchEffect 响应式地更新标题 (保持不变)
  watchEffect(() => {
    const route = router.currentRoute.value
    const titleKey = route.meta.titleKey as string

    const brandName = i18n.global.t('brand.name')
    const pageTitle = titleKey ? i18n.global.t(titleKey) : ''

    if (pageTitle && pageTitle !== titleKey) {
      document.title = `${pageTitle} - ${brandName}`
    } else {
      document.title = brandName
    }
  })

  // 依次注册插件
  app.use(i18n)
  app.use(router)

  // 挂载应用
  app.mount('#app')
}

startApp()
