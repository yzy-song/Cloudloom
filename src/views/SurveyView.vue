<template>
  <div
    class="bg-gradient-to-br from-indigo-50 to-emerald-100 min-h-screen font-sans antialiased text-gray-800 p-4 md:p-8 flex flex-col items-center"
  >
    <div class="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 my-8">
      <!-- Header & Progress -->
      <div class="text-center mb-8">
        <h1
          class="text-4xl sm:text-5xl font-extrabold text-emerald-800 tracking-tight leading-tight"
        >
          {{ t('survey.title') }}
        </h1>
        <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          {{ t('survey.description') }}
        </p>
        <div class="mt-8 bg-gray-200 rounded-full h-2">
          <div
            class="bg-emerald-500 h-2 rounded-full transition-all duration-500"
            :style="{ width: `${((currentStep + 1) / steps.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Content Modules -->
      <div class="mt-10">
        <component
          :is="currentComponent"
          v-model="formData"
          :recognition-message="recognitionMessage"
          @recognition="onRecognition"
        />
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-10 flex justify-between">
        <button
          @click="prevStep"
          :disabled="currentStep === 0"
          class="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold shadow-md hover:bg-gray-300 transition-all duration-200 disabled:opacity-50"
        >
          {{ t('survey.buttons.back') }}
        </button>
        <button
          v-if="currentStep < steps.length - 1"
          @click="nextStep"
          class="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow-lg hover:bg-emerald-700 transition-all duration-200"
        >
          {{ t('survey.buttons.next') }}
        </button>
        <button
          v-else
          @click="submitSurvey"
          class="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow-lg hover:bg-emerald-700 transition-all duration-200"
        >
          {{ t('survey.buttons.submit') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const recognitionMessage = ref('')

// 步骤配置
const stepNames = [
  'Education',
  'Preferences',
  'Service',
  'Payment',
  'Recognition',
  'Personal',
  'Feedback',
] as const
type StepName = (typeof stepNames)[number]
const steps: StepName[] = [...stepNames]

const currentStep = ref(0)
const formData = reactive({
  hanfuStyle: '',
  activities: [] as string[],
  services: [] as string[],
  duration: 4,
  priceRange: '',
  hanfuRecognition: '',
  name: '',
  email: '',
  phone: '',
  city: '',
  feedback: '',
})

// 步骤组件映射
const stepComponents: Record<StepName, ReturnType<typeof defineAsyncComponent>> = {
  Education: defineAsyncComponent(() => import('@/views/surveySteps/Education.vue')),
  Preferences: defineAsyncComponent(() => import('@/views/surveySteps/Preferences.vue')),
  Service: defineAsyncComponent(() => import('@/views/surveySteps/Service.vue')),
  Payment: defineAsyncComponent(() => import('@/views/surveySteps/Payment.vue')),
  Recognition: defineAsyncComponent(() => import('@/views/surveySteps/Recognition.vue')),
  Personal: defineAsyncComponent(() => import('@/views/surveySteps/Personal.vue')),
  Feedback: defineAsyncComponent(() => import('@/views/surveySteps/Feedback.vue')),
}

const currentComponent = computed(() => stepComponents[steps[currentStep.value]])

// 步骤切换
function nextStep() {
  if (currentStep.value < steps.length - 1) currentStep.value++
}
function prevStep() {
  if (currentStep.value > 0) currentStep.value--
}

// Hanfu识别反馈
function onRecognition({ isCorrect, alt }: { isCorrect: boolean; alt: string }) {
  if (isCorrect) {
    recognitionMessage.value = t('survey.recognition.correct')
  } else {
    recognitionMessage.value = t('survey.recognition.incorrect', { alt })
  }
}

// 提交
function submitSurvey() {
  alert(t('survey.submitted') + '\n' + JSON.stringify(formData, null, 2))
}
</script>

<style scoped>
/* 可选：如果你想添加更多样式，可以在这里编写 */
</style>
