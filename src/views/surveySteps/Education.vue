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

const knowledgeLevels = computed(() => [
  { value: 1, text: t('survey.education.knowledgeLevels.level1') },
  { value: 2, text: t('survey.education.knowledgeLevels.level2') },
  { value: 3, text: t('survey.education.knowledgeLevels.level3') },
  { value: 4, text: t('survey.education.knowledgeLevels.level4') },
  { value: 5, text: t('survey.education.knowledgeLevels.level5') },
])

const motivations = computed(() => [
  { id: 'photos', text: t('survey.education.motivations.photos') },
  { id: 'culture', text: t('survey.education.motivations.culture') },
  { id: 'occasion', text: t('survey.education.motivations.occasion') },
  { id: 'activity', text: t('survey.education.motivations.activity') },
  { id: 'roots', text: t('survey.education.motivations.roots') },
  { id: 'social', text: t('survey.education.motivations.social') },
  { id: 'curious', text: t('survey.education.motivations.curious') },
  { id: 'other', text: t('survey.education.motivations.other') },
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
      {{ t('survey.education.q1_title') }}
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
      {{ t('survey.education.q2_title') }}
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
