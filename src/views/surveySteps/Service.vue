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

const services = computed(() => [
  { id: 'rental', text: t('survey.service.options.rental') },
  { id: 'makeup', text: t('survey.service.options.makeup') },
  { id: 'accessories', text: t('survey.service.options.accessories') },
  { id: 'indoor', text: t('survey.service.options.indoor') },
  { id: 'outdoor', text: t('survey.service.options.outdoor') },
  { id: 'photographer', text: t('survey.service.options.photographer') },
  { id: 'activities', text: t('survey.service.options.activities') },
  { id: 'pets', text: t('survey.service.options.pets') },
])

const localSurveyData = computed({
  get: () => props.surveyData,
  set: (value) => {
    emit('update:surveyData', value)
  },
})

function updateServices(service: { id: string }) {
  const desired = localSurveyData.value.desiredServices
  const newDesired = desired.includes(service.id)
    ? desired.filter((item: string) => item !== service.id)
    : [...desired, service.id]
  localSurveyData.value = { ...localSurveyData.value, desiredServices: newDesired }
}
</script>

<template>
  <div class="p-4 md:p-6">
    <h2 class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
      {{ t('survey.service.q_title') }}
    </h2>
    <div class="space-y-3">
      <label
        v-for="service in services"
        :key="service.id"
        class="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
      >
        <input
          type="checkbox"
          :checked="localSurveyData.desiredServices.includes(service.id)"
          class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          @change="updateServices(service)"
        />
        <span class="ml-3 text-gray-700 dark:text-gray-300">{{ service.text }}</span>
      </label>
    </div>
  </div>
</template>
