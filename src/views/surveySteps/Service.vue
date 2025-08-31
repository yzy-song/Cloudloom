<!-- filepath: d:\workspace\yzy_Vue\Cloudloom\src\views\surveySteps\Service.vue -->
<template>
  <div class="space-y-4 sm:space-y-6">
    <h2 class="text-xl sm:text-2xl font-semibold text-emerald-800">{{ t('service.title') }}</h2>
    <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
      {{ t('service.description') }}
    </p>
    <div class="space-y-6 sm:space-y-8">
      <div>
        <h3 class="text-lg sm:text-xl font-medium text-gray-800 mb-3 sm:mb-4">
          {{ t('service.service_question') }}
        </h3>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="service in services"
            :key="service.id"
            class="flex items-center space-x-2 p-4 rounded-xl border-2 border-gray-200 bg-white"
          >
            <input
              type="checkbox"
              :id="'service-' + service.id"
              :value="service.id"
              :checked="modelValue.services.includes(service.id)"
              @change="toggleService(service.id)"
              class="form-checkbox text-emerald-600 w-5 h-5 rounded-md"
            />
            <label :for="'service-' + service.id" class="text-gray-700">{{ service.name }}</label>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-lg sm:text-xl font-medium text-gray-800 mb-3 sm:mb-4">
          {{ t('service.duration_question', { duration: modelValue.duration }) }}
        </h3>
        <input
          type="range"
          name="duration"
          min="2"
          max="8"
          :value="modelValue.duration"
          @input="update('duration', ($event.target as HTMLInputElement).valueAsNumber)"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 accent-emerald-600"
        />
        <div class="flex justify-between text-sm mt-2 text-gray-500">
          <span>{{ t('service.duration.quick') }}</span>
          <span>{{ t('service.duration.full_day') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const services = computed(() => [
  { id: 'rental', name: t('service.services.rental') },
  { id: 'makeup', name: t('service.services.makeup') },
  { id: 'photo', name: t('service.services.photo') },
  { id: 'performance', name: t('service.services.performance') },
])

function update(key: string, value: any) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

function toggleService(serviceId: string) {
  const currentServices = props.modelValue.services || []
  const newServices = currentServices.includes(serviceId)
    ? currentServices.filter((s: string) => s !== serviceId)
    : [...currentServices, serviceId]
  emit('update:modelValue', { ...props.modelValue, services: newServices })
}
</script>
