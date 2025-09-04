<template>
  <div class="bg-[#FBF9F6] min-h-screen">
    <!-- 摄影作品墙标题和描述 -->
    <section class="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center">
      <div class="max-w-screen-xl mx-auto">
        <h1 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">摄影作品墙</h1>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          专业摄影师的镜头下，汉服之美被永久定格。每一张照片，都是一个关于风雅与浪漫的故事。
        </p>
      </div>
    </section>

    <!-- 动态瀑布流照片墙 -->
    <section class="px-4 sm:px-6 lg:px-8 pb-24">
      <div class="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 max-w-screen-xl mx-auto">
        <div
          v-for="(photo, index) in photos"
          :key="index"
          class="relative group break-inside-avoid-column mb-4 md:mb-6 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
          @click="openModal(photo, index)"
        >
          <!-- 图片 -->
          <img
            :src="photo.src"
            :alt="photo.alt"
            loading="lazy"
            class="w-full object-cover rounded-xl transition-opacity duration-300 group-hover:opacity-80"
          />
          <!-- 悬停标题 -->
          <div
            class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <p class="text-white text-sm md:text-base text-center font-semibold">
              {{ photo.alt }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 全屏模态框 (Lightbox) -->
    <transition name="fade">
      <div
        v-if="selectedPhoto"
        class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4 md:p-8"
        @click.self="closeModal"
      >
        <div class="relative max-w-6xl max-h-full">
          <!-- 关闭按钮 -->
          <button
            class="absolute top-4 right-4 text-white text-4xl leading-none font-light z-10 transition-transform duration-200 hover:scale-110"
            @click="closeModal"
          >
            &times;
          </button>
          <!-- 上一张按钮 -->
          <button
            class="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl z-10 opacity-70 hover:opacity-100 transition-opacity"
            @click="prevPhoto"
          >
            &lsaquo;
          </button>
          <!-- 下一张按钮 -->
          <button
            class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl z-10 opacity-70 hover:opacity-100 transition-opacity"
            @click="nextPhoto"
          >
            &rsaquo;
          </button>
          <!-- 全屏照片 -->
          <img
            :src="selectedPhoto.src"
            :alt="selectedPhoto.alt"
            class="max-w-full max-h-[90vh] rounded-xl shadow-2xl animate-fade-in"
          />
          <!-- 照片标题 -->
          <p class="mt-4 text-center text-white text-lg font-light">
            {{ selectedPhoto.alt }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Photo {
  src: string
  alt: string
  width: number
  height: number
}

// Helper function to generate placeholder image URLs with random sizes
const generatePlaceholder = (baseWidth: number, baseHeight: number): Photo => {
  // Generate a random aspect ratio
  const ratio = 0.8 + Math.random() * 0.4 // between 0.8 and 1.2
  const width = Math.floor(baseWidth)
  const height = Math.floor(baseHeight * ratio)

  // Randomize a placeholder color palette for visual variety
  const palettes = [
    { bg: 'F0D9C7', fg: '8F4846' }, // Peach-red
    { bg: 'D4B8A3', fg: '5E412F' }, // Light brown-dark brown
    { bg: 'B8D2D0', fg: '3D6B77' }, // Blue-gray
    { bg: 'A391A1', fg: '5B395E' }, // Gray-purple
    { bg: 'E8D9C0', fg: '957B54' }, // Sand-brown
  ]
  const randomPalette = palettes[Math.floor(Math.random() * palettes.length)]

  return {
    src: `https://placehold.co/${width}x${height}/${randomPalette.bg}/${randomPalette.fg}?text=Hanfu`,
    alt: '汉服摄影',
    width: width,
    height: height,
  }
}

// Generate 30 photos with varying sizes
const photos: Photo[] = Array.from({ length: 30 }, (_, i) => {
  const baseWidth = Math.random() > 0.5 ? 800 : 900
  const baseHeight = Math.random() > 0.5 ? 1200 : 1350
  const photo = generatePlaceholder(baseWidth, baseHeight)
  photo.alt = `汉服摄影作品 ${i + 1}`
  return photo
})

// 洗牌函数以打乱图片顺序，让布局看起来更自然
function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const shuffledPhotos = shuffle([...photos])

// 当前选中的照片对象
const selectedPhoto = ref<null | Photo>(null)
const currentIndex = ref(-1)

// --- 模态框 (Lightbox) 交互逻辑 ---

/**
 * 打开模态框并显示选定的照片。
 * @param photo 要显示的特定照片对象
 * @param index 照片在数组中的索引
 */
const openModal = (photo: Photo, index: number) => {
  selectedPhoto.value = photo
  currentIndex.value = index
  // 阻止页面滚动
  document.body.style.overflow = 'hidden'
}

/**
 * 关闭模态框。
 */
const closeModal = () => {
  selectedPhoto.value = null
  currentIndex.value = -1
  // 恢复页面滚动
  document.body.style.overflow = ''
}

/**
 * 切换到下一张照片。
 */
const nextPhoto = () => {
  const nextIndex = (currentIndex.value + 1) % photos.length
  selectedPhoto.value = photos[nextIndex]
  currentIndex.value = nextIndex
}

/**
 * 切换到上一张照片。
 */
const prevPhoto = () => {
  const prevIndex = (currentIndex.value - 1 + photos.length) % photos.length
  selectedPhoto.value = photos[prevIndex]
  currentIndex.value = prevIndex
}
</script>

<style scoped>
/* 模态框过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 照片进入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
