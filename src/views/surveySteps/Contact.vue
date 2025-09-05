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

const localSurveyData = computed({
  get: () => props.surveyData,
  set: (value) => {
    emit('update:surveyData', value)
  },
})
</script>

<template>
  <div class="p-4 md:p-6">
    <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
      {{ t('survey.contact.title') }}
    </h2>
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
      {{ t('survey.contact.description') }}
    </p>

    <div class="space-y-6">
      <!-- 姓名 -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{
          t('survey.contact.name_label')
        }}</label>
        <div class="mt-1">
          <input
            id="name"
            v-model.trim="localSurveyData.name"
            type="text"
            name="name"
            autocomplete="name"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 py-2.5"
            :placeholder="t('survey.contact.name_placeholder')"
          />
        </div>
      </div>

      <!-- 邮箱 -->
      <div>
        <label
          for="email"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >{{ t('survey.contact.email_label') }}</label
        >
        <div class="mt-1">
          <input
            id="email"
            v-model.trim="localSurveyData.email"
            type="email"
            name="email"
            autocomplete="email"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 py-2.5"
            :placeholder="t('survey.contact.email_placeholder')"
          />
        </div>
      </div>

      <!-- 手机号 -->
      <div>
        <label
          for="phone"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >{{ t('survey.contact.phone_label') }}</label
        >
        <div class="mt-1">
          <input
            id="phone"
            v-model.trim="localSurveyData.phone"
            type="tel"
            name="phone"
            autocomplete="tel"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 py-2.5"
            :placeholder="t('survey.contact.phone_placeholder')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
