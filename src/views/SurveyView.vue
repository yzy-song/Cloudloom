<template>
  <div class="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
      <div class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-display font-bold text-gray-900">
          汉服体验馆市场调研问卷
        </h1>
        <p class="mt-2 text-lg text-gray-600">
          您的回答将帮助我们更好地了解市场需求，共创独特的汉服文化体验空间！
        </p>
      </div>

      <form @submit.prevent="submitSurvey" class="space-y-8">
        <div v-for="(question, index) in questions" :key="index" class="space-y-4">
          <label :for="'question-' + index" class="block text-xl font-medium text-gray-800">
            {{ index + 1 }}. {{ question.text }}
            <span v-if="question.required" class="text-red-500">*</span>
          </label>

          <div v-if="question.type === 'text'">
            <input
              :id="'question-' + index"
              v-model="answers[question.id]"
              type="text"
              :placeholder="question.placeholder"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-hanfu-red focus:border-hanfu-red sm:text-sm"
              :required="question.required"
            />
          </div>

          <div v-if="question.type === 'radio'" class="mt-2 space-y-2">
            <div
              v-for="(option, oIndex) in question.options"
              :key="oIndex"
              class="flex items-center"
            >
              <input
                :id="`radio-${question.id}-${oIndex}`"
                v-model="answers[question.id]"
                :value="option.value"
                type="radio"
                :name="`question-${question.id}`"
                class="focus:ring-hanfu-red h-4 w-4 text-hanfu-red border-gray-300"
                :required="question.required"
              />
              <label :for="`radio-${question.id}-${oIndex}`" class="ml-3 block text-gray-700">
                {{ option.label }}
              </label>
            </div>
          </div>

          <div v-if="question.type === 'checkbox'" class="mt-2 space-y-2">
            <div
              v-for="(option, oIndex) in question.options"
              :key="oIndex"
              class="flex items-center"
            >
              <input
                :id="`checkbox-${question.id}-${oIndex}`"
                v-model="answers[question.id]"
                :value="option.value"
                type="checkbox"
                :name="`question-${question.id}`"
                class="h-4 w-4 rounded text-hanfu-red focus:ring-hanfu-red border-gray-300"
              />
              <label
                :for="`checkbox-${question.id}-${oIndex}`"
                class="ml-3 flex items-center text-gray-700"
              >
                {{ option.label }}
                <button
                  v-if="option.imageUrl"
                  type="button"
                  @click.prevent="showImage(option.imageUrl, option.label)"
                  class="ml-2 text-hanfu-blue hover:text-hanfu-blue/80 transition"
                  aria-label="查看图片"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-4 4 4 4-4v2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </label>
            </div>
          </div>

          <div v-if="question.type === 'rating'" class="mt-2 flex items-center space-x-2">
            <template v-for="n in 5" :key="n">
              <button
                type="button"
                :class="[
                  'h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center transition-colors',
                  (Number(answers[question.id]) || 0) >= n
                    ? 'bg-hanfu-red text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-hanfu-red hover:text-white',
                ]"
                @click="answers[question.id] = n"
              >
                {{ n }}
              </button>
            </template>
          </div>
        </div>

        <div class="pt-5">
          <button
            type="submit"
            :disabled="isSubmitting"
            :class="[
              'w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white transition',
              isSubmitting
                ? 'bg-hanfu-red/70 cursor-not-allowed'
                : 'bg-hanfu-red hover:bg-hanfu-red/90',
            ]"
          >
            {{ isSubmitting ? '正在提交...' : '提交问卷' }}
          </button>
        </div>
      </form>

      <div v-if="showSuccessMessage" class="mt-6 p-4 rounded-md bg-green-50 text-green-700">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium">感谢您的参与！</h3>
            <div class="mt-2 text-sm">
              <p>您的问卷已成功提交，感谢您提供的宝贵意见。</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="modal.isVisible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 transition-opacity"
    >
      <div class="relative max-w-lg w-full bg-white rounded-xl shadow-lg p-6 md:p-8">
        <button
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3 class="text-center font-bold text-xl mb-4">{{ modal.title }}</h3>
        <div class="max-h-[70vh] overflow-y-auto">
          <img
            :src="modal.imageUrl"
            :alt="modal.title"
            class="w-full h-auto object-contain rounded"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const questions = [
  // --- A. 基本信息 (用于用户画像分析) ---
  {
    id: 'gender',
    text: '您的性别是？',
    type: 'radio',
    required: true,
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
      { label: '保密', value: 'prefer_not_to_say' },
    ],
  },
  {
    id: 'age',
    text: '您的年龄段是？',
    type: 'radio',
    required: true,
    options: [
      { label: '18岁以下', value: 'under_18' },
      { label: '18-25岁', value: '18_25' },
      { label: '26-35岁', value: '26_35' },
      { label: '36-45岁', value: '36_45' },
      { label: '46岁以上', value: 'over_46' },
    ],
  },
  {
    id: 'cityTier',
    text: '您所在的城市属于？',
    type: 'radio',
    required: false,
    options: [
      { label: '一线城市（北上广深等）', value: 'tier1' },
      { label: '新一线城市（成都、杭州、武汉等）', value: 'new_tier1' },
      { label: '二线城市', value: 'tier2' },
      { label: '三线及以下城市', value: 'tier3_below' },
    ],
  },
  {
    id: 'occupation',
    text: '您的职业或身份是？',
    type: 'radio',
    required: false,
    options: [
      { label: '学生', value: 'student' },
      { label: '公司职员/白领', value: 'office_worker' },
      { label: '自由职业者', value: 'freelancer' },
      { label: '专业技术人员', value: 'professional' },
      { label: '其他', value: 'other' },
    ],
  },

  // --- B. 汉服消费习惯与行为 (了解市场需求与痛点) ---
  {
    id: 'hanfuExperience',
    text: '您对汉服的了解和接触程度是？',
    type: 'radio',
    required: true,
    options: [
      { label: '深度爱好者，经常购买和穿着', value: 'deep_enthusiast' },
      { label: '普通爱好者，偶尔购买或穿着', value: 'occasional_enthusiast' },
      { label: '对汉服文化感兴趣，但从未购买或穿着', value: 'interested_beginner' },
      { label: '了解不多，但愿意尝试', value: 'willing_to_try' },
    ],
  },
  {
    id: 'hanfuPurpose',
    text: '您拥有或希望拥有汉服的主要目的是？（可多选）',
    type: 'checkbox',
    required: true,
    options: [
      { label: '日常穿着', value: 'daily_wear' },
      { label: '特定节日或活动（如春节、中秋）', value: 'festival_event' },
      { label: '拍照打卡、旅游纪念', value: 'photo_travel' },
      { label: '参加同袍聚会或社团活动', value: 'community_gathering' },
      { label: '收藏或展示', value: 'collection' },
      { label: '公司团建、主题派对', value: 'team_building' },
      { label: '其他', value: 'other' },
    ],
  },
  {
    id: 'purchaseFrequency',
    text: '您预计每年在汉服相关产品上的消费频率是？',
    type: 'radio',
    required: false,
    options: [
      { label: '每月一次或以上', value: 'monthly_plus' },
      { label: '每季度一次', value: 'quarterly' },
      { label: '每年1-2次', value: '1-2_times_a_year' },
      { label: '很少或不购买', value: 'rarely' },
    ],
  },
  {
    id: 'hanfuObstacle',
    text: '在尝试或消费汉服时，您遇到的主要顾虑或痛点是什么？（可多选）',
    type: 'checkbox',
    required: true,
    options: [
      { label: '价格过高', value: 'price' },
      { label: '缺乏合适的穿着场景', value: 'lack_of_scenes' },
      { label: '不知道如何搭配和打理', value: 'styling_difficulty' },
      { label: '服装尺码和版型不合适', value: 'sizing_issues' },
      { label: '缺少身边的同好或圈子', value: 'lack_of_community' },
      { label: '找不到心仪的款式', value: 'style_selection' },
      { label: '其他', value: 'other' },
    ],
  },

  // --- C. 汉服体验馆服务需求 (核心业务规划) ---
  {
    id: 'serviceInterest',
    text: '您对以下哪种汉服体验馆服务最感兴趣？（可多选，选出前三）',
    type: 'checkbox',
    required: true,
    options: [
      { label: '汉服租赁（日常或活动款）', value: 'hanfu_rental' },
      {
        label: '汉服及周边产品购买（头饰、鞋子等）',
        value: 'hanfu_sale',
        imageUrl: 'https://cdn.pixabay.com/photo/2020/09/25/11/48/chinese-5591338_1280.jpg',
      },
      {
        label: '专业妆造服务（汉服造型、妆发）',
        value: 'styling',
        imageUrl: 'https://cdn.pixabay.com/photo/2023/11/12/03/49/hanfu-8382760_1280.jpg',
      },
      {
        label: '摄影服务（室内/室外主题拍摄）',
        value: 'photography',
        imageUrl: 'https://cdn.pixabay.com/photo/2021/04/09/17/14/girl-6165578_1280.jpg',
      },
      { label: '汉服主题活动/派对（如茶会、雅集、生日派对）', value: 'themed_parties' },
      { label: '文化沙龙和手工课程（如古琴、刺绣、香道）', value: 'cultural_classes' },
      { label: '私人订制服务', value: 'customization' },
      { label: '公司团建服务', value: 'team_building_service' },
    ],
  },
  {
    id: 'rentalPrice',
    text: '对于一套中等品质的汉服租赁（含妆发），您认为合理的价格区间是？',
    type: 'radio',
    required: true,
    options: [
      { label: '100元以下', value: 'under_100' },
      { label: '100-200元', value: '100-200' },
      { label: '200-350元', value: '200-350' },
      { label: '350元以上', value: 'over_350' },
    ],
  },
  {
    id: 'partyPrice',
    text: '对于一场主题汉服派对（3-5小时，含服装、场地、简餐），您认为人均合理消费是？',
    type: 'radio',
    required: true,
    options: [
      { label: '100元以下', value: 'under_100' },
      { label: '100-200元', value: '100-200' },
      { label: '200-300元', value: '200-300' },
      { label: '300元以上', value: 'over_300' },
    ],
  },

  // --- D. 综合评估与建议 (收集宝贵反馈) ---
  {
    id: 'projectFeasibility',
    text: '综合以上，您认为在您所在的城市开设一家汉服体验馆是否可行？',
    type: 'rating',
    required: true,
    options: [],
  },
  {
    id: 'keyFeature',
    text: '如果汉服体验馆开业，最吸引您持续光顾的因素是？（可多选）',
    type: 'checkbox',
    required: false,
    options: [
      {
        label: '服装款式更新快、品质好',
        value: 'clothing_quality',
        imageUrl: 'https://cdn.pixabay.com/photo/2021/04/13/11/49/man-6175069_1280.jpg',
      },
      {
        label: '专业的妆造和摄影服务',
        value: 'professional_service',
        imageUrl: 'https://cdn.pixabay.com/photo/2023/11/12/03/49/hanfu-8382760_1280.jpg',
      },
      { label: '丰富的线下主题活动', value: 'rich_activities' },
      { label: '舒适、有特色的体验馆环境', value: 'store_environment' },
      { label: '价格优惠和会员福利', value: 'price_and_loyalty' },
      { label: '社区氛围浓厚，可以结交同好', value: 'strong_community' },
      { label: '位置便利，交通方便', value: 'convenient_location' },
      { label: '其他', value: 'other' },
    ],
  },
  {
    id: 'suggestion',
    text: '您对我们的汉服体验馆项目有什么宝贵的建议？',
    type: 'text',
    required: false,
    placeholder: '例如：您希望我们提供哪些特色服务？您对场地有什么期待？',
  },
]

