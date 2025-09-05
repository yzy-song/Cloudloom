<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  surveyData: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:surveyData'])

const feedback = computed({
  get: () => props.surveyData.feedback,
  set: (value) => {
    // 创建一个新对象来更新，而不是直接修改 prop
    emit('update:surveyData', { ...props.surveyData, feedback: value })
  },
})
</script>

<template>
  <div class="p-4 md:p-6">
    <h2 class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
      问题 5.3: 对于在都柏林开设一家汉服体验馆，您还有什么其他的建议、顾虑或绝妙的想法吗？
    </h2>
    <div>
      <label for="feedback" class="sr-only">您的反馈</label>
      <textarea
        id="feedback"
        v-model="feedback"
        name="feedback"
        rows="6"
        class="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="请在此处输入您的想法..."
      />
    </div>
  </div>
</template>
