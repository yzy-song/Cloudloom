<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  surveyData: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:surveyData'])

const localSurveyData = computed({
  get: () => props.surveyData,
  set: (value) => {
    emit('update:surveyData', value)
  },
})
</script>

<template>
  <div class="p-4 md:p-6">
    <h2 class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
      最后一步：留下联系方式（可选）
    </h2>
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
      非常感谢您参与本次调查！为了感谢您的宝贵时间，我们未来可能会通过您留下的联系方式发放优惠券或活动通知。所有信息将被严格保密。
    </p>

    <div class="space-y-4">
      <!-- 姓名 -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >姓名 (Name)</label
        >
        <div class="mt-1">
          <input
            id="name"
            v-model.trim="localSurveyData.name"
            type="text"
            name="name"
            autocomplete="name"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="请输入您的姓名"
          />
        </div>
      </div>

      <!-- 邮箱 -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >邮箱 (Email)</label
        >
        <div class="mt-1">
          <input
            id="email"
            v-model.trim="localSurveyData.email"
            type="email"
            name="email"
            autocomplete="email"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="请输入您的邮箱地址"
          />
        </div>
      </div>

      <!-- 手机号 -->
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >手机号 (Phone)</label
        >
        <div class="mt-1">
          <input
            id="phone"
            v-model.trim="localSurveyData.phone"
            type="tel"
            name="phone"
            autocomplete="tel"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="请输入您的手机号码"
          />
        </div>
      </div>
    </div>
  </div>
</template>
