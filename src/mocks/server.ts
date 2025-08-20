import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// 创建server实例
export const server = setupServer(...handlers)

// 启动server的函数
export const startMockServer = () => {
  server.listen({
    onUnhandledRequest: 'bypass',
  })
  console.log('MSW server started successfully')

  return server
}

// 关闭server的函数
export const closeMockServer = () => {
  server.close()
  console.log('MSW server closed')
}
