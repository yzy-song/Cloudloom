<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

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
  { id: 3, name: 'Kimono (着物)', src: '/images/survey/kimono.jpeg', isHanfu: false },
  { id: 4, name: 'Hanbok (한복)', src: '/images/survey/hanbok.jpeg', isHanfu: false },
  { id: 5, name: 'Modern Wear', src: '/images/survey/morden.jpeg', isHanfu: false },
  { id: 6, name: 'Cosplay', src: '/images/survey/cosplay.jpeg', isHanfu: false },
])

const residenceOptions = [
  '都柏林 (Dublin)',
  '爱尔兰其他城市 (Other city in Ireland)',
  '其他国家 (I am a tourist / live in another country)',
]

const channelOptions = [
  '微信群 / 朋友圈 (WeChat Groups / Moments)',
  '小红书 (RED / Xiaohongshu)',
  'Instagram / Facebook',
  'TikTok',
  "朋友推荐 (Friend's Recommendation)",
  '学校/社团通知 (University / Student Group Notice)',
  '其他 (Other)',
]

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

  const recognized = localSurveyData.value.recognizedItems
  const isSelected = recognized.includes(item.name)

  if (isSelected) {
    // 如果已选择，则取消选择
    const newRecognized = recognized.filter((name: string) => name !== item.name)
    localSurveyData.value = { ...localSurveyData.value, recognizedItems: newRecognized }
    // 此时 selectionStatus 已被清空，无需额外操作
  } else {
    // 如果未选择，则进行选择
    const newRecognized = [...recognized, item.name]
    localSurveyData.value = { ...localSurveyData.value, recognizedItems: newRecognized }
    selectionStatus[item.id] = item.isHanfu ? 'correct' : 'incorrect' // 仅设置当前项的视觉状态
  }
}

// 根据选择状态动态计算边框样式
function getBorderClass(item: ClothingItem) {
  const status = selectionStatus[item.id]
  if (status === 'correct') return 'border-green-500'

  if (status === 'incorrect') return 'border-red-500'

  return 'border-transparent hover:border-indigo-400'
}
</script>

<template>
  <div class="p-4 md:p-6">
    <h2 class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
      问题 1.1: 您能认出以下哪些是汉服（中国汉族的传统服饰）吗？
    </h2>
    <p class="text-sm text-gray-500 mb-4">请点击您认为是汉服的图片。</p>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="item in clothingItems"
        :key="item.id"
        class="relative rounded-lg overflow-hidden cursor-pointer border-4 transition-all duration-200"
        :class="getBorderClass(item)"
        @click="handleSelection(item)"
      >
        <img :src="item.src" :alt="item.name" class="w-full h-48 md:h-64 object-cover" />

        <!-- 对错反馈图标 -->
        <div
          v-if="selectionStatus[item.id]"
          class="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-xl"
          :class="{
            'bg-green-500': selectionStatus[item.id] === 'correct',
            'bg-red-500': selectionStatus[item.id] === 'incorrect',
          }"
        >
          <span v-if="selectionStatus[item.id] === 'correct'">✓</span>
          <span v-if="selectionStatus[item.id] === 'incorrect'">✗</span>
        </div>

        <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
          <p class="text-white text-center font-semibold">
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>

    <!-- 反馈提示文字 -->
    <div
      v-if="Object.values(selectionStatus).some((s) => s === 'incorrect')"
      class="mt-4 text-center"
    >
      <p class="text-sm text-gray-600 dark:text-gray-400">
        <span class="inline-block w-3 h-3 rounded-full bg-green-500 mr-1" />
        <span class="font-semibold">正确!</span>
        <span class="inline-block w-3 h-3 rounded-full bg-red-500 mr-1 ml-4" />
        <span class="font-semibold">提示:</span> 汉服是汉民族的传统服饰，而旗袍等属于近代服饰。
      </p>
    </div>

    <!-- 问题 1.2 -->
    <h2 class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
      问题 1.2: 您目前主要居住在哪个城市？
    </h2>
    <div class="space-y-3">
      <label
        v-for="option in residenceOptions"
        :key="option"
        class="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
      >
        <input
          v-model="localSurveyData.residence"
          type="radio"
          :value="option"
          class="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        />
        <span class="ml-3 text-gray-700 dark:text-gray-300">{{ option }}</span>
      </label>
    </div>

    <!-- 问题 1.3 -->
    <h2 class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
      问题 1.3: 您是通过以下哪个渠道了解到本次问卷调查的？
    </h2>
    <div class="space-y-3">
      <label
        v-for="option in channelOptions"
        :key="option"
        class="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
      >
        <input
          v-model="localSurveyData.channel"
          type="radio"
          :value="option"
          class="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        />
        <span class="ml-3 text-gray-700 dark:text-gray-300">{{ option }}</span>
      </label>
    </div>
  </div>
</template>
