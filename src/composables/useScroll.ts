import { ref, onMounted, onUnmounted, readonly } from 'vue'

/**
 * 跟踪页面滚动位置和状态。
 * @param {number} scrollThreshold - 触发 isScrolled 状态的滚动阈值。
 * @returns 包含滚动位置 (scrollY) 和是否已滚动 (isScrolled) 的响应式引用的对象。
 */
export function useScroll(scrollThreshold = 50) {
  const scrollY = ref(window.scrollY)
  const isScrolled = ref(window.scrollY > scrollThreshold)

  const handleScroll = () => {
    scrollY.value = window.scrollY
    isScrolled.value = window.scrollY > scrollThreshold
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    scrollY: readonly(scrollY),
    isScrolled: readonly(isScrolled),
  }
}

/**
 * 跟踪页面滚动方向。
 * @returns 包含是否向下滚动 (isScrollingDown) 的响应式引用的对象。
 */
export function useScrollDirection() {
  const isScrollingDown = ref(false)
  let lastScrollY = 0

  const handleScroll = () => {
    const currentScrollY = window.scrollY
    isScrollingDown.value = currentScrollY > lastScrollY
    lastScrollY = currentScrollY
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    isScrollingDown: readonly(isScrollingDown),
  }
}
