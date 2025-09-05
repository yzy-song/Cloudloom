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

const partyInterestOptions = computed(() => [
  { id: 'very_interested', text: t('survey.service.party_interest_options.very_interested') },
  { id: 'interested', text: t('survey.service.party_interest_options.interested') },
  { id: 'neutral', text: t('survey.service.party_interest_options.neutral') },
  { id: 'not_interested', text: t('survey.service.party_interest_options.not_interested') },
])

const ownershipOptions = computed(() => [
  { id: 'rent', text: t('survey.service.ownership_options.rent') },
  { id: 'buy', text: t('survey.service.ownership_options.buy') },
  { id: 'unsure', text: t('survey.service.ownership_options.unsure') },
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
    <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
      {{ t('survey.service.q_title') }}
    </h2>
    <div class="space-y-3">
      <label
        v-for="service in services"
        :key="service.id"
        class="flex items-center p-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 dark:has-[:checked]:bg-indigo-900/30 dark:has-[:checked]:border-indigo-600"
      >
        <input
          type="checkbox"
          :checked="localSurveyData.desiredServices.includes(service.id)"
          class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          @change="updateServices(service)"
        />
        <span class="ml-4 text-gray-700 dark:text-gray-300">{{ service.text }}</span>
      </label>
    </div>

    <!-- 新增问题: 汉服主题派对 -->
    <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
      {{ t('survey.service.q_party_interest') }}
    </h2>
    <div class="space-y-3">
      <label
        v-for="option in partyInterestOptions"
        :key="option.id"
        class="flex items-center p-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 dark:has-[:checked]:bg-indigo-900/30 dark:has-[:checked]:border-indigo-600"
      >
        <input
          v-model="localSurveyData.partyInterest"
          type="radio"
          :value="option.id"
          name="partyInterest"
          class="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        />
        <span class="ml-4 text-gray-700 dark:text-gray-300">{{ option.text }}</span>
      </label>
    </div>

    <!-- 新增问题: 租赁 vs 购买 -->
    <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
      {{ t('survey.service.q_ownership') }}
    </h2>
    <div class="space-y-3">
      <label
        v-for="option in ownershipOptions"
        :key="option.id"
        class="flex items-center p-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 dark:has-[:checked]:bg-indigo-900/30 dark:has-[:checked]:border-indigo-600"
      >
        <input
          v-model="localSurveyData.ownershipPreference"
          type="radio"
          :value="option.id"
          name="ownershipPreference"
          class="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        />
        <span class="ml-4 text-gray-700 dark:text-gray-300">{{ option.text }}</span>
      </label>
    </div>
  </div>
</template>
