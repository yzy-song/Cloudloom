<template>
  <div class="p-8 font-sans antialiased text-gray-800 bg-gray-100 min-h-screen">
    <!-- 顶部通知栏 -->
    <div
      v-if="notification.visible"
      class="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg transition-all duration-300"
      :class="{
        'bg-green-500 text-white': notification.type === 'success',
        'bg-red-500 text-white': notification.type === 'error',
        'bg-blue-500 text-white': notification.type === 'info',
        'opacity-0': !notification.visible,
        'opacity-100': notification.visible,
      }"
    >
      {{ notification.message }}
    </div>

    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 my-12">
      <h1 class="text-3xl font-bold text-center mb-6">图片批量处理与裁剪工具</h1>

      <!-- 文件上传 -->
      <label
        for="file-upload"
        class="mb-8 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors duration-200 cursor-pointer block"
        :class="{ 'bg-gray-200 border-indigo-500': isDragging }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
      >
        <div class="flex flex-col items-center justify-center cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 mb-2 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 14.899A4.999 4.999 0 0 1 13.999 12H16a5 5 0 0 1 0 10H5a5 5 0 0 1 0-10z" />
            <path d="M12 2v10" />
            <path d="M16 6l-4-4-4 4" />
          </svg>
          <span class="text-gray-700">点击选择文件 或 拖拽文件到此区域</span>
        </div>
        <input
          id="file-upload"
          type="file"
          multiple
          @change="handleFileChange"
          class="hidden"
          ref="fileInput"
          accept="image/*"
        />
      </label>

      <!-- 批量处理 -->
      <div class="bg-gray-50 rounded-lg p-6 mb-8 shadow-inner">
        <h2 class="text-xl font-semibold mb-4">批量处理设置</h2>
        <p class="text-sm text-gray-500 mb-4">
          此处的设置将应用于所有通过“批量处理”按钮提交的“已编辑”图片。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="width" class="block text-sm font-medium text-gray-700">宽度 (px)</label>
              <input
                id="width"
                type="number"
                v-model.number="outputWidth"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label for="height" class="block text-sm font-medium text-gray-700">高度 (px)</label>
              <input
                id="height"
                type="number"
                v-model.number="outputHeight"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="format" class="block text-sm font-medium text-gray-700">格式</label>
              <select
                id="format"
                v-model="outputFormat"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
            <div class="flex flex-col justify-center">
              <label for="maintain-ratio" class="block text-sm font-medium text-gray-700 mb-2"
                >保持原比例</label
              >
              <label class="flex items-center cursor-pointer">
                <div class="relative">
                  <input
                    type="checkbox"
                    id="maintain-ratio"
                    v-model="maintainAspectRatio"
                    class="sr-only"
                  />
                  <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
                  <div
                    class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
                  ></div>
                </div>
              </label>
            </div>
          </div>
        </div>
        <button
          @click="processAllEditedImages"
          :disabled="isProcessing || images.filter((img) => img.status === 'edited').length === 0"
          class="w-full px-4 py-2 mt-6 text-white transition-colors duration-200 bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isProcessing">处理中...</span>
          <span v-else>批量处理所有“已编辑”的图片</span>
        </button>
      </div>

      <!-- 图片预览列表 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="(image, index) in images"
          :key="image.id"
          class="relative group bg-gray-50 rounded-lg shadow-md overflow-hidden"
        >
          <button
            @click="removeImage(index)"
            class="absolute top-2 right-2 p-1 text-gray-500 bg-white rounded-full shadow-md hover:text-red-500 transition-colors duration-200 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <img
            :src="image.displayUrl"
            :alt="image.name"
            class="w-full h-48 object-contain transition-all duration-300 transform group-hover:scale-105"
          />

          <div
            class="absolute inset-0 flex flex-col items-center justify-center bg-[rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <button
              @click="openCropper(index)"
              class="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              编辑
            </button>
          </div>

          <!-- 状态标签 -->
          <span
            class="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded-full shadow-md"
            :class="{
              'bg-yellow-500': image.status === 'pending',
              'bg-blue-500': image.status === 'edited',
              'bg-green-500': image.status === 'processed',
            }"
          >
            {{ { pending: '待处理', edited: '已编辑', processed: '已处理' }[image.status] }}
          </span>

          <div class="p-3">
            <p class="text-sm font-medium text-gray-700 truncate">{{ image.name }}</p>
          </div>

          <button
            @click="resetToOriginal(index)"
            :disabled="image.status === 'pending'"
            class="absolute bottom-2 left-2 px-3 py-1 text-xs text-white rounded-full shadow-md transition-colors duration-200"
            :class="{
              'bg-red-500 hover:bg-red-600': image.status !== 'pending',
              'bg-gray-400 cursor-not-allowed': image.status === 'pending',
            }"
          >
            复原
          </button>
        </div>
      </div>
    </div>

    <!-- 编辑模态框 -->
    <div
      v-show="showCropperModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 transition-opacity duration-300"
      :class="{ 'opacity-0': !showCropperModal, 'opacity-100': showCropperModal }"
    >
      <div
        class="bg-white rounded-lg shadow-2xl p-6 w-full max-w-4xl transform transition-all scale-95 duration-300"
        :class="{ 'scale-100': showCropperModal }"
      >
        <h2 class="text-2xl font-bold mb-4 text-center">图片编辑</h2>
        <div class="flex gap-6">
          <div class="w-2/3">
            <div class="cropper-container mb-4 bg-gray-100 rounded">
              <img
                ref="cropperImgRef"
                :src="currentImageForCropper"
                alt="图片预览"
                class="max-w-full"
              />
            </div>
          </div>
          <div class="w-1/3 flex flex-col gap-4">
            <!-- 尺寸与格式 -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-semibold mb-3">尺寸与格式</h3>
              <div class="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label for="modal-width" class="block text-sm font-medium text-gray-700"
                    >宽度</label
                  >
                  <input
                    id="modal-width"
                    type="number"
                    v-model.number="modalOutputWidth"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label for="modal-height" class="block text-sm font-medium text-gray-700"
                    >高度</label
                  >
                  <input
                    id="modal-height"
                    type="number"
                    v-model.number="modalOutputHeight"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm font-medium text-gray-700">保持原比例</span>
                <label for="modal-maintain-ratio" class="flex items-center cursor-pointer">
                  <div class="relative">
                    <input
                      type="checkbox"
                      id="modal-maintain-ratio"
                      v-model="maintainAspectRatioInModal"
                      @change="updateCropperAspectRatio"
                      class="sr-only"
                    />
                    <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
                    <div
                      class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
                    ></div>
                  </div>
                </label>
              </div>
            </div>
            <!-- 变换操作 -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-semibold mb-3">变换</h3>
              <div class="col-span-2 mb-3">
                <label for="rotation-range" class="block text-sm font-medium text-gray-700"
                  >旋转角度: {{ rotation }}°</label
                >
                <input
                  type="range"
                  id="rotation-range"
                  v-model="rotation"
                  min="-180"
                  max="180"
                  @input="rotateImage"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <button
                  @click="rotateImageByDegree(90)"
                  class="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  旋转90°
                </button>
                <button
                  @click="flipImage('x')"
                  class="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  水平翻转
                </button>
                <button
                  @click="zoomIn"
                  class="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  放大
                </button>
                <button
                  @click="zoomOut"
                  class="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  缩小
                </button>
              </div>
            </div>
            <button
              @click="resetImage"
              class="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              复位所有操作
            </button>
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-4">
          <button
            @click="processSingleImage"
            class="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            裁剪并处理
          </button>
          <button
            @click="applyLocalEdit"
            class="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            应用
          </button>
          <button
            @click="closeEditorAndUpdate"
            class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            关闭
          </button>
          <button
            @click="cancelCropper"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, nextTick, reactive, watch } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

