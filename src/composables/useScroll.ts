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
 * 跟踪页面的滚动方向。
 * @returns 返回一个包含响应式布尔值的对象，如 isScrollingDown。
 */
export function useScrollDirection() {
  const lastScrollY = ref(window.scrollY)
  const isScrollingDown = ref(false)

  const handleScrollDirection = () => {
    const currentScrollY = window.scrollY
    if (currentScrollY > lastScrollY.value) {
      isScrollingDown.value = true
    } else {
      isScrollingDown.value = false
    }
    lastScrollY.value = currentScrollY
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScrollDirection, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScrollDirection)
  })

  return {
    isScrollingDown: readonly(isScrollingDown),
  }
}
