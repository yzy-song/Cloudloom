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

const ageOptions = [
  t('survey.personal.ageOptions.under18'),
  t('survey.personal.ageOptions.18-24'),
  t('survey.personal.ageOptions.25-30'),
  t('survey.personal.ageOptions.31-40'),
  t('survey.personal.ageOptions.over40'),
]
const genderOptions = [
  t('survey.personal.genderOptions.male'),
  t('survey.personal.genderOptions.female'),
  t('survey.personal.genderOptions.other'),
  t('survey.personal.genderOptions.prefer_not_to_say'),
]
const occupationOptions = [
  t('survey.personal.occupationOptions.student'),
  t('survey.personal.occupationOptions.full_time'),
  t('survey.personal.occupationOptions.part_time'),
  t('survey.personal.occupationOptions.freelancer'),
  t('survey.personal.occupationOptions.other'),
]
const sharingLikelihoods = [
  { value: 1, text: t('survey.personal.sharingLikelihoods.level1') },
  { value: 2, text: t('survey.personal.sharingLikelihoods.level2') },
  { value: 3, text: t('survey.personal.sharingLikelihoods.level3') },
  { value: 4, text: t('survey.personal.sharingLikelihoods.level4') },
  { value: 5, text: t('survey.personal.sharingLikelihoods.level5') },
]

// 使用 computed 包装整个 surveyData 对象
const localSurveyData = computed({
  get: () => props.surveyData,
  set: (value) => {
    emit('update:surveyData', value)
  },
})

// 为每个嵌套字段创建单独的 computed 属性，以避免直接修改嵌套对象
const age = computed({
  get: () => localSurveyData.value.demographics.age,
  set: (value) => {
    localSurveyData.value = {
      ...localSurveyData.value,
      demographics: { ...localSurveyData.value.demographics, age: value },
    }
  },
})
const gender = computed({
  get: () => localSurveyData.value.demographics.gender,
  set: (value) => {
    localSurveyData.value = {
      ...localSurveyData.value,
      demographics: { ...localSurveyData.value.demographics, gender: value },
    }
  },
})
const occupation = computed({
  get: () => localSurveyData.value.demographics.occupation,
  set: (value) => {
    localSurveyData.value = {
      ...localSurveyData.value,
      demographics: { ...localSurveyData.value.demographics, occupation: value },
    }
  },
})
const nationality = computed({
  get: () => localSurveyData.value.demographics.nationality,
  set: (value) => {
    localSurveyData.value = {
      ...localSurveyData.value,
      demographics: { ...localSurveyData.value.demographics, nationality: value },
    }
  },
})
</script>

<template>
  <div class="p-4 md:p-6">
    <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
      {{ t('survey.personal.q1_title') }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
      <div>
        <label for="age" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{
          t('survey.personal.age_label')
        }}</label>
        <select
          id="age"
          v-model="age"
          name="age"
          class="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option disabled value="">{{ t('survey.personal.select_placeholder') }}</option>
          <option v-for="ageOpt in ageOptions" :key="ageOpt" :value="ageOpt">{{ ageOpt }}</option>
        </select>
      </div>

      <div>
        <label
          for="gender"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >{{ t('survey.personal.gender_label') }}</label
        >
        <select
          id="gender"
          v-model="gender"
          name="gender"
          class="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option disabled value="">{{ t('survey.personal.select_placeholder') }}</option>
          <option v-for="genderOpt in genderOptions" :key="genderOpt" :value="genderOpt">
            {{ genderOpt }}
          </option>
        </select>
      </div>

      <div>
        <label
          for="occupation"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >{{ t('survey.personal.occupation_label') }}</label
        >
        <select
          id="occupation"
          v-model="occupation"
          name="occupation"
          class="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option disabled value="">{{ t('survey.personal.select_placeholder') }}</option>
          <option v-for="job in occupationOptions" :key="job" :value="job">{{ job }}</option>
        </select>
      </div>

      <div>
        <label
          for="nationality"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >{{ t('survey.personal.nationality_label') }}</label
        >
        <input
          id="nationality"
          v-model="nationality"
          type="text"
          name="nationality"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
    </div>

    <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
      {{ t('survey.personal.q2_title') }}
    </h2>
    <div class="space-y-3">
      <label
        v-for="item in sharingLikelihoods"
        :key="item.value"
        class="flex items-center p-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 dark:has-[:checked]:bg-indigo-900/30 dark:has-[:checked]:border-indigo-600"
      >
        <input
          v-model="localSurveyData.sharingLikelihood"
          type="radio"
          :value="item.value"
          class="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        />
        <span class="ml-4 text-gray-800 dark:text-gray-200">{{ item.text }}</span>
      </label>
    </div>
  </div>
</template>
