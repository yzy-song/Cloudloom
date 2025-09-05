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

const styles = [
  t('survey.preferences.styles.flowy'),
  t('survey.preferences.styles.grand'),
  t('survey.preferences.styles.elegant'),
  t('survey.preferences.styles.heroic'),
  t('survey.preferences.styles.recommend'),
]

const durations = [
  t('survey.preferences.durations.d1'),
  t('survey.preferences.durations.d2'),
  t('survey.preferences.durations.d3'),
  t('survey.preferences.durations.d4'),
]

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
      {{ t('survey.preferences.q1_title') }}
    </h2>
    <p class="text-sm text-gray-500 mb-4">{{ t('survey.preferences.q1_prompt') }}</p>
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
      {{ t('survey.preferences.q2_title') }}
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
