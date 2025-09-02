<!-- filepath: src/components/ImageProTool.vue -->
<template>
  <div class="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-lg">
    <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">图片批量处理与裁剪工具</h2>

    <!-- 批量参数设置 -->
    <div class="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
      <h3 class="text-lg font-semibold mb-4 text-gray-700">批量参数设置</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-end">
        <div>
          <label for="width" class="block mb-1 font-medium text-gray-600">宽度(px)</label>
          <input
            id="width"
            type="number"
            v-model.number="params.width"
            min="1"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="height" class="block mb-1 font-medium text-gray-600">高度(px)</label>
          <input
            id="height"
            type="number"
            v-model.number="params.height"
            min="1"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="format" class="block mb-1 font-medium text-gray-600">格式</label>
          <select
            id="format"
            v-model="params.format"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WebP</option>
          </select>
        </div>
        <div>
          <label for="quality" class="block mb-1 font-medium text-gray-600">质量(1-100)</label>
          <input
            id="quality"
            type="number"
            v-model.number="params.quality"
            min="1"
            max="100"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="flex items-center">
          <input
            id="crop"
            type="checkbox"
            v-model="params.crop"
            class="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="crop" class="font-medium text-gray-600">裁剪</label>
        </div>
        <div class="flex items-center">
          <input
            id="keepRatio"
            type="checkbox"
            v-model="params.keepRatio"
            class="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="keepRatio" class="font-medium text-gray-600">保持比例</label>
        </div>
      </div>
    </div>

    <!-- 操作按钮区 -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center space-x-4">
        <label
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer transition-colors"
        >
          批量上传
          <input type="file" multiple @change="handleFileUpload" class="hidden" accept="image/*" />
        </label>
        <button
          @click="processImages"
          :disabled="files.length === 0 || processing"
          class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400"
        >
          <span v-if="!processing">批量处理</span>
          <span v-else>处理中...</span>
        </button>
      </div>
      <div v-if="processing" class="flex items-center text-blue-600">
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>{{ processedCount }} / {{ files.length }}</span>
      </div>
      <div v-if="done" class="text-green-600 font-bold">处理完成！</div>
    </div>

    <!-- 图片列表 -->
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      v-if="files.length > 0"
    >
      <div
        v-for="(file, index) in files"
        :key="index"
        class="relative bg-gray-100 rounded-lg overflow-hidden shadow"
      >
        <img :src="file.src" :alt="file.name" class="w-full h-32 object-cover" />
        <div
          class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
        >
          <div class="text-white text-center">
            <span class="text-sm block">{{ file.name }}</span>
            <button
              @click="openCrop(index)"
              class="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1 px-3 rounded"
            >
              裁剪11
            </button>
          </div>
        </div>
        <div
          v-if="file.cropped"
          class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full"
        >
          已裁剪
        </div>
      </div>
    </div>

    <!-- 裁剪弹窗 -->
    <div
      v-if="cropIndex !== null"
      class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      @click.self="closeCrop"
    >
      <div class="bg-white rounded-lg p-6 shadow-xl max-w-2xl w-full relative">
        <h3 class="text-xl font-semibold mb-4 text-center">图片裁剪</h3>
        <div class="mb-4 overflow-hidden relative" style="height: 400px">
          <VueCropper
            ref="cropperRef"
            :img="files[cropIndex].src"
            :autoCrop="true"
            :fixedBox="true"
            :centerBox="true"
            :canMove="true"
            :canMoveBox="false"
            :canScale="false"
            :full="true"
            :mode="'cover'"
            @realTime="realTime"
            :info="true"
          />
        </div>
        <div class="flex justify-center space-x-4">
          <button
            @click="doCrop"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            应用裁剪
          </button>
          <button
            @click="closeCrop"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VueCropper from 'vue-cropperjs'
// import 'vue-cropperjs/dist/index.css'
import 'cropperjs/dist/cropper.css'
// Assume a backend API address for processing images
const API_URL = 'http://localhost:3003/api/process-images'

// Batch processing parameters
const params = ref({
  width: 800,
  height: 600,
  format: 'jpeg',
  quality: 80,
  crop: true,
  keepRatio: true,
})

// Image file list
const files = ref<
  {
    file: File
    src: string
    name: string
    cropped?: boolean
    blob?: Blob
    cropData?: { x: number; y: number; width: number; height: number }
  }[]
>([])

// State
const processing = ref(false)
const processedCount = ref(0)
const done = ref(false)

// Cropping related
const cropperRef = ref<any | null>(null)
const cropIndex = ref<number | null>(null)
const cropPreview = ref<any>({})

// File upload handler
function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files) return

  // Clear existing files and state
  files.value = []
  done.value = false

  const newFiles = Array.from(input.files).map((file) => ({
    file,
    src: URL.createObjectURL(file),
    name: file.name,
    cropped: false,
    blob: undefined,
    cropData: undefined,
  }))
  files.value.push(...newFiles)
}

// Process images in a batch
async function processImages() {
  processing.value = true
  processedCount.value = 0
  done.value = false

  // Simulate batch processing
  for (let i = 0; i < files.value.length; i++) {
    const fileItem = files.value[i]
    const formData = new FormData()

    // Prioritize uploading the cropped image blob
    if (fileItem.cropped && fileItem.blob) {
      formData.append('image', fileItem.blob, fileItem.name)
    } else {
      formData.append('image', fileItem.file)
    }

    // Add batch parameters
    Object.entries(params.value).forEach(([k, v]) => formData.append(k, String(v)))

    // Simulate async request to the backend API
    try {
      // In a real application, you would use fetch here:
      // await fetch(API_URL, {
      //   method: 'POST',
      //   body: formData,
      // });
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
      processedCount.value++
    } catch (error) {
      console.error('Image processing failed:', error)
      // You can add error notifications here
    }
  }

  processing.value = false
  done.value = true
}

// Cropping related functions
function openCrop(idx: number) {
  cropIndex.value = idx
}

function closeCrop() {
  cropIndex.value = null
}

function realTime(data: any) {
  // Can be used to update preview in real-time if needed
  cropPreview.value = data
}

function doCrop() {
  if (!cropperRef.value) {
    return
  }

  // Get the cropped blob data
  cropperRef.value.getCropBlob(
    (blob: Blob) => {
      if (!blob) {
        return
      }

      // Get cropping coordinates
      const cropData = cropperRef.value.getCropData()

      if (cropIndex.value !== null) {
        const fileItem = files.value[cropIndex.value]

        // Save the cropped blob and state locally
        fileItem.blob = blob
        fileItem.cropped = true
        fileItem.cropData = {
          x: cropData.x,
          y: cropData.y,
          width: cropData.width,
          height: cropData.height,
        }

        // Update the preview image source to the cropped blob URL
        fileItem.src = URL.createObjectURL(blob)
      }

      closeCrop()
    },
    files.value[cropIndex.value as number].file.type,
    params.value.quality / 100,
  )
}

// Clean up object URLs on component unmount to prevent memory leaks
onMounted(() => {
  window.addEventListener('beforeunload', () => {
    files.value.forEach((fileItem) => {
      if (fileItem.src.startsWith('blob:')) {
        URL.revokeObjectURL(fileItem.src)
      }
    })
  })
})
</script>

<style scoped>
/* You can add additional Tailwind classes or custom styles here */
</style>
