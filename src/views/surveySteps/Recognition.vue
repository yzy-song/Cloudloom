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
        class="relative group cursor-pointer"
        @click="select(image)"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          :class="[
            'w-full h-auto object-cover rounded-lg shadow-md transition-all duration-200',
            modelValue.hanfuRecognition === image.id
              ? 'border-4 border-emerald-500'
              : 'border-4 border-transparent',
          ]"
        />
        <div
          v-if="modelValue.hanfuRecognition === image.id"
          class="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center"
        >
          <svg
            v-if="image.isCorrect"
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
    <div
      v-if="recognitionMessage"
      :class="[
        'mt-4 p-4 rounded-lg text-white font-medium',
        modelValue.hanfuRecognition === recognitionImages.find((img) => img.isCorrect)?.id
          ? 'bg-emerald-600'
          : 'bg-red-500',
      ]"
    >
      {{ recognitionMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps(['modelValue', 'recognitionMessage'])
const emit = defineEmits(['update:modelValue', 'recognition'])

const recognitionImages = [
  {
    id: 'kimono',
    src: 'https://placehold.co/200x200/F08080/FFFFFF?text=Kimono',
    isCorrect: false,
    alt: '日式和服',
  },
  {
    id: 'hanbok',
    src: 'https://placehold.co/200x200/87CEEB/FFFFFF?text=Hanbok',
    isCorrect: false,
    alt: '韩服',
  },
  {
    id: 'hanfu',
    src: 'https://placehold.co/200x200/F4A460/FFFFFF?text=Hanfu',
    isCorrect: true,
    alt: '汉服',
  },
  {
    id: 'modern',
    src: 'https://placehold.co/200x200/98FB98/FFFFFF?text=Modern+Dress',
    isCorrect: false,
    alt: '现代服饰',
  },
]

function select(image: any) {
  emit('update:modelValue', { ...props.modelValue, hanfuRecognition: image.id })
  emit('recognition', { isCorrect: image.isCorrect, alt: image.alt })
}
</script>
