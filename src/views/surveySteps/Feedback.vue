<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
    <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
      {{ t('survey.feedback.q_title') }}
    </h2>
    <div>
      <label for="feedback" class="sr-only">{{ t('survey.feedback.q_title') }}</label>
      <textarea
        id="feedback"
        v-model="feedback"
        name="feedback"
        rows="8"
        class="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        :placeholder="t('survey.feedback.placeholder')"
      />
    </div>
  </div>
</template>
