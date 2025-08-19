/*
 * @Author: yzy
 * @Date: 2025-08-16 10:23:53
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-19 10:12:22
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

const localIp = getLocalIp()

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  server: {
    host: '0.0.0.0', // 允许所有网络接口访问
    port: 5173, // 指定端口号（可选）
    strictPort: true, // 如果端口被占用则报错
    open: false, // 不自动打开浏览器

    // 启用更快的预加载
    preTransformRequests: true,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // 将 IP 地址和端口号注入为环境变量
  define: {
    'import.meta.env.VITE_DEV_IP': JSON.stringify(localIp),
    'import.meta.env.VITE_DEV_PORT': JSON.stringify(5173), // 或者从 server.port 中动态获取
  },
})
