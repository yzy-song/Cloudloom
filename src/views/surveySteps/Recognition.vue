<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface ClothingItem {
  id: number
  name: string
  src: string
  isHanfu: boolean
}

const props = defineProps({
  surveyData: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:surveyData'])

const clothingItems = ref<ClothingItem[]>([
  { id: 1, name: 'Hanfu (汉服)', src: '/images/survey/hanfu.jpeg', isHanfu: true },
  { id: 2, name: 'Qipao (旗袍)', src: '/images/survey/qipao.jpeg', isHanfu: false },
  { id: 3, name: 'Kimono (きもの)', src: '/images/survey/kimono.jpeg', isHanfu: false },
  { id: 4, name: 'Hanbok (한복)', src: '/images/survey/hanbok.jpeg', isHanfu: false },
  { id: 5, name: 'Modern Wear', src: '/images/survey/morden.jpeg', isHanfu: false },
  { id: 6, name: 'Cosplay', src: '/images/survey/cosplay.jpeg', isHanfu: false },
])

const residenceOptions = computed(() => [
  t('survey.recognition.residenceOptions.dublin'),
  t('survey.recognition.residenceOptions.other_ireland'),
  t('survey.recognition.residenceOptions.other_country'),
])

const channelOptions = computed(() => [
  t('survey.recognition.channelOptions.wechat'),
  t('survey.recognition.channelOptions.red'),
  t('survey.recognition.channelOptions.instagram'),
  t('survey.recognition.channelOptions.tiktok'),
  t('survey.recognition.channelOptions.friend'),
  t('survey.recognition.channelOptions.university'),
  t('survey.recognition.channelOptions.other'),
])

// 用于存储每个选项的视觉状态 (correct, incorrect)
const selectionStatus = reactive<Record<number, 'correct' | 'incorrect'>>({})

const localSurveyData = computed({
  get: () => props.surveyData,
  set: (value) => {
    emit('update:surveyData', value)
  },
})

// 点击图片时的处理逻辑
function handleSelection(item: ClothingItem) {
  // 清空之前的视觉状态
  for (const key in selectionStatus) {
    delete selectionStatus[key]
  }

  const isAlreadySelected =
    localSurveyData.value.recognizedItems.length === 1 &&
    localSurveyData.value.recognizedItems[0] === item.name

  if (isAlreadySelected) {
    // 如果点击的已经是当前唯一选中的图片，则取消选择
    localSurveyData.value = { ...localSurveyData.value, recognizedItems: [] }
    delete selectionStatus[item.id]
  } else {
    // 否则，直接将当前点击的图片设为唯一选择
    localSurveyData.value = { ...localSurveyData.value, recognizedItems: [item.name] }
    selectionStatus[item.id] = item.isHanfu ? 'correct' : 'incorrect'
  }
}

// 根据选择状态动态计算边框样式
function getBorderClass(item: ClothingItem) {
  const status = selectionStatus[item.id]
  if (status === 'correct') return 'border-green-500 ring-2 ring-green-500/50'

  if (status === 'incorrect') return 'border-red-500 ring-2 ring-red-500/50'

  // 为已选择但未判断对错的图片添加选中样式
  if (localSurveyData.value.recognizedItems.includes(item.name)) {
    return 'border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-500/50'
  }

  // 为未选择的图片添加默认边框和悬停效果
  return 'border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400'
}
</script>

<template>
  <div class="p-4 md:p-6">
    <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
      {{ t('survey.recognition.q1_title') }}
    </h2>
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
      {{ t('survey.recognition.q1_prompt') }}
    </p>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="item in clothingItems"
        :key="item.id"
        class="relative rounded-lg overflow-hidden cursor-pointer border-4 transition-all duration-200 group"
        :class="getBorderClass(item)"
        @click="handleSelection(item)"
      >
        <img
          :src="item.src"
          :alt="item.name"
          class="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <!-- 对错反馈图标 -->
        <div
          v-if="selectionStatus[item.id]"
          class="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-xl shadow-lg"
          :class="{
            'bg-green-500': selectionStatus[item.id] === 'correct',
            'bg-red-500': selectionStatus[item.id] === 'incorrect',
          }"
        >
          <span v-if="selectionStatus[item.id] === 'correct'">✓</span>
          <span v-if="selectionStatus[item.id] === 'incorrect'">✗</span>
        </div>

        <div
          class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3"
        >
          <p class="text-white text-center font-semibold text-base">
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>

    <!-- 反馈提示文字 -->
    <div
      v-if="Object.values(selectionStatus).some((s) => s === 'incorrect')"
      class="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 text-yellow-800 dark:text-yellow-200"
      role="alert"
    >
      <p class="text-sm">
        <span class="font-bold">{{ t('survey.recognition.feedback_incorrect_prompt') }}</span>
        {{ t('survey.recognition.feedback_incorrect_text') }}
      </p>
    </div>

    <!-- 问题 1.2 -->
    <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
      {{ t('survey.recognition.q2_title') }}
    </h2>
    <div class="space-y-3">
      <label
        v-for="option in residenceOptions"
        :key="option"
        class="flex items-center p-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 dark:has-[:checked]:bg-indigo-900/30 dark:has-[:checked]:border-indigo-600"
      >
        <input
          v-model="localSurveyData.residence"
          type="radio"
          :value="option"
          class="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        />
        <span class="ml-4 text-gray-700 dark:text-gray-300">{{ option }}</span>
      </label>
    </div>

    <!-- 问题 1.3 -->
    <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
      {{ t('survey.recognition.q3_title') }}
    </h2>
    <div class="space-y-3">
      <label
        v-for="option in channelOptions"
        :key="option"
        class="flex items-center p-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 dark:has-[:checked]:bg-indigo-900/30 dark:has-[:checked]:border-indigo-600"
      >
        <input
          v-model="localSurveyData.channel"
          type="radio"
          :value="option"
          class="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        />
        <span class="ml-4 text-gray-700 dark:text-gray-300">{{ option }}</span>
      </label>
    </div>
  </div>
</template>
