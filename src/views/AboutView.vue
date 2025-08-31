<template>
  <div class="bg-white min-h-screen">
    <!-- 顶部大图 -->
    <div class="relative h-64 md:h-96 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-hanfu-blue/70 to-hanfu-red/40"></div>
      <div class="absolute inset-0 bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
      <div class="absolute bottom-8 left-8 text-white max-w-2xl">
        <h1 class="text-3xl md:text-5xl font-display">关于我们</h1>
        <p class="mt-2 md:mt-4 text-lg md:text-xl opacity-90">
          传承华夏衣冠，让汉服之美在爱尔兰绽放
        </p>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl md:text-3xl font-display text-gray-900 border-b pb-4">我们的故事</h2>
        <p>
          云织汉服体验馆诞生于对中华传统服饰文化的热爱与尊重。创始人张先生旅居爱尔兰多年，深感海外同胞对传统文化的渴望，以及外国友人对东方美学的浓厚兴趣。怀着对汉服文化的执着，我们决定在都柏林创立爱尔兰首家专业汉服体验馆。
        </p>

        <div class="my-8 p-6 bg-hanfu-blue/5 rounded-xl border-l-4 border-hanfu-blue">
          <p class="italic text-gray-700">
            "汉服不仅是一种服饰，更是中华五千年文明的载体。我们希望通过汉服，让更多人了解真正的中国文化。"
          </p>
          <p class="mt-2 text-right text-gray-600">— 创始人 张先生</p>
        </div>

        <h2 class="text-2xl md:text-3xl font-display text-gray-900 border-b pb-4 mt-12">
          我们的使命
        </h2>
        <p>
          我们致力于在爱尔兰推广汉服文化，通过服饰这一载体，让更多人了解华夏文明的深厚底蕴。我们相信，汉服不仅是美丽的传统服饰，更是中华文化的重要象征。我们希望通过专业的汉服体验、文化沙龙和展览活动，搭建中爱文化交流的桥梁。
        </p>

        <h2 class="text-2xl md:text-3xl font-display text-gray-900 border-b pb-4 mt-12">
          我们的特色
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div class="flex items-start p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-hanfu-red/10 flex items-center justify-center mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-hanfu-red"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-lg text-gray-900">专业复原</h3>
              <p class="mt-2 text-gray-600">严格考证历代汉服形制，确保服饰的历史准确性</p>
            </div>
          </div>

          <div class="flex items-start p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-hanfu-blue/10 flex items-center justify-center mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-hanfu-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-lg text-gray-900">精品材质</h3>
              <p class="mt-2 text-gray-600">精选丝绸、棉麻等天然面料，重现传统服饰质感</p>
            </div>
          </div>

          <div class="flex items-start p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-hanfu-gold/10 flex items-center justify-center mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-hanfu-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-lg text-gray-900">文化解读</h3>
              <p class="mt-2 text-gray-600">提供服饰文化背景讲解，让体验更有深度</p>
            </div>
          </div>

          <div class="flex items-start p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-hanfu-green/10 flex items-center justify-center mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-hanfu-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-lg text-gray-900">定制服务</h3>
              <p class="mt-2 text-gray-600">为重要场合量身定制专属汉服</p>
            </div>
          </div>
        </div>

        <h2 class="text-2xl md:text-3xl font-display text-gray-900 border-b pb-4 mt-12">
          团队介绍
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div class="flex items-start p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div class="flex-shrink-0">
              <div class="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16"></div>
            </div>
            <div class="ml-4">
              <h3 class="text-xl font-display text-gray-900 mb-1">张先生</h3>
              <p class="text-hanfu-red mt-0">创始人 & 首席文化顾问</p>
              <p class="text-gray-600 mt-2">
                传统服饰研究者，拥有十年汉服复原经验，曾任国内知名汉服品牌设计总监。对唐宋明三代服饰有深入研究。
              </p>
            </div>
          </div>

          <div class="flex items-start p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div class="flex-shrink-0">
              <div class="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16"></div>
            </div>
            <div class="ml-4">
              <h3 class="text-xl font-display text-gray-900 mb-1">李女士</h3>
              <p class="text-hanfu-red mt-0">运营总监</p>
              <p class="text-gray-600 mt-2">
                爱尔兰中国商会成员，拥有丰富的跨文化交流经验，致力于文化推广活动策划。曾组织多场大型中爱文化交流活动。
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 联系我们 -->
      <div
        class="mt-16 bg-gradient-to-r from-hanfu-blue/5 to-hanfu-red/5 p-8 rounded-2xl border border-gray-100"
      >
        <h2 class="text-2xl font-display text-gray-900 mb-4">联系我们</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-gray-700">
              <span class="font-medium block mb-1">地址</span>
              都柏林市中心文化区，具体位置预约后告知
            </p>
            <p class="text-gray-700 mt-4">
              <span class="font-medium block mb-1">营业时间</span>
              周二至周日 10:00-18:00
            </p>
          </div>
          <div>
            <p class="text-gray-700">
              <span class="font-medium block mb-1">邮箱</span>
              info@huashangjiuzhou.ie
            </p>
            <p class="text-gray-700 mt-4">
              <span class="font-medium block mb-1">电话</span>
              +353 123 456 789
            </p>
          </div>
        </div>
        <div class="mt-8">
          <button class="btn-primary w-full py-3">预约参观</button>
        </div>
      </div>
    </div>
  </div>
</template>
