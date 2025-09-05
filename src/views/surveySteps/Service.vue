<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  surveyData: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:surveyData'])

const services = ref([
  { id: 'rental', text: '服装租赁 (Clothing Rental)' },
  { id: 'makeup', text: '专业化妆与发型设计 (Professional Makeup and Hairstyling)' },
  { id: 'accessories', text: '提供精美配饰 (如发簪、团扇、油纸伞) (Accessories Provided)' },
  { id: 'indoor', text: '室内主题布景拍摄 (Indoor Themed Set Photography)' },
  {
    id: 'outdoor',
    text: '都柏林地标外景拍摄 (如圣三一学院、凤凰公园等) (Outdoor Photography at Dublin Landmarks)',
  },
  { id: 'photographer', text: '专业摄影师跟拍 (Professional Photographer)' },
  {
    id: 'activities',
    text: '文化体验活动 (如茶艺、书法、古筝体验) (Cultural activities like tea ceremony, calligraphy)',
  },
  { id: 'pets', text: '允许携带宠物合影 (Allowing pets in photos)' },
])

const localSurveyData = computed({
  get: () => props.surveyData,
  set: (value) => {
    emit('update:surveyData', value)
  },
})

function updateServices(service: { text: any }) {
  const desired = localSurveyData.value.desiredServices
  const newDesired = desired.includes(service.text)
    ? desired.filter((item: any) => item !== service.text)
    : [...desired, service.text]
  localSurveyData.value = { ...localSurveyData.value, desiredServices: newDesired }
}
</script>

<template>
  <div class="p-4 md:p-6">
    <h2 class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
      问题 3.1: 对于汉服体验，您最希望包含哪些服务？（可多选）
    </h2>
    <div class="space-y-3">
      <label
        v-for="service in services"
        :key="service.id"
        class="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
      >
        <input
          type="checkbox"
          :checked="localSurveyData.desiredServices.includes(service.text)"
          class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          @change="updateServices(service)"
        />
        <span class="ml-3 text-gray-700 dark:text-gray-300">{{ service.text }}</span>
      </label>
    </div>
  </div>
</template>
