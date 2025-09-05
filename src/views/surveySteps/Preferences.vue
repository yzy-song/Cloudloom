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
    <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
      {{ t('survey.preferences.q1_title') }}
    </h2>
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
      {{ t('survey.preferences.q1_prompt') }}
    </p>
    <div class="space-y-3">
      <label
        v-for="style in styles"
        :key="style"
        class="flex items-center p-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 dark:has-[:checked]:bg-indigo-900/30 dark:has-[:checked]:border-indigo-600"
      >
        <input
          v-model="localSurveyData.stylePreference"
          type="radio"
          :value="style"
          class="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        />
        <span class="ml-4 text-gray-800 dark:text-gray-200">{{ style }}</span>
      </label>
    </div>

    <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
      {{ t('survey.preferences.q2_title') }}
    </h2>
    <div class="space-y-3">
      <label
        v-for="duration in durations"
        :key="duration"
        class="flex items-center p-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 dark:has-[:checked]:bg-indigo-900/30 dark:has-[:checked]:border-indigo-600"
      >
        <input
          v-model="localSurveyData.durationPreference"
          type="radio"
          :value="duration"
          class="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        />
        <span class="ml-4 text-gray-800 dark:text-gray-200">{{ duration }}</span>
      </label>
    </div>
  </div>
</template>
