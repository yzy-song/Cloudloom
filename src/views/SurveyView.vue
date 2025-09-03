<template>
  <div
    class="bg-gradient-to-br from-indigo-50 to-emerald-100 min-h-screen font-sans antialiased text-gray-800 p-4 md:p-8 flex flex-col items-center"
  >
    <div class="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 my-8">
      <!-- Toast/Snackbar 提示 -->
      <div
        v-if="toast.show"
        :class="[
          'fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg text-white font-semibold shadow-lg transition-all duration-300',
          toast.isCorrect ? 'bg-emerald-600' : 'bg-red-500',
        ]"
      >
        {{ toast.message }}
      </div>

      <!-- [优化后] Header & Progress -->
      <div class="mb-8">
        <!-- 仅在第一步显示欢迎信息 -->
        <div v-if="currentStep === 0" class="text-center">
          <h1
            class="text-4xl sm:text-5xl font-extrabold text-emerald-800 tracking-tight leading-tight"
          >
            {{ t('survey.title') }}
          </h1>
          <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {{ t('survey.description') }}
          </p>
        </div>

        <!-- 从第二步开始，显示紧凑型页眉 -->
        <div v-else class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-emerald-700">
            {{ t(`survey.steps.${steps[currentStep]}`) }}
          </h2>
          <span class="text-sm font-semibold text-gray-500">
            {{ t('survey.step') }} {{ currentStep + 1 }} / {{ steps.length }}
          </span>
        </div>

        <!-- 进度条始终显示 -->
        <div class="mt-6 bg-gray-200 rounded-full h-2">
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
          :recognition-message="toast"
          @recognition="handleRecognition"
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

// Toast 相关的状态
const toast = ref({
  show: false,
  message: '',
  isCorrect: false,
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

// 用于处理 Recognition 组件传来的事件
function handleRecognition({ isCorrect, alt }: { isCorrect: boolean; alt: string }) {
  toast.value.isCorrect = isCorrect
  toast.value.message = isCorrect
    ? t('survey.recognition.correct')
    : `${t('survey.recognition.incorrect')}${t('survey.recognition.thisIs')} ${alt}`
  toast.value.show = true

  // 3秒后自动隐藏 Toast
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

// 提交
function submitSurvey() {
  alert(t('survey.submitted') + '\n' + JSON.stringify(formData, null, 2))
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
