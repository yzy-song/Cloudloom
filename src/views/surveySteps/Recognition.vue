<!-- filepath: d:\workspace\yzy_Vue\Cloudloom\src\views\surveySteps\Recognition.vue -->
<template>
  <div class="space-y-4 sm:space-y-6">
    <h2 class="text-xl sm:text-2xl font-semibold text-emerald-800">{{ t('recognition.title') }}</h2>
    <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
      {{ t('recognition.description') }}
    </p>
    <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="image in recognitionImages"
        :key="image.id"
        :class="[
          'relative group cursor-pointer transition-all duration-300 rounded-lg',
          getHighlightClass(image.id), // 高亮边框将一直保留
        ]"
        @click="select(image)"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          class="w-full h-auto object-cover rounded-lg shadow-md"
        />
        <!-- 临时显示的蒙版和图标 -->
        <div
          v-if="temporaryFeedback && temporaryFeedback.id === image.id"
          class="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center"
        >
          <svg
            v-if="temporaryFeedback.isCorrect"
            class="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            v-else
            class="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'recognition'])

// 仅用于临时显示蒙版和图标的状态
const temporaryFeedback = ref<{ id: number; isCorrect: boolean } | null>(null)

const recognitionImages = [
  { id: 1, src: '/images/survey/qipao.jpeg', alt: '旗袍', isCorrect: false },
  { id: 2, src: '/images/survey/hanfu.jpeg', alt: '汉服', isCorrect: true },
  { id: 3, src: '/images/survey/kimono.jpeg', alt: '日式和服', isCorrect: false },
  { id: 4, src: '/images/survey/hanbok.jpeg', alt: '韩服', isCorrect: false },
  { id: 5, src: '/images/survey/morden.jpeg', alt: '现代服饰', isCorrect: false },
  { id: 6, src: '/images/survey/cosplay.jpeg', alt: 'Cosplay', isCorrect: false },
]

function select(image: any) {
  // 更新父组件的表单数据，这将驱动高亮框的持久显示
  emit('update:modelValue', { ...props.modelValue, hanfuRecognition: image.id })
  // 触发父组件的Toast提示
  emit('recognition', { isCorrect: image.isCorrect, alt: image.alt })

  // 设置本地临时状态以显示蒙版和图标
  temporaryFeedback.value = { id: image.id, isCorrect: image.isCorrect }

  // 2秒后自动清除临时状态，仅移除蒙版和图标
  setTimeout(() => {
    temporaryFeedback.value = null
  }, 2000)
}

// 高亮样式现在依赖父组件传入的持久化数据 modelValue
function getHighlightClass(imageId: number) {
  const selectedId = props.modelValue.hanfuRecognition

  if (selectedId !== imageId) {
    return 'border-4 border-transparent' // 未选中的选项，边框透明
  }

  // 找到当前选中的图片对象
  const selectedImage = recognitionImages.find((img) => img.id === selectedId)
  if (!selectedImage) return 'border-4 border-transparent'

  // 根据正确性返回对应的持久高亮样式
  return selectedImage.isCorrect
    ? 'border-4 border-emerald-500 shadow-lg shadow-emerald-500/50' // 答对：绿色高亮
    : 'border-4 border-red-500 shadow-lg shadow-red-500/50' // 答错：红色高亮
}
</script>