// 定义图片对象接口
interface ImageItem {
  id: number
  name: string
  originalUrl: string
  displayUrl: string
  file: File
  editedBlob: Blob | null
  status: 'pending' | 'edited' | 'processed'
}

// 响应式状态变量
const images = ref<ImageItem[]>([])
const showCropperModal = ref(false)
const currentImageIndex = ref<number | null>(null)
const currentImageForCropper = ref<string>('')
const cropperImgRef = ref<HTMLImageElement | null>(null)
const cropperInstance = ref<Cropper | null>(null)

// 主界面设置
const outputWidth = ref<number>(800)
const outputHeight = ref<number>(600)
const outputFormat = ref<string>('jpeg')
const maintainAspectRatio = ref<boolean>(true)

// 编辑模态框内的独立设置
const modalOutputWidth = ref<number>(800)
const modalOutputHeight = ref<number>(600)
const maintainAspectRatioInModal = ref<boolean>(true)

const isProcessing = ref<boolean>(false)
const rotation = ref<number>(0)
const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref<boolean>(false)

const notification = reactive({
  visible: false,
  message: '',
  type: 'info' as 'success' | 'error' | 'info',
})

let fileIdCounter = 0
const flippedX = ref(1)
let tempCropperUrls: string[] = []

function showNotification(message: string, type: 'success' | 'error' | 'info') {
  notification.message = message
  notification.type = type
  notification.visible = true
  setTimeout(() => {
    notification.visible = false
  }, 3000)
}

