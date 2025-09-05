<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  surveyData: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:surveyData'])

const ageOptions = ['18岁以下', '18-24', '25-30', '31-40', '40岁以上']
const genderOptions = ['男', '女', '其他', '不愿透露']
const occupationOptions = ['学生', '全职工作', '兼职工作', '自由职业', '其他']
const sharingLikelihoods = [
  { value: 1, text: '(1) 完全不会' },
  { value: 2, text: '(2) 不太可能' },
  { value: 3, text: '(3) 不确定' },
  { value: 4, text: '(4) 可能会' },
  { value: 5, text: '(5) 非常乐意分享！' },
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
    <h2 class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
      问题 5.1: 为了更好地进行数据分析，我们希望了解一些您的背景信息（所有信息将严格保密）。
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="age" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >您的年龄段是？</label
        >
        <select
          id="age"
          v-model="age"
          name="age"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option disabled value="">请选择</option>
          <option v-for="ageOpt in ageOptions" :key="ageOpt" :value="ageOpt">{{ ageOpt }}</option>
        </select>
      </div>

      <div>
        <label for="gender" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >您的性别是？</label
        >
        <select
          id="gender"
          v-model="gender"
          name="gender"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option disabled value="">请选择</option>
          <option v-for="genderOpt in genderOptions" :key="genderOpt" :value="genderOpt">
            {{ genderOpt }}
          </option>
        </select>
      </div>

      <div>
        <label for="occupation" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >您的职业身份是？</label
        >
        <select
          id="occupation"
          v-model="occupation"
          name="occupation"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option disabled value="">请选择</option>
          <option v-for="job in occupationOptions" :key="job" :value="job">{{ job }}</option>
        </select>
      </div>

      <div>
        <label for="nationality" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >您的国籍是？</label
        >
        <input
          id="nationality"
          v-model="nationality"
          type="text"
          name="nationality"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
    </div>

    <h2 class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
      问题 5.2: 在体验结束后，您有多大可能性会在社交媒体（如Instagram, TikTok,
      小红书）上分享您的汉服照片？
    </h2>
    <div class="space-y-3">
      <label
        v-for="item in sharingLikelihoods"
        :key="item.value"
        class="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
      >
        <input
          v-model="localSurveyData.sharingLikelihood"
          type="radio"
          :value="item.value"
          class="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        />
        <span class="ml-3 text-gray-700 dark:text-gray-300">{{ item.text }}</span>
      </label>
    </div>
  </div>
</template>
