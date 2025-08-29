<template>
  <div class="bg-white min-h-screen">
    <!-- 顶部大图 -->
    <div class="relative h-64 md:h-96 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-hanfu-blue/70 to-hanfu-red/40"></div>
      <div class="absolute inset-0 bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
      <div class="absolute bottom-8 left-8 text-white max-w-2xl">
        <h1 class="text-3xl md:text-5xl font-display">商业合作</h1>
        <p class="mt-2 md:mt-4 text-lg md:text-xl opacity-90">携手推广汉服文化，共创商业价值</p>
      </div>
    </div>

    <!-- 合作模式 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-display text-gray-900">合作模式</h2>
        <p class="mt-4 text-lg text-gray-600">我们提供多种合作方式，满足不同商业伙伴的需求</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(option, index) in collaborationOptions"
          :key="index"
          class="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow bg-white"
        >
          <div
            class="w-16 h-16 rounded-full bg-hanfu-blue/10 flex items-center justify-center mb-6"
          >
            <div class="text-2xl font-bold text-hanfu-blue">{{ index + 1 }}</div>
          </div>
          <h3 class="text-xl font-display font-medium text-gray-900">{{ option.name }}</h3>
          <p class="mt-3 text-gray-600">{{ option.description }}</p>
          <ul class="mt-4 space-y-2">
            <li v-for="(benefit, i) in option.benefits" :key="i" class="flex items-start">
              <div class="flex-shrink-0 mt-0.5 mr-2 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <span class="text-gray-700">{{ benefit }}</span>
            </li>
          </ul>
          <button class="mt-6 btn-outline w-full" @click="selectedOption = option.id">
            申请合作
          </button>
        </div>
      </div>
    </div>

    <!-- 合作优势 -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-display text-gray-900">合作优势</h2>
          <p class="mt-4 text-lg text-gray-600">为什么选择与我们合作推广汉服文化</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(advantage, index) in advantages"
            :key="index"
            class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div
              class="w-12 h-12 rounded-full bg-hanfu-red/10 flex items-center justify-center mb-4"
            >
              <div class="text-xl text-hanfu-red font-bold">{{ index + 1 }}</div>
            </div>
            <h3 class="text-lg font-medium text-gray-900">{{ advantage.title }}</h3>
            <p class="mt-2 text-gray-600">{{ advantage.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 成功案例 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-display text-gray-900">成功案例</h2>
        <p class="mt-4 text-lg text-gray-600">我们与合作伙伴共同创造的文化推广活动</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white rounded-2xl overflow-hidden shadow-md">
          <div class="bg-gray-200 border-2 border-dashed aspect-video w-full"></div>
          <div class="p-6">
            <h3 class="text-xl font-display text-gray-900">都柏林文化节</h3>
            <p class="mt-2 text-gray-600">
              与都柏林市政府合作，在年度文化节上举办汉服展示活动，吸引超过5000名观众参与。
            </p>
            <div class="mt-4 flex items-center text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              2023年6月
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl overflow-hidden shadow-md">
          <div class="bg-gray-200 border-2 border-dashed aspect-video w-full"></div>
          <div class="p-6">
            <h3 class="text-xl font-display text-gray-900">传统服饰展览</h3>
            <p class="mt-2 text-gray-600">
              与爱尔兰国家博物馆合作，举办"华夏衣冠"主题展览，展期三个月，参观人数达2万人次。
            </p>
            <div class="mt-4 flex items-center text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              2023年3月-5月
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl overflow-hidden shadow-md">
          <div class="bg-gray-200 border-2 border-dashed aspect-video w-full"></div>
          <div class="p-6">
            <h3 class="text-xl font-display text-gray-900">企业团建活动</h3>
            <p class="mt-2 text-gray-600">
              为Google爱尔兰分公司设计汉服主题团建活动，让员工体验中国传统服饰文化。
            </p>
            <div class="mt-4 flex items-center text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              2023年8月
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 合作表单 -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
        <h2 class="text-2xl font-display text-gray-900 mb-2">合作申请</h2>
        <p class="text-gray-600 mb-8">请填写以下信息，我们将尽快与您联系</p>

        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
              <input
                v-model="form.name"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-hanfu-red focus:border-hanfu-red"
                required
                placeholder="您的姓名"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">联系方式 *</label>
              <input
                v-model="form.contact"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-hanfu-red focus:border-hanfu-red"
                required
                placeholder="电话或邮箱"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">公司/店铺名称</label>
              <input
                v-model="form.company"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-hanfu-red focus:border-hanfu-red"
                placeholder="您的机构名称"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">合作类型 *</label>
              <select
                v-model="form.collaborationType"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-hanfu-red focus:border-hanfu-red"
                required
              >
                <option value="" disabled selected>请选择合作类型</option>
                <option v-for="option in collaborationOptions" :key="option.id" :value="option.id">
                  {{ option.name }}
                </option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">合作意向描述 *</label>
              <textarea
                v-model="form.message"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-hanfu-red focus:border-hanfu-red"
                required
                placeholder="请描述您的合作想法或需求..."
              ></textarea>
            </div>
          </div>
          <div class="mt-8">
            <button type="submit" class="btn-primary w-full py-4">提交申请</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface CollaborationOption {
  id: number
  name: string
  description: string
  benefits: string[]
}

const collaborationOptions: CollaborationOption[] = [
  {
    id: 1,
    name: '批发采购',
    description: '为您的店铺提供各类汉服及配饰的批发服务',
    benefits: ['最低折扣价格', '独家款式供应', '专业产品培训', '营销物料支持'],
  },
  {
    id: 2,
    name: '寄售合作',
    description: '将您的空间变为汉服展示区，按销售分成',
    benefits: ['零库存风险', '高比例分成', '免费提供展示物料', '定期产品更新'],
  },
  {
    id: 3,
    name: '联合活动',
    description: '共同举办汉服文化体验活动或主题展览',
    benefits: ['专业团队支持', '活动策划协助', '媒体宣传支持', '收入分成模式'],
  },
]

const advantages = [
  {
    title: '文化专业性',
    description: '拥有专业的汉服研究团队，确保文化准确性',
  },
  {
    title: '品质保证',
    description: '所有产品均采用优质材料，工艺精湛',
  },
  {
    title: '营销支持',
    description: '提供专业营销物料和社交媒体推广支持',
  },
  {
    title: '灵活合作',
    description: '根据合作伙伴需求定制合作方案',
  },
]

const selectedOption = ref(1)

const form = ref({
  name: '',
  contact: '',
  company: '',
  collaborationType: 1,
  message: '',
})

function submitForm() {
  // 这里处理表单提交逻辑，可以发送到后端
  logger.log('提交合作申请', form.value)
  alert('合作申请已提交，我们将尽快与您联系！')
  // 重置表单
  form.value = {
    name: '',
    contact: '',
    company: '',
    collaborationType: 1,
    message: '',
  }
}
</script>