function handleFiles(files: FileList | null) {
  if (!files || files.length === 0) {
    showNotification('请选择图片文件', 'error')
    return
  }
  for (const file of Array.from(files)) {
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      images.value.push({
        id: fileIdCounter++,
        name: file.name,
        originalUrl: url,
        displayUrl: url,
        file: file,
        editedBlob: null,
        status: 'pending',
      })
    }
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    handleFiles(target.files)
    // 清空input的值，以便于用户可以重复上传相同的文件
    target.value = ''
  }
}
const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  handleFiles(event.dataTransfer?.files ?? null)
}

function removeImage(index: number) {
  const image = images.value[index]
  if (image) {
    URL.revokeObjectURL(image.originalUrl)
    if (image.displayUrl !== image.originalUrl) {
      URL.revokeObjectURL(image.displayUrl)
    }
  }
  images.value.splice(index, 1)
  showNotification('图片已移除', 'success')
}

function openCropper(index: number) {
  currentImageIndex.value = index
  const image = images.value[index]
  if (!image) return

  // 同步主界面的宽高和比例设置到模态框
  modalOutputWidth.value = outputWidth.value
  modalOutputHeight.value = outputHeight.value
  maintainAspectRatioInModal.value = maintainAspectRatio.value

  tempCropperUrls = []
  currentImageForCropper.value = image.displayUrl
  showCropperModal.value = true
  rotation.value = 0
  flippedX.value = 1

  nextTick(() => {
    if (cropperImgRef.value) {
      if (cropperInstance.value) cropperInstance.value.destroy()
      cropperInstance.value = new Cropper(cropperImgRef.value, {
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 0.9,
        background: false,
        rotatable: true,
        cropBoxMovable: true,
        cropBoxResizable: true,
        aspectRatio:
          maintainAspectRatioInModal.value &&
          modalOutputWidth.value > 0 &&
          modalOutputHeight.value > 0
            ? modalOutputWidth.value / modalOutputHeight.value
            : NaN,
        crop(event) {
          // 实时更新裁剪框的尺寸到输入框，但只在用户通过拖拽改变裁剪框大小时触发
          // 移除这一行，改为通过 watch 来反向更新
          // modalOutputWidth.value = Math.round(event.detail.width);
          // modalOutputHeight.value = Math.round(event.detail.height);
        },
      })
    }
  })
}

// 监听模态框内的宽高变化，并同步到裁剪框
watch([modalOutputWidth, modalOutputHeight], ([newWidth, newHeight]) => {
  if (cropperInstance.value) {
    const cropBoxData = {
      width: newWidth,
      height: newHeight,
    }
    cropperInstance.value.setCropBoxData(cropBoxData)
  }
})

// 监听主界面的比例，并同步到模态框
watch(maintainAspectRatio, (newVal) => {
  maintainAspectRatioInModal.value = newVal
})

// 监听模态框的比例，并同步到主界面
watch(maintainAspectRatioInModal, (newVal) => {
  maintainAspectRatio.value = newVal
  updateCropperAspectRatio()
})

function applyLocalEdit() {
  if (!cropperInstance.value || currentImageIndex.value === null) return
  const image = images.value[currentImageIndex.value]
  const canvas = cropperInstance.value.getCroppedCanvas()
  canvas.toBlob((blob) => {
    if (blob) {
      image.editedBlob = blob
      const newTempUrl = URL.createObjectURL(blob)
      tempCropperUrls.push(newTempUrl)
      const cropper = cropperInstance.value
      if (cropper) {
        cropperImgRef.value?.addEventListener('ready', () => cropper.reset(), { once: true })
        cropper.replace(newTempUrl)
      }
      showNotification('编辑已应用，可继续操作', 'info')
    }
  }, `image/${outputFormat.value}`)
}

function closeEditorAndUpdate() {
  if (currentImageIndex.value === null) {
    cancelCropper()
    return
  }
  const image = images.value[currentImageIndex.value]
  if (image.editedBlob) {
    if (image.displayUrl !== image.originalUrl) {
      URL.revokeObjectURL(image.displayUrl)
    }
    image.displayUrl = URL.createObjectURL(image.editedBlob)
    image.status = 'edited'
    showNotification('图片已更新为编辑后状态', 'success')
  }
  closeModalCleanup()
}

async function processSingleImage() {
  if (!cropperInstance.value || currentImageIndex.value === null) return
  const image = images.value[currentImageIndex.value]
  const canvas = cropperInstance.value.getCroppedCanvas()
  canvas.toBlob(async (blob) => {
    if (!blob) {
      showNotification('无法生成图片', 'error')
      return
    }
    await processImages([{ image, blob }], modalOutputWidth.value, modalOutputHeight.value)
    closeModalCleanup()
  }, `image/${outputFormat.value}`)
}

