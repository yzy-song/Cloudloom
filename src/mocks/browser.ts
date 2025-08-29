import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// 创建worker实例
export const worker = setupWorker(...handlers)

// 启动worker的函数
export const startMockServiceWorker = async () => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
      quiet: false, // 显示日志信息
    })
    logger.log('MSW worker started successfully')
  } catch (error) {
    logger.warn('MSW worker failed to start:', error)
  }
}
