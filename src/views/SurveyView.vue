<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Contact from './surveySteps/Contact.vue' // 1. 引入新组件
import Education from './surveySteps/Education.vue'
import Feedback from './surveySteps/Feedback.vue'
import Payment from './surveySteps/Payment.vue'
import Personal from './surveySteps/Personal.vue'
import Preferences from './surveySteps/Preferences.vue'
import Recognition from './surveySteps/Recognition.vue'
import Service from './surveySteps/Service.vue'
import BaseLoading from '@/components/ui/BaseLoading.vue'
import { useApi } from '@/composables/useApi'

const { t } = useI18n()
const surveyApi = useApi()
const currentStep = ref(0)
const isLoading = ref(false)
const submissionSuccess = ref(false)
const submissionError = ref<string | null>(null)

const initialSurveyData = {
  recognizedItems: [],
  residence: '',
  channel: '',
  hanfuKnowledge: null,
  motivation: [],
  desiredServices: [],
  // 新增字段
  partyInterest: '',
  ownershipPreference: '',
  stylePreference: '',
  durationPreference: '',
  pricePackageA: '',
  pricePackageB: '',
  pricePackageC: '',
  demographics: {
    age: '',
    gender: '',
    occupation: '',
    nationality: '',
  },
  sharingLikelihood: null,
  feedback: '',
  // 新增联系信息字段
  name: '',
  email: '',
  phone: '',
}

// 2. 在数据结构中添加 contact 字段
const surveyData = ref({ ...initialSurveyData })

// 3. 将新组件添加到步骤列表中
const steps = computed(() => [
  { title: t('survey.main.steps.recognition'), component: Recognition },
  { title: t('survey.main.steps.education'), component: Education },
  { title: t('survey.main.steps.service'), component: Service },
  { title: t('survey.main.steps.preferences'), component: Preferences },
  { title: t('survey.main.steps.payment'), component: Payment },
  { title: t('survey.main.steps.personal'), component: Personal },
  { title: t('survey.main.steps.contact'), component: Contact }, // 新增的步骤
  { title: t('survey.main.steps.feedback'), component: Feedback },
])

const totalSteps = computed(() => steps.value.length)
const progress = computed(() => ((currentStep.value + 1) / totalSteps.value) * 100)

const nextStep = () => {
  if (currentStep.value < totalSteps.value - 1) currentStep.value++
}

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--
}

async function submitSurvey() {
  isLoading.value = true
  submissionError.value = null
  try {
    const surveyId = 1 // 未来可以动态获取
    const response = await surveyApi.post(`/survey/${surveyId}/responses`, surveyData.value)
    if (response) submissionSuccess.value = true
    else throw new Error('Submission failed with no specific error code.')
  } catch (error) {
    submissionError.value =
      (error as any).response?.data?.message ||
      (error as any).message ||
      t('survey.main.error.unknown')
    console.error('Survey submission error:', error)
  } finally {
    isLoading.value = false
  }
}

function restartSurvey() {
  submissionSuccess.value = false
  submissionError.value = null
  currentStep.value = 0
  surveyData.value = { ...initialSurveyData }
}
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 md:py-12">
    <div class="container mx-auto px-4">
      <div
        v-if="!submissionSuccess"
        class="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        <!-- Progress Bar -->
        <div class="bg-gray-200 dark:bg-gray-700 h-2.5">
          <div class="bg-indigo-600 h-2.5" :style="{ width: `${progress}%` }" />
        </div>

        <div class="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 class="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
            {{ t('survey.main.title') }}
          </h1>
          <p class="text-center text-sm text-gray-500 mt-2">
            {{ t('survey.main.step') }} {{ currentStep + 1 }} {{ t('survey.main.of') }}
            {{ totalSteps }}: {{ steps[currentStep].title }}
          </p>
        </div>

        <!-- Dynamic Component for survey steps -->
        <div class="p-4 md:p-6 min-h-[400px]">
          <keep-alive>
            <component :is="steps[currentStep].component" v-model:surveyData="surveyData" />
          </keep-alive>
        </div>

        <!-- Navigation -->
        <div class="bg-gray-50 dark:bg-gray-800/50 px-4 py-3 sm:px-6 flex justify-between">
          <button
            v-if="currentStep > 0"
            :disabled="isLoading"
            class="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
            @click="prevStep"
          >
            {{ t('survey.main.buttons.prev') }}
          </button>
          <div v-else />
          <!-- Spacer -->

          <button
            v-if="currentStep < totalSteps - 1"
            :disabled="isLoading"
            class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            @click="nextStep"
          >
            {{ t('survey.main.buttons.next') }}
          </button>

          <button
            v-if="currentStep === totalSteps - 1"
            :disabled="isLoading"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            @click="submitSurvey"
          >
            <BaseLoading v-if="isLoading" class="w-5 h-5 mr-2" />
            {{ isLoading ? t('survey.main.buttons.submitting') : t('survey.main.buttons.submit') }}
          </button>
        </div>
      </div>

      <!-- Success Message -->
      <div
        v-if="submissionSuccess"
        class="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12 text-center"
      >
        <h2 class="text-3xl font-bold text-green-600 mb-4">{{ t('survey.main.success.title') }}</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          {{ t('survey.main.success.message') }}
        </p>
        <button
          class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click="restartSurvey"
        >
          {{ t('survey.main.success.restart') }}
        </button>
      </div>

      <!-- Error Message -->
      <div
        v-if="submissionError"
        class="max-w-3xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-4"
        role="alert"
      >
        <strong class="font-bold">{{ t('survey.main.error.title') }}</strong>
        <span class="block sm:inline">{{ submissionError }}</span>
      </div>
    </div>
  </div>
</template>
