/*
 * @Author: yzy
 * @Date: 2025-08-20 15:47:56
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-21 13:15:02
 */
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// 创建server实例
export const server = setupServer(...handlers)

// 启动server的函数
export const startMockServer = () => {
  server.listen({
    onUnhandledRequest: 'bypass',
  })
  logger.log('MSW server started successfully')

  return server
}

// 关闭server的函数
export const closeMockServer = () => {
  server.close()
  logger.log('MSW server closed')
}
