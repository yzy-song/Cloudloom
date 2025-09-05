<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Education from './surveySteps/Education.vue'
import Feedback from './surveySteps/Feedback.vue'
import Payment from './surveySteps/Payment.vue'
import Personal from './surveySteps/Personal.vue'
import Preferences from './surveySteps/Preferences.vue'
import Recognition from './surveySteps/Recognition.vue'
import Service from './surveySteps/Service.vue'
import { useApi } from '@/composables/useApi'

const router = useRouter()
const api = useApi()
const isSubmitting = ref(false)
const submissionError = ref<string | null>(null) // Add explicit type annotation

const currentStep = ref(0)
const steps = [
  { id: 'recognition', title: '市场筛选与认知', component: Recognition },
  { id: 'education', title: '文化兴趣与动机', component: Education },
  { id: 'service', title: '产品与服务偏好', component: Service },
  { id: 'preferences', title: '风格与时长偏好', component: Preferences },
  { id: 'payment', title: '价格与价值感知', component: Payment },
  { id: 'personal', title: '用户画像与营销', component: Personal },
  { id: 'feedback', title: '您的宝贵意见', component: Feedback },
]

// surveyData 保持不变
const surveyData = reactive({
  recognizedItems: [],
  residence: '',
  channel: '',
  hanfuKnowledge: null,
  motivation: [],
  desiredServices: [],
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
})

const totalSteps = steps.length

const progress = computed(() => {
  return ((currentStep.value + 1) / totalSteps) * 100
})

function nextStep() {
  if (currentStep.value < totalSteps - 1) currentStep.value++
}

function prevStep() {
  if (currentStep.value > 0) currentStep.value--
}

async function submitSurvey() {
  isSubmitting.value = true
  submissionError.value = null
  try {
    const response = await api.post('/survey/responses', { answers: surveyData })
    if (response) router.push({ name: 'home', query: { survey_completed: 'true' } })
  } catch (error) {
    console.error('Failed to submit survey:', error)
    submissionError.value = '提交失败，请稍后重试。'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="bg-gray-100 dark:bg-gray-900 min-h-screen">
    <div class="container mx-auto px-4 py-8 md:py-12">
      <div
        class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
      >
        <div class="px-4 py-5 sm:px-6">
          <h1 class="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white">
            汉服体验馆市场调查问卷
          </h1>
          <p class="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            您的意见对我们至关重要！
          </p>
        </div>

        <!-- Progress Bar -->
        <div class="px-6 py-4">
          <div class="flex justify-between mb-1">
            <span class="text-base font-medium text-indigo-700 dark:text-white">{{
              steps[currentStep].title
            }}</span>
            <span class="text-sm font-medium text-indigo-700 dark:text-white"
              >{{ currentStep + 1 }} / {{ totalSteps }}</span
            >
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div class="bg-indigo-600 h-2.5 rounded-full" :style="{ width: `${progress}%` }"></div>
          </div>
        </div>

        <!-- Dynamic Component for current step -->
        <div class="p-4 md:p-6 min-h-[400px]">
          <keep-alive>
            <component :is="steps[currentStep].component" v-model:surveyData="surveyData" />
          </keep-alive>
        </div>

        <!-- Navigation Buttons -->
        <div
          class="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6 flex justify-between items-center"
        >
          <button
            v-if="currentStep > 0"
            class="px-6 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            @click="prevStep"
          >
            上一步
          </button>
          <div v-else></div>
          <!-- Placeholder to keep Next button on the right -->

          <button
            v-if="currentStep < totalSteps - 1"
            class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            @click="nextStep"
          >
            下一步
          </button>

          <button
            v-if="currentStep === totalSteps - 1"
            class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            :disabled="isSubmitting"
            @click="submitSurvey"
          >
            {{ isSubmitting ? '提交中...' : '完成并提交' }}
          </button>
        </div>
        <div v-if="submissionError" class="p-4 text-center text-red-500">
          {{ submissionError }}
        </div>
      </div>
    </div>
  </div>
</template>
