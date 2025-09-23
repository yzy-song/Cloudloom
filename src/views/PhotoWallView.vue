<template>
  <div class="bg-[#FBF9F6] min-h-screen">
    <!-- 标题和描述 + 上传按钮 -->
    <section class="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center">
      <div class="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div class="flex-1">
          <h1 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4 text-center md:text-left">
            {{ t('photowall.title') }}
          </h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto md:mx-0 text-center md:text-left">
            {{ t('photowall.description') }}
          </p>
        </div>
        <div class="mt-6 md:mt-0">
          <button class="btn btn-primary" @click="showUploadModal = true" v-if="authStore.isAuthenticated">上传照片</button>
          <button class="btn btn-outline" @click="router.push('/login')" v-else>登录后上传照片</button>
        </div>
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
            class="absolute inset-0 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
            :class="'photo-mask'"
          >
            <p class="text-white text-sm md:text-base text-center font-semibold mb-2">
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

    <!-- 多图上传弹窗 -->
    <transition name="fade">
      <div
        v-if="showUploadModal"
        class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
        @click.self="showUploadModal = false"
      >
        <div class="bg-white rounded-2xl shadow-hanfu-lg w-full max-w-md relative flex flex-col items-center px-8 py-10">
          <button
            class="absolute top-5 right-5 text-hanfu-dark hover:text-hanfu-red text-2xl transition-colors"
            @click="showUploadModal = false"
            aria-label="关闭"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
          <div class="flex flex-col items-center mb-6">
            <div class="bg-hanfu-gold rounded-full p-3 mb-2 shadow">
              <svg width="32" height="32" fill="none" stroke="#c03a2b" stroke-width="2" viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <circle cx="8" cy="13" r="2" />
                <path d="M21 15l-5-5-4 4-2-2-4 4" />
              </svg>
            </div>
            <h2 class="text-2xl font-display font-bold text-hanfu-dark mb-1">上传照片</h2>
            <p class="text-sm text-hanfu-blue">支持多张图片，描述可选</p>
          </div>
          <form @submit.prevent="handlePhotoUpload" class="w-full">
            <label class="block mb-4 cursor-pointer">
              <input type="file" accept="image/*" multiple @change="onFilesChange" required class="hidden" />
              <div
                class="flex items-center justify-center border-2 border-dashed border-hanfu-gold rounded-xl py-4 hover:border-hanfu-red transition-colors bg-stone-50"
              >
                <svg width="24" height="24" fill="none" stroke="#c03a2b" stroke-width="2" viewBox="0 0 24 24" class="mr-2">
                  <path d="M12 16v-8M8 12l4-4 4 4" />
                  <rect x="4" y="4" width="16" height="16" rx="4" />
                </svg>
                <span class="text-hanfu-dark font-medium">
                  {{ uploadFiles.length ? `已选择 ${uploadFiles.length} 张图片` : '点击选择图片' }}
                </span>
              </div>
            </label>
            <!-- 已选图片列表 -->
            <div v-if="uploadFiles.length" class="mb-4 space-y-2">
              <div
                v-for="(file, idx) in uploadFiles"
                :key="file.name + idx"
                class="flex items-center bg-stone-50 rounded-lg px-3 py-2 border border-hanfu-gold"
              >
                <span class="flex-1 truncate text-hanfu-dark">{{ file.name }}</span>
                <input
                  type="text"
                  v-model="uploadAlts[idx]"
                  :placeholder="`照片${idx + 1}描述（可选）`"
                  class="ml-2 w-40 border border-hanfu-gold rounded px-2 py-1 focus:border-hanfu-red focus:outline-none transition font-body text-hanfu-dark bg-white"
                />
                <button
                  type="button"
                  class="ml-2 text-hanfu-red hover:text-hanfu-dark px-2 py-1 rounded transition"
                  @click="removeFile(idx)"
                  aria-label="删除"
                >
                  <!-- 垃圾桶图标 -->
                  <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <rect x="5" y="6" width="14" height="14" rx="2" />
                    <path d="M10 11v6M14 11v6" />
                  </svg>
                </button>
              </div>
            </div>
            <button type="submit" class="mt-6 w-full btn-primary text-lg rounded-full shadow-hanfu font-display" :disabled="uploading">
              {{ uploading ? '上传中...' : '上传' }}
            </button>
          </form>
          <div v-if="uploadError" class="text-hanfu-red mt-4 text-center font-medium">{{ uploadError }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { uploadFiles as uploadFilesApi } from '@api/endpoints/uploads';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { usePhotoStore } from '@/stores/photo.store';
import { getBackendAssetURL } from '@/utils/url';

const { t } = useI18n();
const photoStore = usePhotoStore();
const router = useRouter();
const authStore = useAuthStore();

const selectedPhoto = ref<any>(null);
const currentIndex = ref(-1);
const showUploadModal = ref(false);
const uploadFiles = ref<File[]>([]);
const uploadAlts = ref<string[]>([]);
const uploading = ref(false);
const uploadError = ref('');

const openModal = (photo: any, index: number) => {
  selectedPhoto.value = photo;
  currentIndex.value = index;
  document.body.style.overflow = 'hidden';
};
const closeModal = () => {
  selectedPhoto.value = null;
  currentIndex.value = -1;
  document.body.style.overflow = '';
};
const nextPhoto = () => {
  const nextIndex = (currentIndex.value + 1) % photoStore.photos.length;
  selectedPhoto.value = photoStore.photos[nextIndex];
  currentIndex.value = nextIndex;
};
const prevPhoto = () => {
  const prevIndex = (currentIndex.value - 1 + photoStore.photos.length) % photoStore.photos.length;
  selectedPhoto.value = photoStore.photos[prevIndex];
  currentIndex.value = prevIndex;
};
const onFilesChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  uploadFiles.value = files ? Array.from(files) : [];
  uploadAlts.value = uploadFiles.value.map(() => '');
};
const handlePhotoUpload = async () => {
  if (!uploadFiles.value.length) {
    uploadError.value = '请选择图片文件';
    return;
  }
  uploading.value = true;
  uploadError.value = '';
  try {
    // 调用你封装好的批量上传方法
    await uploadFilesApi(uploadFiles.value, 'photowall');
    showUploadModal.value = false;
    uploadFiles.value = [];
    uploadAlts.value = [];
    photoStore.fetchPhotos(); // 上传成功后刷新照片墙
  } catch (err) {
    uploadError.value = '上传失败，请重试';
  } finally {
    uploading.value = false;
  }
};

const removeFile = (idx: number) => {
  uploadFiles.value.splice(idx, 1);
  uploadAlts.value.splice(idx, 1);
};

onMounted(() => {
  photoStore.fetchPhotos();
});
</script>

<style scoped>
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

.photo-mask {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0) 100%);
  transform: translateY(30px);
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.group:hover .photo-mask {
  opacity: 1;
  transform: translateY(0);
}
</style>
