/*
 * @Author: yzy
 * @Date: 2025-08-20 16:35:27
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-29 08:06:16
 */
// src/main.ts

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// 导入异步创建i18n实例的函数
import { createI18nInstance } from './i18n'
import router from './router'

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

  // 挂载应用
  app.use(pinia)
  app.use(router)
  app.use(i18n)
  app.mount('#app')

  logger.log(`Application started with locale: ${i18n.global.locale.value}`)
}

// 启动应用
startApp()
