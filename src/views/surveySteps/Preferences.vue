<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  surveyData: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:surveyData'])

const styles = [
  '飘逸优雅的风格（如魏晋、宋制）(Flowy and elegant styles, e.g., Wei-Jin, Song)',
  '华丽大气的风格（如唐制）(Grand and magnificent styles, e.g., Tang)',
  '端庄秀丽的风格（如明制）(Elegant and graceful styles, e.g., Ming)',
  '英姿飒爽的侠客/武侠风格 (Heroic / Wuxia styles)',
  "我不了解，希望店员推荐 (I don't know, I'd like a recommendation)",
]

const durations = ['1小时以内', '1 - 2 小时', '2 - 3 小时', '半天或更久']

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
      问题 3.2: 您更偏爱哪种风格的汉服？
    </h2>
    <p class="text-sm text-gray-500 mb-4">如果能配图展示效果最佳</p>
    <div class="space-y-3">
      <label
        v-for="style in styles"
        :key="style"
        class="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
      >
        <input
          v-model="localSurveyData.stylePreference"
          type="radio"
          :value="style"
          class="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        />
        <span class="ml-3 text-gray-700 dark:text-gray-300">{{ style }}</span>
      </label>
    </div>

    <h2 class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
      问题 3.3: 您理想中的一次完整汉服体验（从进店到结束）时长是多久？
    </h2>
    <div class="space-y-3">
      <label
        v-for="duration in durations"
        :key="duration"
        class="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
      >
        <input
          v-model="localSurveyData.durationPreference"
          type="radio"
          :value="duration"
          class="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        />
        <span class="ml-3 text-gray-700 dark:text-gray-300">{{ duration }}</span>
      </label>
    </div>
  </div>
</template>
