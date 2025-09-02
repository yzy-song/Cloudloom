<template>
  <div class="mt-12 p-8 font-sans antialiased text-gray-800 bg-gray-100 min-h-screen">
    <div
      class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <h1 class="text-3xl font-bold text-center mb-6">图片批量处理与裁剪工具</h1>

      <div
        class="mb-8 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors duration-200 hover:border-indigo-500"
      >
        <label
          for="file-upload"
          class="flex flex-col items-center justify-center w-full px-4 py-6 text-sm font-medium text-white transition-colors duration-200 bg-indigo-600 rounded-lg shadow-md cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 mr-2 mb-2"
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
          <span class="text-white">点击选择文件 或 拖拽文件到此区域</span>
        </label>
        <input id="file-upload" type="file" multiple @change="handleFileChange" class="hidden" />
      </div>

      <div class="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">批量参数设置</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div class="flex items-center">
            <input
              id="maintain-ratio"
              type="checkbox"
              v-model="maintainAspectRatio"
              class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label for="maintain-ratio" class="ml-2 text-sm text-gray-700">保持原比例</label>
          </div>
          <button
            @click="processAllImages"
            :disabled="isProcessing"
            class="w-full px-4 py-2 mt-auto text-white transition-colors duration-200 bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isProcessing">处理中...</span>
            <span v-else>批量处理</span>
          </button>
        </div>
      </div>

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
            :src="image.url"
            :alt="image.name"
            class="w-full h-48 object-contain transition-all duration-300 transform group-hover:scale-105"
          />

          <div
            class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <button
              @click="openCropper(index)"
              class="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              编辑
            </button>
          </div>

          <span
            v-if="image.isEdited"
            class="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white bg-green-500 rounded-full shadow-md"
          >
            已裁剪
          </span>
          <span
            v-else
            class="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white bg-yellow-500 rounded-full shadow-md"
          >
            待处理
          </span>
          <div class="p-3">
            <p class="text-sm font-medium text-gray-700 truncate">{{ image.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-show="showCropperModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
    >
      <div
        class="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl transform transition-all scale-95 duration-300"
        :class="{ 'scale-100': showCropperModal }"
      >
        <h2 class="text-2xl font-bold mb-4 text-center">图片编辑</h2>
        <div class="cropper-container mb-4">
          <img ref="cropperImgRef" :src="currentImage?.url" alt="图片预览" class="max-w-full" />
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label for="modal-width" class="block text-sm font-medium text-gray-700"
              >宽度 (px)</label
            >
            <input
              id="modal-width"
              type="number"
              v-model.number="outputWidth"
              @input="updateCropperAspectRatio"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="modal-height" class="block text-sm font-medium text-gray-700"
              >高度 (px)</label
            >
            <input
              id="modal-height"
              type="number"
              v-model.number="outputHeight"
              @input="updateCropperAspectRatio"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div class="col-span-2">
            <label for="modal-format" class="block text-sm font-medium text-gray-700">格式</label>
            <select
              id="modal-format"
              v-model="outputFormat"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="zoomIn"
              class="flex-1 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              放大
            </button>
            <button
              @click="zoomOut"
              class="flex-1 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              缩小
            </button>
          </div>
          <div class="col-span-2 md:col-span-1">
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
          <button
            @click="rotateImageByDegree(90)"
            class="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            旋转90°
          </button>
          <button
            @click="flipImage('x')"
            class="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            水平翻转
          </button>
          <button
            @click="resetImage"
            class="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            复位
          </button>
        </div>

        <div class="flex justify-end gap-2">
          <button
            @click="applyCrop"
            class="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            应用裁剪
          </button>
          <button
            @click="closeCropper"
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
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

interface ImageItem {
  id: number
  name: string
  url: string
  file: File // 保存原始文件
  isEdited: boolean // 标记是否已被编辑或处理
}

const images = ref<ImageItem[]>([])
const showCropperModal = ref(false)
const currentImage = ref<ImageItem | null>(null)
const currentImageIndex = ref<number | null>(null)
const cropperImgRef = ref<HTMLImageElement | null>(null)
const cropperInstance = ref<Cropper | null>(null)
const outputWidth = ref<number>(800)
const outputHeight = ref<number>(600)
const outputFormat = ref<string>('jpeg') // 新增：输出格式
const maintainAspectRatio = ref<boolean>(true)
const isProcessing = ref<boolean>(false)
const rotation = ref<number>(0)

let fileIdCounter = 0
const flippedX = ref(1)
const flippedY = ref(1)

function handleFiles(files: FileList) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      images.value.push({
        id: fileIdCounter++,
        name: file.name,
        url: url,
        file: file,
        isEdited: false,
      })
    }
  }
}

function handleFileChange(event: Event) {
  const fileList = (event.target as HTMLInputElement).files
  if (fileList) {
    handleFiles(fileList)
  }
}

function handleDrop(event: DragEvent) {
  const fileList = event.dataTransfer?.files
  if (fileList) {
    handleFiles(fileList)
  }
}

function removeImage(index: number) {
  // 移除图片时，也需要释放之前创建的 URL
  if (images.value[index]?.url) {
    URL.revokeObjectURL(images.value[index].url)
  }
  images.value.splice(index, 1)
}

