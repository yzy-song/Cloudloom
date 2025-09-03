import { ref, onMounted, onUnmounted, readonly } from 'vue'

/**
 * 一个组合式函数，用于跟踪常见的屏幕尺寸,判断是否移动端设备
 * @returns 返回一个包含响应式布尔值的对象，如 isMobile。
 */
export function useDeviceCheck() {
  const isMobile = ref(window.innerWidth < 768)

  const checkDevice = () => {
    isMobile.value = window.innerWidth < 768
  }

  onMounted(() => {
    window.addEventListener('resize', checkDevice)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkDevice)
  })

  return {
    isMobile: readonly(isMobile),
  }
}