async function processAllEditedImages() {
  const imagesToProcess = images.value
    .filter((img) => img.status === 'edited' && img.editedBlob)
    .map((img) => ({ image: img, blob: img.editedBlob! }))

  if (imagesToProcess.length === 0) {
    showNotification('没有需要批量处理的图片', 'info')
    return
  }
  await processImages(imagesToProcess, outputWidth.value, outputHeight.value)
}

async function processImages(
  items: { image: ImageItem; blob: Blob }[],
  width: number,
  height: number,
) {
  isProcessing.value = true
  const formData = new FormData()
  items.forEach((item) => formData.append('images', item.blob, item.image.name))
  formData.append('width', width.toString())
  formData.append('height', height.toString())
  formData.append('format', outputFormat.value)

  try {
    const response = await fetch('http://localhost:3003/api/process-images', {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) throw new Error('服务器处理失败')
    const result = await response.json()
    result.processedImages.forEach((processed: { originalName: string; newUrl: string }) => {
      const originalImage = images.value.find((img) => img.name === processed.originalName)
      if (originalImage) {
        if (originalImage.displayUrl !== originalImage.originalUrl) {
          URL.revokeObjectURL(originalImage.displayUrl)
        }
        originalImage.displayUrl = `http://localhost:3003${processed.newUrl}`
        originalImage.status = 'processed'
        originalImage.editedBlob = null
      }
    })
    showNotification('图片处理成功！', 'success')
  } catch (error) {
    console.error('图片处理错误:', error)
    showNotification('处理失败，请检查服务器', 'error')
  } finally {
    isProcessing.value = false
  }
}

function cancelCropper() {
  const image = images.value[currentImageIndex.value!]
  if (image) image.editedBlob = null
  closeModalCleanup()
}

function closeModalCleanup() {
  showCropperModal.value = false
  tempCropperUrls.forEach((url) => URL.revokeObjectURL(url))
  tempCropperUrls = []
  if (cropperInstance.value) {
    cropperInstance.value.destroy()
    cropperInstance.value = null
  }
  currentImageIndex.value = null
  currentImageForCropper.value = ''
}

function resetToOriginal(index: number) {
  const image = images.value[index]
  if (image) {
    if (image.displayUrl !== image.originalUrl) {
      URL.revokeObjectURL(image.displayUrl)
    }
    image.displayUrl = image.originalUrl
    image.status = 'pending'
    image.editedBlob = null
    showNotification('图片已复原', 'success')
  }
}

function updateCropperAspectRatio() {
  if (cropperInstance.value) {
    cropperInstance.value.setAspectRatio(
      maintainAspectRatioInModal.value && modalOutputWidth.value > 0 && modalOutputHeight.value > 0
        ? modalOutputWidth.value / modalOutputHeight.value
        : NaN,
    )
  }
}

const rotateImage = () => cropperInstance.value?.rotateTo(Number(rotation.value))
const rotateImageByDegree = (degree: number) => {
  cropperInstance.value?.rotate(degree)
  rotation.value = cropperInstance.value?.getData().rotate || 0
}
const flipImage = (direction: 'x' | 'y') => {
  if (direction === 'x') {
    flippedX.value = -flippedX.value
    cropperInstance.value?.scaleX(flippedX.value)
  }
}
const zoomIn = () => cropperInstance.value?.zoom(0.1)
const zoomOut = () => cropperInstance.value?.zoom(-0.1)
const resetImage = () => {
  cropperInstance.value?.reset()
  rotation.value = 0
  flippedX.value = 1
}

onBeforeUnmount(() => {
  images.value.forEach((img) => {
    URL.revokeObjectURL(img.originalUrl)
    if (img.displayUrl !== img.originalUrl) {
      URL.revokeObjectURL(img.displayUrl)
    }
  })
  if (cropperInstance.value) cropperInstance.value.destroy()
})
</script>

<style>
/* 全局按钮指针样式 */
button,
[role='button'],
input[type='file'],
.cursor-pointer {
  cursor: pointer;
}

/* 美化开关样式 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
input[type='checkbox']:checked + .block {
  background-color: #48bb78; /* green-500 */
}
input[type='checkbox']:checked + .block + .dot {
  transform: translateX(1.5rem); /* w-6 */
}

/* Cropper.js 样式覆盖 */
.cropper-container {
  max-height: 60vh;
  max-width: 100%;
}
.cropper-view-box,
.cropper-face {
  border-radius: 0.25rem;
}
img {
  max-width: 100%;
}
</style>
