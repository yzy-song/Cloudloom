<template>
  <div class="bg-[#FBF9F6] min-h-screen">
    <!-- 标题和描述 -->
    <section class="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center">
      <div class="max-w-screen-xl mx-auto">
        <h1 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
          {{ t('photowall.title') }}
        </h1>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          {{ t('photowall.description') }}
        </p>
      </div>
    </section>

    <!-- 照片墙 -->
    <section class="px-4 sm:px-6 lg:px-8 pb-24">
      <div class="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 max-w-screen-xl mx-auto">
        <div
          v-for="(photo, index) in photoStore.photos"
          :key="photo.id"
          class="relative group break-inside-avoid-column mb-4 md:mb-6 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
          @click="openModal(photo, index)"
        >
          <img
            :src="getBackendAssetURL(photo.url)"
            :alt="photo.alt || `PHOTO ${index + 1}`"
            loading="lazy"
            class="w-full object-cover rounded-xl transition-opacity duration-300 group-hover:opacity-80"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <p class="text-white text-sm md:text-base text-center font-semibold">
              {{ photo.alt || `PHOTO ${index + 1}` }}
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
          <button
            class="absolute top-4 right-4 text-white text-4xl leading-none font-light z-10 transition-transform duration-200 hover:scale-110"
            @click="closeModal"
          >
            &times;
          </button>
          <button
            class="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl z-10 opacity-70 hover:opacity-100 transition-opacity"
            @click="prevPhoto"
          >
            &lsaquo;
          </button>
          <button
            class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl z-10 opacity-70 hover:opacity-100 transition-opacity"
            @click="nextPhoto"
          >
            &rsaquo;
          </button>
          <img
            :src="getBackendAssetURL(selectedPhoto.url)"
            :alt="selectedPhoto.alt"
            class="max-w-full max-h-[90vh] rounded-xl shadow-2xl animate-fade-in"
          />
          <p class="mt-4 text-center text-white text-lg font-light">
            {{ selectedPhoto.alt }}
          </p>
        </div>
      </div>
    </transition>

    <!-- 在照片墙页面右上角加上传按钮 -->
    <div class="flex justify-end mb-6">
      <button class="btn btn-primary" @click="handleUploadClick" v-if="authStore.isAuthenticated">
        上传照片
      </button>
      <button class="btn btn-outline" @click="router.push('/login')" v-else>登录后上传照片</button>
    </div>
    <!-- 上传弹窗/表单可用 <input type="file"> 或自定义组件 -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { usePhotoStore } from '@/stores/photo.store'
import { getBackendAssetURL } from '@/utils/url'

const { t } = useI18n()
const photoStore = usePhotoStore()
const router = useRouter()
const authStore = useAuthStore()

const selectedPhoto = ref<any>(null)
const currentIndex = ref(-1)

const openModal = (photo: any, index: number) => {
  selectedPhoto.value = photo
  currentIndex.value = index
  document.body.style.overflow = 'hidden'
}
const closeModal = () => {
  selectedPhoto.value = null
  currentIndex.value = -1
  document.body.style.overflow = ''
}
const nextPhoto = () => {
  const nextIndex = (currentIndex.value + 1) % photoStore.photos.length
  selectedPhoto.value = photoStore.photos[nextIndex]
  currentIndex.value = nextIndex
}
const prevPhoto = () => {
  const prevIndex = (currentIndex.value - 1 + photoStore.photos.length) % photoStore.photos.length
  selectedPhoto.value = photoStore.photos[prevIndex]
  currentIndex.value = prevIndex
}
const handleUploadClick = () => {
  // 处理上传逻辑
}

onMounted(() => {
  photoStore.fetchPhotos()
})
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
