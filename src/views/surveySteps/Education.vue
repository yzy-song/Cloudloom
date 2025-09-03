<template>
  <div class="w-full max-w-7xl mx-auto p-4 sm:p-6">
    <div
      class="relative w-full h-96 overflow-hidden rounded-lg shadow-xl"
      @mousedown="handleMouseDown"
      @touchstart="wrappedTouchStart"
      @mouseup="handleMouseUp"
      @touchend="wrappedTouchEnd"
      @mousemove="handleMouseMove"
      @touchmove="wrappedTouchMove"
      @mouseleave="handleMouseUp"
    >
      <!-- 轮播图区域 -->
      <div
        v-for="(image, index) in images"
        :key="index"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :class="{ 'opacity-100': currentIndex === index, 'opacity-0': currentIndex !== index }"
      >
        <img :src="image.url" :alt="image.alt" class="w-full h-full object-cover" />
      </div>

      <!-- 文字内容区域，层级更高 -->
      <div
        class="absolute inset-0 flex flex-col justify-end p-8 z-10 sm:justify-center sm:items-center"
      >
        <!-- 半透明背景渐变蒙版 -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-0"
        ></div>
        <div class="relative z-10 w-full sm:text-center">
          <!-- 动态变化的文字颜色 -->
          <div
            class="transition-colors duration-500 ease-in-out px-4 sm:px-0"
            :style="{ color: textColor }"
          >
            <h2 class="text-2xl sm:text-4xl font-bold mb-2 md:mb-4">
              {{ t('education.title') }}
            </h2>
            <p class="text-sm sm:text-lg max-w-2xl sm:mx-auto">
              {{ t('education.description') }}
            </p>
          </div>
        </div>
      </div>

      <!-- 左右切换按钮 -->
      <button
        @click="prevImage"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/30 hover:bg-white/50 rounded-full transition-colors duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          class="w-6 h-6 text-gray-800"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        @click="nextImage"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/30 hover:bg-white/50 rounded-full transition-colors duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          class="w-6 h-6 text-gray-800"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDeviceCheck } from '@/composables/useDeviceCheck'
import { useSwipe } from '@/composables/useSwipe'

// 响应式地判断是否为移动端
const { isMobile } = useDeviceCheck()

// 国际化
const { t } = useI18n()

// 基础图片数据，只包含文件名
const baseImages = [
  { fileName: 'example_001.jpeg', alt: 'Image 1' },
  { fileName: 'example_002.jpeg', alt: 'Image 2' },
  { fileName: 'example_003.jpeg', alt: 'Image 3' },
  { fileName: 'example_004.jpeg', alt: 'Image 4' },
  { fileName: 'example_005.jpeg', alt: 'Image 5' },
  { fileName: 'example_006.jpeg', alt: 'Image 6' },
  { fileName: 'example_007.jpeg', alt: 'Image 7' },
  { fileName: 'example_008.jpeg', alt: 'Image 8' },
  { fileName: 'example_009.jpeg', alt: 'Image 9' },
  { fileName: 'example_010.jpeg', alt: 'Image 10' },
  { fileName: 'example_011.jpeg', alt: 'Image 11' },
]

// 使用计算属性动态生成完整的图片URL
const images = computed(() => {
  const path = isMobile.value ? '/images/survey/example/mobile/' : '/images/survey/example/pc/'
  return baseImages.map((img) => ({
    ...img,
    url: `${path}${img.fileName}`,
  }))
})

const currentIndex = ref(0)
let interval: number | undefined

const startX = ref(0)
const endX = ref(0)
const isSwiping = ref(false)

// 计算文字颜色，根据当前图片的背景色动态调整
const textColor = computed(() => {
  const currentImageUrl = images.value[currentIndex.value].url
  if (currentImageUrl.includes('4F6984') || currentImageUrl.includes('A692B8')) {
    return '#E5E7EB' // 浅灰色，适合深色背景
  } else {
    return '#1F2937' // 深灰色，适合浅色背景
  }
})

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
}

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}

// 自动轮播
const startCarousel = () => {
  if (interval) clearInterval(interval)
  interval = window.setInterval(() => {
    nextImage()
  }, 2000) // 每2秒切换一次
}

// 停止自动轮播
const stopCarousel = () => {
  clearInterval(interval)
  interval = undefined
}

// 鼠标事件处理 (保持不变)
const handleMouseDown = (event: MouseEvent) => {
  stopCarousel()
  startX.value = event.clientX
  isSwiping.value = true
}

const handleMouseUp = () => {
  if (!isSwiping.value) return
  isSwiping.value = false
  const deltaX = endX.value - startX.value
  if (Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      prevImage()
    } else {
      nextImage()
    }
  }
  startCarousel()
}

const handleMouseMove = (event: MouseEvent) => {
  if (!isSwiping.value) return
  endX.value = event.clientX
}

// 使用 useSwipe 处理触摸事件
const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({
  onSwipeLeft: nextImage,
  onSwipeRight: prevImage,
  threshold: 50,
})

// 包装触摸处理函数以集成轮播控制
const wrappedTouchStart = (event: TouchEvent) => {
  stopCarousel()
  handleTouchStart(event)
}

const wrappedTouchMove = (event: TouchEvent) => {
  handleTouchMove(event)
}

const wrappedTouchEnd = () => {
  handleTouchEnd()
  startCarousel()
}

onMounted(() => {
  startCarousel()
})

onUnmounted(() => {
  stopCarousel()
})
</script>
