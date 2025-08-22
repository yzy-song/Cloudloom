/*
 * @Author: yzy
 * @Date: 2025-08-16 10:23:53
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-22 11:33:23
 */
import { fileURLToPath, URL } from 'node:url'
import os from 'os'
import { resolve } from 'path'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
// 获取本地IP地址 - 使用os模块替代address模块
const getLocalIp = () => {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal && iface.address) {
        return iface.address
      }
    }
  }
  return 'localhost'
}

// 导出 defineConfig 函数，并传入环境参数
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  const devIp = isProd ? 'cloudloom.yzysong.com' : getLocalIp()
  const devPort = isProd ? '80' : 5173

  return {
    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss(),
      AutoImport({
        // 配置需要自动导入的库
        imports: [
          'vue', // 自动导入 Vue 相关函数（ref, reactive, onMounted 等）
          'vue-router', // 自动导入 vue-router 的 API（useRoute, useRouter）
          'pinia', // 自动导入 Pinia 的 API（storeToRefs, defineStore）
          {
            // 第三方库的命名导入（如 lodash 的 debounce）
            lodash: [
              ['debounce', '_debounce'], // import { debounce as _debounce } from 'lodash'
            ],
          },
          {
            '@/utils/logger': ['logger'], // 自动解析为 inject('logger')
          },
        ],
        // 生成自动导入的 TypeScript 声明文件（解决 ESLint/TS 报错）
        dts: 'src/auto-imports.d.ts',
        // 自定义解析器（可选，如需要支持 Nuxt 等）
        resolvers: [
          /* ... */
        ],
      }),
    ],
    server: {
      host: '0.0.0.0', // 允许所有网络接口访问
      port: 5173, // 指定端口号（可选）
      strictPort: true, // 如果端口被占用则报错
      open: false, // 不自动打开浏览器
      preTransformRequests: true,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      'import.meta.env.VITE_DEV_IP': JSON.stringify(devIp),
      'import.meta.env.VITE_DEV_PORT': JSON.stringify(devPort),
    },
    // **确保这部分配置被正确添加**
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          survey: resolve(__dirname, 'survey.html'),
        },
      },
    },
  }
})
