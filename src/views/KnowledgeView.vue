<template>
  <div class="bg-white min-h-screen">
    <!-- 顶部大图 -->
    <div class="relative h-64 md:h-96 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-hanfu-blue/70 to-hanfu-red/40"></div>
      <div class="absolute inset-0 bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
      <div class="absolute bottom-8 left-8 text-white max-w-2xl">
        <h1 class="text-3xl md:text-5xl font-display">汉服知识库</h1>
        <p class="mt-2 md:mt-4 text-lg md:text-xl opacity-90">
          探索华夏衣冠的千年传承，了解汉服的历史、形制与文化内涵
        </p>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- 侧边导航 -->
        <div class="lg:col-span-1">
          <div class="sticky top-28 bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-display font-semibold text-gray-900 mb-4">知识目录</h2>
            <nav class="space-y-2">
              <button
                v-for="(section, index) in knowledgeSections"
                :key="index"
                :class="[
                  'w-full text-left px-4 py-3 rounded-lg transition',
                  activeSection === section.id
                    ? 'bg-hanfu-blue/10 text-hanfu-blue font-medium'
                    : 'text-gray-700 hover:bg-gray-100',
                ]"
                @click="scrollToSection(section.id)"
              >
                {{ section.title }}
              </button>
            </nav>

            <!-- 快速导航 -->
            <div class="mt-8 pt-6 border-t border-gray-200">
              <h3 class="text-lg font-medium text-gray-900 mb-3">快速导航</h3>
              <div class="space-y-2">
                <router-link
                  v-for="nav in quickNav"
                  :key="nav.path"
                  :to="nav.path"
                  class="flex items-center text-hanfu-blue hover:text-hanfu-red transition-colors"
                >
                  <span class="text-sm">{{ nav.title }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- 主要内容 -->
        <div class="lg:col-span-3">
          <!-- 汉服历史 -->
          <section :id="knowledgeSections[0].id" class="scroll-mt-24">
            <h2 class="text-2xl md:text-3xl font-display text-gray-900 mb-6">汉服历史演变</h2>
            <div class="prose prose-lg max-w-none">
              <p>
                汉服，全称是"汉民族传统服饰"，又称汉衣冠、汉装、华服，是从黄帝即位到明末清初，
                在汉族的主要居住区，以"华夏－汉"文化为背景和主导思想，以华夏礼仪文化为中心，
                通过自然演化而形成的具有独特汉民族风貌性格，明显区别于其他民族的传统服装和配饰体系。
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div
                  v-for="(era, index) in historicalEras"
                  :key="index"
                  class="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition"
                >
                  <h3 class="text-xl font-display font-semibold text-gray-900">{{ era.name }}</h3>
                  <p class="text-sm text-gray-500 mt-1">{{ era.period }}</p>
                  <p class="mt-3 text-gray-700">{{ era.description }}</p>
                  <button
                    class="mt-4 text-hanfu-blue hover:text-hanfu-red text-sm font-medium"
                    @click="showEraDetail(era)"
                  >
                    了解更多 &rarr;
                  </button>
                </div>
              </div>

              <p>
                汉服"始于黄帝，备于尧舜"，源自黄帝制冕服。定型于周朝，并通过汉朝依据四书五经形成完备的冠服体系，
                成为神道设教的一部分。因此后来各个华夏朝代均宗周法汉以继承汉衣冠为国家大事，
                于是有了二十四史中的舆服志。"黄帝、尧、舜垂衣裳而治天下，益取自乾坤"，
                是说上衣下裳的形制是取天意而定，是神圣的。
              </p>
            </div>
          </section>

          <!-- 汉服形制 -->
          <section :id="knowledgeSections[1].id" class="scroll-mt-24 mt-16">
            <h2 class="text-2xl md:text-3xl font-display text-gray-900 mb-6">汉服主要形制</h2>
            <div class="prose prose-lg max-w-none">
              <p>汉服有多种形制，不同朝代有不同的特点和变化。以下是几种主要的汉服形制：</p>

              <div class="my-8 space-y-6">
                <div
                  v-for="(style, index) in clothingStyles"
                  :key="index"
                  class="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    <div class="bg-gray-200 border-2 border-dashed rounded-xl aspect-[3/4]"></div>
                    <div class="md:col-span-2">
                      <h3 class="text-xl font-display font-semibold text-gray-900">
                        {{ style.name }}
                      </h3>
                      <p class="text-sm text-gray-500 mt-1">{{ style.period }}</p>
                      <p class="mt-3 text-gray-700">{{ style.description }}</p>
                      <div class="mt-4 flex flex-wrap gap-2">
                        <span
                          v-for="(tag, tagIndex) in style.tags"
                          :key="tagIndex"
                          class="px-2 py-1 bg-hanfu-blue/10 text-hanfu-blue text-xs rounded-full"
                        >
                          {{ tag }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 穿着礼仪 -->
          <section :id="knowledgeSections[2].id" class="scroll-mt-24 mt-16">
            <h2 class="text-2xl md:text-3xl font-display text-gray-900 mb-6">汉服穿着礼仪</h2>
            <div class="prose prose-lg max-w-none">
              <p>
                汉服不仅是一种服饰，更承载着深厚的礼仪文化。正确的穿着方式和场合礼仪是汉服文化的重要组成部分。
              </p>

              <div class="bg-amber-50 border-l-4 border-amber-400 p-6 my-6 rounded-r-lg">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-amber-700">
                      <strong>重要提示：</strong> 穿着汉服时应尊重传统文化，注意场合和礼仪规范。
                    </p>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div
                  v-for="(etiquette, index) in etiquetteList"
                  :key="index"
                  class="bg-white rounded-xl p-6 border border-gray-200"
                >
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <div
                        class="w-10 h-10 rounded-full bg-hanfu-red/10 flex items-center justify-center"
                      >
                        <span class="text-hanfu-red font-bold">{{ index + 1 }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h3 class="text-lg font-medium text-gray-900">{{ etiquette.title }}</h3>
                      <p class="mt-2 text-gray-600">{{ etiquette.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 常见问题 -->
          <section :id="knowledgeSections[3].id" class="scroll-mt-24 mt-16">
            <h2 class="text-2xl md:text-3xl font-display text-gray-900 mb-6">汉服常见问题</h2>
            <div class="prose prose-lg max-w-none">
              <div class="space-y-4">
                <div
                  v-for="(faq, index) in faqs"
                  :key="index"
                  class="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <button
                    class="w-full text-left p-6 flex justify-between items-center"
                    @click="toggleFaq(index)"
                  >
                    <h3 class="text-lg font-medium text-gray-900">{{ faq.question }}</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-500 transition-transform"
                      :class="{ 'rotate-180': faq.open }"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <div v-if="faq.open" class="px-6 pb-6">
                    <p class="text-gray-700">{{ faq.answer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 学习资源 -->
          <section :id="knowledgeSections[4].id" class="scroll-mt-24 mt-16">
            <h2 class="text-2xl md:text-3xl font-display text-gray-900 mb-6">延伸学习资源</h2>
            <div class="prose prose-lg max-w-none">
              <p>想要深入了解汉服文化？以下是一些推荐的学习资源和参考文献：</p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div
                  v-for="(resource, index) in learningResources"
                  :key="index"
                  class="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition"
                >
                  <h3 class="text-lg font-medium text-gray-900">{{ resource.title }}</h3>
                  <p class="text-sm text-gray-500 mt-1">{{ resource.type }}</p>
                  <p class="mt-3 text-gray-700">{{ resource.description }}</p>
                  <a
                    :href="resource.link"
                    target="_blank"
                    class="mt-4 inline-flex items-center text-hanfu-blue hover:text-hanfu-red font-medium"
                  >
                    访问资源
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- 时代详情模态框 -->
    <div
      v-if="selectedEra"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="selectedEra = null"
    >
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-display font-semibold text-gray-900">{{ selectedEra.name }}</h3>
            <button @click="selectedEra = null" class="text-gray-500 hover:text-gray-700">
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
          </div>
          <p class="text-sm text-gray-500">{{ selectedEra.period }}</p>
          <div class="bg-gray-200 border-2 border-dashed rounded-xl aspect-video w-full my-4"></div>
          <p class="text-gray-700">{{ selectedEra.description }}</p>
          <div class="mt-6">
            <h4 class="font-medium text-gray-900 mb-2">代表性服饰特征</h4>
            <ul class="list-disc list-inside text-gray-700 space-y-1">
              <li v-for="(feature, index) in selectedEra.features" :key="index">{{ feature }}</li>
            </ul>
          </div>
          <div class="mt-6 flex justify-end">
            <button @click="selectedEra = null" class="btn-primary">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface HistoricalEra {
  id: number
  name: string
  period: string
  description: string
  features: string[]
}

interface ClothingStyle {
  name: string
  period: string
  description: string
  tags: string[]
}

interface Etiquette {
  title: string
  description: string
}

interface FAQ {
  question: string
  answer: string
  open: boolean
}

interface LearningResource {
  title: string
  type: string
  description: string
  link: string
}

// 知识板块
const knowledgeSections = [
  { id: 'history', title: '汉服历史演变' },
  { id: 'styles', title: '汉服主要形制' },
  { id: 'etiquette', title: '汉服穿着礼仪' },
  { id: 'faq', title: '汉服常见问题' },
  { id: 'resources', title: '延伸学习资源' },
]

// 快速导航
const quickNav = [
  { title: '汉服展示', path: '/gallery' },
  { title: '预约体验', path: '/booking' },
  { title: '关于我们', path: '/about' },
]

// 历史时期
const historicalEras: HistoricalEra[] = [
  {
    id: 1,
    name: '周朝',
    period: '公元前1046年 - 公元前256年',
    description: '周朝确立了汉服的基本形制和礼仪规范，形成了完整的冠服制度。',
    features: ['确立上衣下裳的基本形制', '形成完整的冠服制度', '区分礼服和常服', '确立十二章纹饰'],
  },
  {
    id: 2,
    name: '汉朝',
    period: '公元前202年 - 公元220年',
    description: '汉朝继承并发展了周朝的服饰制度，形成了典型的汉服特征，对后世影响深远。',
    features: ['曲裾深衣成为主流', '直裾开始出现', '形成典型的交领右衽', '宽衣大袖成为特色'],
  },
  {
    id: 3,
    name: '唐朝',
    period: '公元618年 - 公元907年',
    description: '唐朝服饰开放多元，吸收了大量外来文化元素，形成了华丽开放的风格。',
    features: ['服饰风格开放华丽', '吸收胡服元素', '女装出现坦领、齐胸襦裙', '色彩丰富艳丽'],
  },
  {
    id: 4,
    name: '宋朝',
    period: '公元960年 - 公元1279年',
    description: '宋朝服饰趋向简约内敛，形成了典雅含蓄的风格，褙子成为代表性服饰。',
    features: ['风格简约典雅', '褙子成为流行服饰', '色彩趋向淡雅', '服饰更加修身'],
  },
]

// 汉服形制
const clothingStyles: ClothingStyle[] = [
  {
    name: '曲裾深衣',
    period: '秦汉时期',
    description: '曲裾深衣是汉代最具代表性的服饰之一，其特点是衣襟绕身多层，形成优雅的曲线。',
    tags: ['礼服', '正式场合', '秦汉风格'],
  },
  {
    name: '直裾深衣',
    period: '汉魏时期',
    description: '直裾深衣相比曲裾更为简便，衣襟垂直而下，穿着更加方便，逐渐取代曲裾成为日常服饰。',
    tags: ['常服', '日常穿着', '简便'],
  },
  {
    name: '襦裙',
    period: '历代演变',
    description: '襦裙是汉族女性传统服饰的基本形式，上身穿短衣（襦），下身穿裙，历代形制有所变化。',
    tags: ['女装', '历代流行', '基本形制'],
  },
  {
    name: '褙子',
    period: '宋明时期',
    description: '褙子是对襟长外衣，宋代开始流行，明代成为常见服饰，男女均可穿着。',
    tags: ['外衣', '宋明风格', '男女通用'],
  },
]

// 穿着礼仪
const etiquetteList: Etiquette[] = [
  {
    title: '交领右衽',
    description: '汉服的交领必须右衽，即左襟压右襟，这是汉服的基本特征和文化符号。',
  },
  {
    title: '场合选择',
    description: '不同形制的汉服适合不同场合，礼服适合正式场合，常服适合日常生活。',
  },
  {
    title: '配饰搭配',
    description: '汉服配饰包括发簪、腰带、玉佩等，应根据服饰风格和场合适当搭配。',
  },
  {
    title: '行为举止',
    description: '穿着汉服时应注意举止优雅，与服饰风格相协调，体现传统文化内涵。',
  },
]

// 常见问题
const faqs: FAQ[] = [
  {
    question: '汉服和和服、韩服有什么区别？',
    answer:
      '汉服是汉民族传统服饰，和服是日本传统服饰，韩服是朝鲜民族传统服饰。三者虽然在历史上相互影响，但在剪裁、结构、穿着方式和文化内涵上都有明显区别。汉服的主要特征是交领右衽、系带隐扣、宽衣大袖。',
    open: false,
  },
  {
    question: '现代人可以日常穿着汉服吗？',
    answer:
      '完全可以。现代汉服复兴运动鼓励人们在日常生活中穿着汉服，但需要注意场合和礼仪。可以选择适合日常的简便形制，如褙子、短襦裙等。',
    open: false,
  },
  {
    question: '如何选择适合自己的汉服形制？',
    answer:
      '选择汉服时应考虑体型、场合和个人喜好。初学者可以从简便的形制开始，如齐胸襦裙、直裾等。正式场合可选择深衣、曲裾等礼服形制。',
    open: false,
  },
  {
    question: '汉服穿着有哪些注意事项？',
    answer:
      '穿着汉服应注意交领右衽的正确方式，系带要整齐，举止要优雅。避免在不当场合穿着过于隆重的礼服，尊重传统文化和礼仪规范。',
    open: false,
  },
]

// 学习资源
const learningResources = [
  {
    title: '《汉服归来》',
    type: '书籍',
    description: '系统介绍汉服历史、形制和文化的权威著作，适合初学者和进阶学习者。',
    link: '#',
  },
  {
    title: '中国汉服网',
    type: '网站',
    description: '国内最大的汉服文化社区，提供丰富的汉服知识、穿搭教程和活动信息。',
    link: '#',
  },
  {
    title: '汉服文化周',
    type: '活动',
    description: '每年举办的汉服文化盛会，包括展览、讲座、体验活动等，是了解汉服文化的绝佳机会。',
    link: '#',
  },
  {
    title: '传统服饰研究数据库',
    type: '学术资源',
    description: '收录大量古代服饰文献和文物资料，适合深入研究汉服历史和形制的学者和爱好者。',
    link: '#',
  },
]

const activeSection = ref('history')
const selectedEra = ref<HistoricalEra | null>(null)

// 切换FAQ展开状态
function toggleFaq(index: number) {
  faqs.forEach((faq, i) => {
    if (i === index) {
      faq.open = !faq.open
    } else {
      faq.open = false
    }
  })
}

// 显示时代详情
function showEraDetail(era: HistoricalEra) {
  selectedEra.value = era
}

// 滚动到指定章节
function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    activeSection.value = sectionId
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// 监听滚动，更新激活的章节
function handleScroll() {
  const sections = knowledgeSections
    .map((section) => ({
      id: section.id,
      element: document.getElementById(section.id),
      top: document.getElementById(section.id)?.offsetTop || 0,
    }))
    .filter((section) => section.element)

  const scrollPosition = window.scrollY + 100

  for (let i = sections.length - 1; i >= 0; i--) {
    if (scrollPosition >= sections[i].top) {
      activeSection.value = sections[i].id
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始化第一个FAQ为展开状态
  if (faqs.length > 0) {
    faqs[0].open = true
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scroll-mt-24 {
  scroll-margin-top: 6rem;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .scroll-mt-24 {
    scroll-margin-top: 4rem;
  }
}
</style>
