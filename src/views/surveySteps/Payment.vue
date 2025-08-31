<!-- filepath: d:\workspace\yzy_Vue\Cloudloom\src\views\surveySteps\Payment.vue -->
<template>
  <div class="space-y-4 sm:space-y-6">
    <h2 class="text-xl sm:text-2xl font-semibold text-emerald-800">{{ t('payment.title') }}</h2>
    <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
      {{ t('payment.description') }}
    </p>
    <div class="space-y-6 sm:space-y-8">
      <h3 class="text-lg sm:text-xl font-medium text-gray-800 mb-3 sm:mb-4">
        {{ t('payment.question') }}
      </h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="range in priceRanges"
          :key="range"
          @click="update('priceRange', range)"
          :class="[
            'p-4 text-center rounded-xl border-2 transition-all duration-200 cursor-pointer',
            modelValue.priceRange === range
              ? 'border-emerald-600 bg-emerald-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-emerald-300',
          ]"
        >
          <p class="font-medium text-lg text-gray-700">{{ range }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const priceRanges = ['€20-€40', '€40-€60', '€60-€80', '€80+']

function update(key: string, value: any) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>
