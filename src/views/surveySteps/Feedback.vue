<!-- filepath: d:\workspace\yzy_Vue\Cloudloom\src\views\surveySteps\Feedback.vue -->
<template>
  <div class="space-y-4 sm:space-y-6">
    <h2 class="text-xl sm:text-2xl font-semibold text-emerald-800">{{ t('feedback.title') }}</h2>
    <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
      {{ t('feedback.description') }}
    </p>
    <textarea
      name="feedback"
      :value="modelValue.feedback"
      @input="update('feedback', ($event.target as HTMLTextAreaElement).value)"
      rows="5"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
      :placeholder="t('feedback.placeholder')"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

function update(key: string, value: any) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>
