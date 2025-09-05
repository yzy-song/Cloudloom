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

const packages = {
  packageA: {
    title: t('survey.payment.packages.packageA.title'),
    description: t('survey.payment.packages.packageA.description'),
    prices: [
      t('survey.payment.packages.packageA.prices.p1'),
      t('survey.payment.packages.packageA.prices.p2'),
      t('survey.payment.packages.packageA.prices.p3'),
    ],
    modelKey: 'pricePackageA',
  },
  packageB: {
    title: t('survey.payment.packages.packageB.title'),
    description: t('survey.payment.packages.packageB.description'),
    prices: [
      t('survey.payment.packages.packageB.prices.p1'),
      t('survey.payment.packages.packageB.prices.p2'),
      t('survey.payment.packages.packageB.prices.p3'),
    ],
    modelKey: 'pricePackageB',
  },
  packageC: {
    title: t('survey.payment.packages.packageC.title'),
    description: t('survey.payment.packages.packageC.description'),
    prices: [
      t('survey.payment.packages.packageC.prices.p1'),
      t('survey.payment.packages.packageC.prices.p2'),
      t('survey.payment.packages.packageC.prices.p3'),
    ],
    modelKey: 'pricePackageC',
  },
}

const localSurveyData = computed({
  get: () => props.surveyData,
  set: (value) => {
    emit('update:surveyData', value)
  },
})
</script>

<template>
  <div class="p-4 md:p-6">
    <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
      {{ t('survey.payment.q_title') }}
    </h2>

    <div class="space-y-8">
      <div
        v-for="pkg in packages"
        :key="pkg.modelKey"
        class="p-5 border rounded-lg bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700"
      >
        <h3 class="text-lg font-semibold text-indigo-700 dark:text-indigo-400">{{ pkg.title }}</h3>
        <p class="mt-1 text-gray-600 dark:text-gray-400">{{ pkg.description }}</p>
        <div class="mt-4 space-y-3">
          <p class="font-medium text-gray-800 dark:text-gray-200">
            {{ t('survey.payment.price_prompt') }}
          </p>
          <label
            v-for="price in pkg.prices"
            :key="price"
            class="flex items-center p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 has-[:checked]:bg-indigo-100 dark:has-[:checked]:bg-indigo-900/50"
          >
            <input
              v-model="localSurveyData[pkg.modelKey]"
              type="radio"
              :value="price"
              :name="pkg.modelKey"
              class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span class="ml-3 text-gray-800 dark:text-gray-300">{{ price }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
