<template>
  <div class="bg-[#FBF9F6]">
    <!-- Spacer for the fixed navbar -->
    <div class="h-[100px]"></div>

    <!-- Section 1: Hero Banner -->
    <section
      class="relative h-[60vh] md:h-[70vh] text-white flex items-center justify-center overflow-hidden"
    >
      <div class="absolute inset-0 bg-black z-0">
        <img
          src="https://images.unsplash.com/photo-1542042161-d195a8b41432?q=80&w=1932&auto-format=fit-crop"
          alt="古风派对背景"
          class="w-full h-full object-cover opacity-50"
        />
      </div>
      <div class="relative z-10 text-center p-4">
        <h1
          class="font-serif text-5xl md:text-7xl font-bold tracking-wider"
          style="text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6)"
        >
          定制您的汉服派对
        </h1>
        <p
          class="mt-4 text-lg md:text-xl max-w-2xl mx-auto"
          style="text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6)"
        >
          无论是生日庆典、团队建设还是朋友雅集，我们都为您打造独一无二的沉浸式文化体验。
        </p>
      </div>
    </section>

    <!-- Section 2: Why Choose Us -->
    <section class="py-20 md:py-28 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            为何选择我们？
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            我们提供的不仅是服装，更是一场穿越时空的文化盛宴。
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div v-for="(feature, index) in features" :key="index" class="text-center p-6">
            <div class="flex justify-center items-center mb-5">
              <component :is="feature.icon" class="w-12 h-12 text-[#C0392B]" />
            </div>
            <h3 class="font-serif text-2xl font-semibold mb-3">{{ feature.title }}</h3>
            <p class="text-gray-500">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Our Themes -->
    <section class="bg-white py-20 md:py-28 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            精选派对主题
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            我们精心设计了多种主题，满足您不同的社交与活动需求。
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="theme in themes"
            :key="theme.title"
            class="group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div class="relative h-64 overflow-hidden">
              <img
                :src="theme.image"
                :alt="theme.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h3 class="absolute bottom-4 left-4 font-serif text-3xl font-bold text-white">
                {{ theme.title }}
              </h3>
            </div>
            <div class="p-6 bg-white">
              <p class="text-gray-600 mb-4 h-24">{{ theme.description }}</p>
              <ul class="space-y-2 text-sm text-gray-500">
                <li v-for="item in theme.features" :key="item" class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Booking Process -->
    <section class="py-20 md:py-28 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">预定流程</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">简单四步，轻松开启您的专属派对。</p>
        </div>
        <div class="relative">
          <div
            class="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-repeat-x bg-center"
            style="
              background-image: linear-gradient(to right, #ccc 60%, transparent 40%);
              background-size: 20px 2px;
            "
          ></div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-16 relative">
            <div
              v-for="(step, index) in bookingSteps"
              :key="index"
              class="text-center flex flex-col items-center"
            >
              <div
                class="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center text-4xl font-serif font-bold text-[#C0392B] mb-6 border-4 border-red-100"
              >
                {{ index + 1 }}
              </div>
              <h3 class="font-serif text-2xl font-semibold mb-3">{{ step.title }}</h3>
              <p class="text-gray-500">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: CTA -->
    <section class="bg-white py-20 md:py-28 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-6">
          准备好开始了吗？
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          立即联系我们的派对策划师，让我们一起将您的构想变为现实。无论是细节咨询还是初步报价，我们都乐意为您服务。
        </p>
        <button
          class="bg-[#C0392B] text-white font-semibold tracking-wider px-10 py-4 rounded-full text-lg hover:bg-[#a53125] transition-transform hover:scale-105 duration-300 shadow-lg"
        >
          立即咨询
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { PaintBrushIcon, RectangleGroupIcon, CameraIcon } from '@heroicons/vue/24/outline'

const features = [
  {
    icon: RectangleGroupIcon,
    title: '海量汉服选择',
    description: '提供数百套各朝代、各风格的精美汉服，确保每位宾客都能找到心仪的款式。',
  },
  {
    icon: PaintBrushIcon,
    title: '专业妆造团队',
    description: '我们合作的妆造师将为您和您的宾客打造最贴合历史与个人气质的妆容和发型。',
  },
  {
    icon: CameraIcon,
    title: '一站式摄影跟拍',
    description: '无需额外寻找摄影师，我们提供专业的古风摄影服务，为您记录下每一个精彩瞬间。',
  },
]

const themes = [
  {
    title: '曲水流觞·文人雅集',
    image:
      'https://images.unsplash.com/photo-1588401389246-5604b1273783?q=80&w=1740&auto-format=fit-crop',
    description:
      '复刻古代文人的诗酒盛会。宾客们身着晋制汉服，席地而坐，体验投壶、抚琴、品茗等风雅活动。',
    features: ['适合团队建设、文化沙龙', '包含茶艺、古琴表演', '提供全套仿古道具'],
  },
  {
    title: '上元灯会·佳节团圆',
    image:
      'https://images.unsplash.com/photo-1634433433831-29a3b198bad4?q=80&w=1804&auto-format=fit-crop',
    description:
      '重现元宵佳节的繁华景象。现场布置华丽灯笼，宾客可体验猜灯谜、制作花灯、品尝元宵等传统习俗。',
    features: ['适合家庭聚会、生日庆典', '包含灯谜互动环节', '场地将进行灯笼主题布置'],
  },
  {
    title: '大唐风华·及笄之礼',
    image:
      'https://images.unsplash.com/photo-1594580254394-9e36a0515124?q=80&w=1740&auto-format=fit-crop',
    description:
      '为女孩举办一场庄重而华美的成人礼。身着雍容的唐制汉服，在亲友的见证下，完成这一生中重要的仪式。',
    features: ['适合成人礼、毕业纪念', '包含专业赞者（司仪）', '提供定制化仪式流程'],
  },
]

const bookingSteps = [
  {
    title: '提交需求',
    description: '通过线上或电话告诉我们您的派对构想、人数和预算。',
  },
  {
    title: '方案定制',
    description: '我们的策划师会为您量身打造一份专属派对方案。',
  },
  {
    title: '确认预定',
    description: '确认方案细节并支付定金，我们将为您锁定档期。',
  },
  {
    title: '尽享派对',
    description: '在约定之日，轻松前来，享受我们为您准备的一切。',
  },
]
</script>

<style scoped>
/* You can add any additional custom styles here if needed */
</style>
