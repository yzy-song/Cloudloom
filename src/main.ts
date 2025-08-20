/*
 * @Author: yzy
 * @Date: 2025-08-16 10:23:53
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-20 16:20:53
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/styles/main.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)

// 启动MSW
const startMockService = async () => {
  if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
    if (typeof window !== 'undefined') {
      // 浏览器环境
      const { startMockServiceWorker } = await import('./mocks/browser')
      await startMockServiceWorker()
    } else {
      // Node环境 (测试时使用)
      const { startMockServer } = await import('./mocks/server')
      startMockServer()
    }
  }
}

// 启动应用
startMockService()
  .then(() => {
    app.mount('#app')
  })
  .catch((error) => {
    console.error('Failed to start mock service:', error)
    app.mount('#app') // 即使mock失败也继续启动应用
  })
