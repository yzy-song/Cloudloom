<template>
  <div class="space-y-4 sm:space-y-6">
    <h2 class="text-xl sm:text-2xl font-semibold text-emerald-800">{{ t('education.title') }}</h2>
    <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
      {{ t('education.description') }}
    </p>
    <div class="grid md:grid-cols-3 gap-6">
      <div class="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <img
          class="w-full h-48 object-cover rounded-lg mb-4"
          src="https://placehold.co/400x300/F4A460/FFFFFF?text=Elegant"
          alt="Elegant Hanfu"
        />
        <h3 class="font-medium text-lg text-gray-800">{{ t('education.styles.elegant') }}</h3>
        <p class="text-sm text-gray-500">{{ t('education.styles.elegant_desc') }}</p>
      </div>
      <div class="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <img
          class="w-full h-48 object-cover rounded-lg mb-4"
          src="https://placehold.co/400x300/F4A460/FFFFFF?text=Casual"
          alt="Casual Hanfu"
        />
        <h3 class="font-medium text-lg text-gray-800">{{ t('education.styles.casual') }}</h3>
        <p class="text-sm text-gray-500">{{ t('education.styles.casual_desc') }}</p>
      </div>
      <div class="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <img
          class="w-full h-48 object-cover rounded-lg mb-4"
          src="https://placehold.co/400x300/F4A460/FFFFFF?text=Historical"
          alt="Historical Hanfu"
        />
        <h3 class="font-medium text-lg text-gray-800">{{ t('education.styles.historical') }}</h3>
        <p class="text-sm text-gray-500">{{ t('education.styles.historical_desc') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
