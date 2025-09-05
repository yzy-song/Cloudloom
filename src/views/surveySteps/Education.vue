<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  surveyData: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:surveyData'])

const knowledgeLevels = [
  { value: 1, text: '(1) 完全不了解，只是觉得好看' },
  { value: 2, text: '(2) 听说过，但不清楚具体朝代和款式' },
  { value: 3, text: '(3) 了解一些基础知识' },
  { value: 4, text: '(4) 比较熟悉，能分清不同朝代的风格' },
  { value: 5, text: '(5) 非常了解，是汉服爱好者' },
]

const motivations = ref([
  {
    id: 'photos',
    text: '想拍一组特别的、有纪念意义的照片 (To get a unique and memorable set of photos)',
  },
  {
    id: 'culture',
    text: '作为一种了解和体验中国文化的方式 (As a way to experience and learn about Chinese culture)',
  },
  {
    id: 'occasion',
    text: '为了庆祝某个特殊场合（如生日、纪念日、毕业） (To celebrate a special occasion)',
  },
  {
    id: 'activity',
    text: '和朋友/家人/伴侣一起进行一次有趣的活动 (A fun activity to do with friends, family, or a partner)',
  },
  {
    id: 'roots',
    text: '寻找与自己文化根源的连接（主要针对华裔） (To connect with my own cultural roots)',
  },
  { id: 'social', text: '创造独特的社交媒体内容 (To create unique content for my social media)' },
  { id: 'curious', text: '只是单纯的好奇 (Just curious)' },
  { id: 'other', text: '其他 (Other)' },
])

const localSurveyData = computed({
  get: () => props.surveyData,
  set: (value) => {
    emit('update:surveyData', value)
  },
})

function updateMotivations(option: { text: any }) {
  const motivation = localSurveyData.value.motivation
  const newMotivation = motivation.includes(option.text)
    ? motivation.filter((item: any) => item !== option.text)
    : [...motivation, option.text]

  localSurveyData.value = { ...localSurveyData.value, motivation: newMotivation }
}
</script>

<template>
  <div class="p-4 md:p-6">
    <h2 class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
      问题 2.1: 您对汉服文化的了解程度如何？
    </h2>
    <div class="space-y-3">
      <label
        v-for="level in knowledgeLevels"
        :key="level.value"
        class="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
      >
        <input
          v-model="localSurveyData.hanfuKnowledge"
          type="radio"
          :value="level.value"
          class="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        />
        <span class="ml-3 text-gray-700 dark:text-gray-300">{{ level.text }}</span>
      </label>
    </div>

    <h2 class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
      问题 2.2: 如果要在都柏林体验汉服，最吸引您的原因是什么？（可多选）
    </h2>
    <div class="space-y-3">
      <label
        v-for="option in motivations"
        :key="option.id"
        class="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
      >
        <input
          type="checkbox"
          :checked="localSurveyData.motivation.includes(option.text)"
          class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          @change="updateMotivations(option)"
        />
        <span class="ml-3 text-gray-700 dark:text-gray-300">{{ option.text }}</span>
      </label>
    </div>
  </div>
</template>
