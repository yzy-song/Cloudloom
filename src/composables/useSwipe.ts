import { ref } from 'vue'

/**
 * 提供处理触摸滑动事件的逻辑。
 * @param {object} options - 配置项。
 * @param {function} options.onSwipeLeft - 向左滑动时触发的回调。
 * @param {function} options.onSwipeRight - 向右滑动时触发的回调。
 * @param {number} [options.threshold=50] - 触发滑动的最小距离阈值。
 * @returns 用于绑定到模板事件的函数。
 */
export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: {
  onSwipeLeft: () => void
  onSwipeRight: () => void
  threshold?: number
}) {
  const touchStartX = ref(0)
  const touchEndX = ref(0)

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.value = e.touches[0].clientX
    touchEndX.value = 0 // 重置
  }

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.value = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.value || !touchEndX.value) return

    const diff = touchStartX.value - touchEndX.value

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        onSwipeLeft() // 向左滑动
      } else {
        onSwipeRight() // 向右滑动
      }
    }

    // 重置
    touchStartX.value = 0
    touchEndX.value = 0
  }

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}