// 定义 answers 类型为 Record<string, any>
const answers = ref<Record<string, string | string[] | number | undefined>>({})
// 表单提交状态
const isSubmitting = ref(false)
const showSuccessMessage = ref(false)

// 弹窗状态
const modal = ref({
  isVisible: false,
  imageUrl: '',
  title: '',
})

// 显示图片弹窗
const showImage = (url: string, title: string) => {
  modal.value.imageUrl = url
  modal.value.title = title
  modal.value.isVisible = true
}

// 关闭图片弹窗
const closeModal = () => {
  modal.value.isVisible = false
  modal.value.imageUrl = ''
  modal.value.title = ''
}

// 提交问卷
const submitSurvey = () => {
  // 简单验证必填项
  const requiredQuestions = questions.filter((q) => q.required)
  for (const q of requiredQuestions) {
    const answer = answers.value[q.id]
    if (
      answer === undefined ||
      (typeof answer === 'string' && answer.trim() === '') ||
      (Array.isArray(answer) && answer.length === 0)
    ) {
      alert(`请填写必填项: ${q.text}`)
      return
    }
  }

  isSubmitting.value = true
  showSuccessMessage.value = false

  // 模拟 API 提交
  console.log('提交的问卷数据:', answers.value)

  setTimeout(() => {
    isSubmitting.value = false
    showSuccessMessage.value = true
    // 重置表单
    answers.value = {}
  }, 1500)
}
</script>

<style scoped>
/* 可选：如果你想添加更多样式，可以在这里编写 */
</style>
