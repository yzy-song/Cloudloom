/*
 * @Author: yzy
 * @Date: 2025-08-20 16:35:27
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-27 02:00:36
 */
// src/main.ts

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import i18n from './i18n'
import router from './router'

import { installLogger } from '@/utils/logger'
import './assets/styles/main.css'
const app = createApp(App)
const pinia = createPinia()

// 异步启动 MSW
async function startApp() {
  if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
    console.log('Starting MSW...')
    try {
      // 检查是否是浏览器环境
      if (typeof window !== 'undefined') {
        const { startMockServiceWorker } = await import('./mocks/browser')
        await startMockServiceWorker()
        console.log('MSW successfully started.')
      }
    } catch (error) {
      console.error('Failed to start MSW:', error)
      // 即使 MSW 失败，也让应用继续运行
    }
  }

  installLogger(app, { persistErrors: true })

  // 挂载应用
  app.use(pinia)
  app.use(router)
  app.use(i18n)
  app.mount('#app')
}

// 启动应用
startApp()
