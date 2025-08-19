/*
 * @Author: yzy
 * @Date: 2025-08-16 10:23:53
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-19 10:36:35
 */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import os from 'os'

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
  const devPort = isProd ? '80' : 5173 // 生产环境默认使用80端口

  return {
    plugins: [vue(), vueDevTools(), tailwindcss()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      open: false,
      preTransformRequests: true,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // 将 IP 地址和端口号注入为环境变量
    define: {
      'import.meta.env.VITE_DEV_IP': JSON.stringify(devIp),
      'import.meta.env.VITE_DEV_PORT': JSON.stringify(devPort),
    },
  }
})