function openCropper(index: number) {
  currentImage.value = images.value[index]
  currentImageIndex.value = index
  showCropperModal.value = true
  // Reset flip and rotation state before opening the modal
  flippedX.value = 1
  flippedY.value = 1
  rotation.value = 0
  nextTick(() => {
    if (cropperImgRef.value) {
      cropperInstance.value = new Cropper(cropperImgRef.value, {
        aspectRatio: outputWidth.value / outputHeight.value,
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 0.9,
        movable: true,
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false,
        rotatable: true, // 允许旋转
      })
    }
  })
}

function closeCropper() {
  showCropperModal.value = false
  cropperInstance.value?.destroy()
  cropperInstance.value = null
  currentImage.value = null
  currentImageIndex.value = null
}

function applyCrop() {
  if (cropperInstance.value && currentImageIndex.value !== null) {
    const croppedCanvas = cropperInstance.value.getCroppedCanvas({
      width: outputWidth.value,
      height: outputHeight.value,
    })

    // Convert canvas to a blob
    croppedCanvas.toBlob(
      (blob) => {
        if (blob && currentImage.value) {
          // Create a new File object from the blob
          const fileExtension = outputFormat.value === 'jpeg' ? 'jpeg' : outputFormat.value
          const mimeType = `image/${outputFormat.value}`
          const croppedFile = new File(
            [blob],
            `cropped_${currentImage.value.name}.${fileExtension}`,
            {
              type: mimeType,
            },
          )

          // Update the file and url for the current image item
          if (currentImageIndex.value !== null) {
            // 先释放旧的 URL
            URL.revokeObjectURL(images.value[currentImageIndex.value].url)
            images.value[currentImageIndex.value].file = croppedFile
            images.value[currentImageIndex.value].url = URL.createObjectURL(croppedFile)
            images.value[currentImageIndex.value].isEdited = true
          }
        }
        closeCropper()
      },
      `image/${outputFormat.value}`,
      0.95,
    )
  }
}

function rotateImage() {
  if (cropperInstance.value) {
    cropperInstance.value.rotateTo(rotation.value)
  }
}

function rotateImageByDegree(degree: number) {
  if (cropperInstance.value) {
    cropperInstance.value.rotate(degree)
    // Sync the slider with the new rotation
    const newRotation = (rotation.value + degree) % 360
    rotation.value = newRotation
  }
}

function flipImage(direction: 'x' | 'y') {
  if (cropperInstance.value) {
    if (direction === 'x') {
      flippedX.value = -flippedX.value
      cropperInstance.value.scaleX(flippedX.value)
    } else {
      flippedY.value = -flippedY.value
      cropperInstance.value.scaleY(flippedY.value)
    }
  }
}

function zoomIn() {
  if (cropperInstance.value) {
    cropperInstance.value.zoom(0.1)
  }
}

function zoomOut() {
  if (cropperInstance.value) {
    cropperInstance.value.zoom(-0.1)
  }
}

function resetImage() {
  if (cropperInstance.value) {
    cropperInstance.value.reset()
    flippedX.value = 1
    flippedY.value = 1
    rotation.value = 0
  }
}

function updateCropperAspectRatio() {
  if (cropperInstance.value && outputWidth.value > 0 && outputHeight.value > 0) {
    cropperInstance.value.setAspectRatio(outputWidth.value / outputHeight.value)
  }
}

async function processAllImages() {
  if (images.value.length === 0) {
    alert('没有图片可以处理，请先上传图片！')
    return
  }

  isProcessing.value = true
  const formData = new FormData()

  images.value.forEach((image) => {
    formData.append('images', image.file, image.name)
  })

  formData.append('width', outputWidth.value.toString())
  formData.append('height', outputHeight.value.toString())
  // 添加格式到批量处理请求
  formData.append('format', outputFormat.value)
  formData.append('quality', '95')
  formData.append('keepRatio', maintainAspectRatio.value.toString())

  try {
    const response: Response = await fetch('http://localhost:3003/api/process-images', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('服务器处理图片失败')
    }

    interface ProcessedImage {
      originalName: string
      newUrl: string
    }

    interface ProcessImagesResult {
      processedImages: ProcessedImage[]
    }

    const result: ProcessImagesResult = await response.json()

    // 更新预览图
    result.processedImages.forEach((processedImage: ProcessedImage) => {
      const originalImage: ImageItem | undefined = images.value.find(
        (img) => img.name === processedImage.originalName,
      )
      if (originalImage) {
        console.log('Processed image URL:', `http://localhost:3003${processedImage.newUrl}`)
        originalImage.url = `http://localhost:3003${processedImage.newUrl}`
        originalImage.isEdited = true // 标记为已处理
      }
    })

    console.log('所有图片已处理完成')
  } catch (error) {
    console.error('批量处理图片时出错:', error)
    alert('批量处理失败，请检查服务器。')
  } finally {
    isProcessing.value = false
  }
}

onBeforeUnmount(() => {
  cropperInstance.value?.destroy()
})
</script>

<style scoped>
.cropper-container {
  max-height: 400px;
  max-width: 100%;
}
</style>
```eof
