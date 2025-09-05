<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  surveyData: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:surveyData'])

const packages = {
  packageA: {
    title: '套餐A：基础体验套餐',
    description:
      '自选汉服一套，提供简单发型设计与基础配饰，1.5小时室内主题景自由拍摄（用自己的手机）。',
    prices: ['€39 - €49', '€50 - €69', '€70 以上'],
    modelKey: 'pricePackageA',
  },
  packageB: {
    title: '套餐B：专业写真套餐',
    description:
      '自选汉服一套，全套专业化妆与发型设计，专业摄影师2小时室内拍摄，提供所有底片并含5张精修电子照片。',
    prices: ['€129 - €159', '€160 - €199', '€200 以上'],
    modelKey: 'pricePackageB',
  },
  packageC: {
    title: '套餐C：都柏林外景套餐',
    description:
      '自选汉服一套，全套专业化妆与发型设计，专业摄影师3小时跟拍（一个自选都柏林地标），提供所有底片并含8张精修电子照片。',
    prices: ['€249 - €299', '€300 - €359', '€360 以上'],
    modelKey: 'pricePackageC',
  },
}

const localSurveyData = computed({
  get: () => props.surveyData,
  set: (value) => {
    emit('update:surveyData', value)
  },
})
</script>

<template>
  <div class="p-4 md:p-6">
    <h2 class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
      问题 4.1: 请设想以下几种服务套餐，并为您认为合理的价位投票。
    </h2>

    <div class="space-y-8">
      <div
        v-for="pkg in packages"
        :key="pkg.modelKey"
        class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
      >
        <h3 class="text-lg font-semibold text-indigo-700 dark:text-indigo-400">{{ pkg.title }}</h3>
        <p class="mt-1 text-gray-600 dark:text-gray-300">{{ pkg.description }}</p>
        <div class="mt-4 space-y-3">
          <p class="font-medium text-gray-800 dark:text-gray-200">您认为合理的价位是？</p>
          <label
            v-for="price in pkg.prices"
            :key="price"
            class="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <input
              v-model="localSurveyData[pkg.modelKey]"
              type="radio"
              :value="price"
              :name="pkg.modelKey"
              class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span class="ml-3 text-gray-700 dark:text-gray-300">{{ price }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
