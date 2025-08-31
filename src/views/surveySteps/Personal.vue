<!-- filepath: d:\workspace\yzy_Vue\Cloudloom\src\views\surveySteps\Personal.vue -->
<template>
  <div class="space-y-4 sm:space-y-6">
    <h2 class="text-xl sm:text-2xl font-semibold text-emerald-800">{{ t('personal.title') }}</h2>
    <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
      {{ t('personal.description') }}
    </p>
    <form class="space-y-4" @submit.prevent>
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('personal.name') }}</label>
        <input
          type="text"
          name="name"
          :value="modelValue.name"
          @input="update('name', ($event.target as HTMLInputElement).value)"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('personal.email') }}</label>
        <input
          type="email"
          name="email"
          :value="modelValue.email"
          @input="update('email', ($event.target as HTMLInputElement).value)"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('personal.phone') }}</label>
        <input
          type="tel"
          name="phone"
          :value="modelValue.phone"
          @input="update('phone', ($event.target as HTMLInputElement).value)"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('personal.city') }}</label>
        <input
          type="text"
          name="city"
          :value="modelValue.city"
          @input="update('city', ($event.target as HTMLInputElement).value)"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>
    </form>
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
