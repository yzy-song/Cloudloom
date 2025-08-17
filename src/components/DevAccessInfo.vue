<template>
  <div
    v-if="devStore.devPanelVisible"
    class="fixed bottom-4 right-4 bg-white shadow-lg rounded-xl p-4 max-w-xs z-50 border border-gray-200"
  >
    <!-- 标题栏 -->
    <div class="flex justify-between items-center mb-3">
      <div class="flex items-center">
        <div class="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
        <h3 class="font-medium text-gray-900">开发模式</h3>
      </div>
      <!-- 关闭按钮 -->
      <button
        @click="closePanel"
        class="text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="关闭面板"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- 内容区域 -->
    <p class="text-sm text-gray-600 mb-2">手机访问地址:</p>
    <div class="bg-gray-100 p-2 rounded mb-3">
      <code class="text-xs break-all">{{ accessUrl }}</code>
    </div>

    <!-- 操作按钮 -->
    <div class="flex justify-between">
      <button
        @click="copyUrl"
        class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition"
      >
        复制地址
      </button>
      <button
        @click="toggleQrCode"
        class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200 transition"
      >
        {{ devStore.showQrCode ? '隐藏二维码' : '显示二维码' }}
      </button>
    </div>

    <!-- 二维码区域 -->
    <div v-if="devStore.showQrCode" class="mt-3 flex justify-center">
      <div class="bg-white p-2 rounded border border-gray-200">
        <img :src="qrCodeUrl" alt="访问二维码" class="w-32 h-32" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDevStore } from '@/stores/devStore'
// 控制组件是否显示
const isVisible = ref(true)

// 控制二维码显示
const showQrCode = ref(false)
const showPanel = ref(false)

// 获取当前URL
const accessUrl = ref('')
const qrCodeUrl = computed(() => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(accessUrl.value)}`
})

onMounted(() => {
  if (import.meta.env.DEV) {
    // 获取当前主机地址
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    const port = window.location.port

    accessUrl.value = `${protocol}//${hostname}:${port}`

    // 从本地存储获取面板状态
    const savedState = localStorage.getItem('devPanelVisible')
    if (savedState !== null) {
      isVisible.value = savedState === 'true'
    }
  }
})
const devStore = useDevStore()

// 复制URL到剪贴板
function copyUrl() {
  navigator.clipboard.writeText(accessUrl.value)
  alert('已复制到剪贴板！')
}

// 关闭面板
function closePanel() {
  showPanel.value = false
  devStore.devPanelVisible = showPanel.value
}

// 切换二维码显示
function toggleQrCode() {
  showQrCode.value = !showQrCode.value
  devStore.showQrCode = showQrCode.value
}
</script>

<style scoped>
/* 添加平滑动画 */
.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
