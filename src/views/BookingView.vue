<template>
  <div class="bg-white min-h-screen relative">
    <!-- 全局加载指示器 -->
    <div v-if="isLoading" class="global-loading"></div>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-3xl font-display text-center mb-8">汉服体验预约</h1>

      <div class="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 md:p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- 产品信息 -->
          <div>
            <h2 class="text-xl font-display mb-4">预约详情</h2>
            <div
              class="bg-gray-200 border-2 border-dashed rounded-xl aspect-[3/4] w-full mb-4"
            ></div>
            <h3 class="text-lg font-medium">{{ product.title }}</h3>
            <p class="text-gray-600 mt-1">尺寸: {{ booking.size }}</p>
            <p class="text-hanfu-red text-xl font-medium mt-2">€{{ product.price.toFixed(2) }}</p>
          </div>

          <!-- 预约表单 -->
          <div>
            <h2 class="text-xl font-display mb-4">填写预约信息</h2>
            <form @submit.prevent="submitBooking">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
                  <input
                    v-model="booking.name"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-hanfu-red focus:border-hanfu-red"
                    required
                    placeholder="您的姓名"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">联系方式 *</label>
                  <input
                    v-model="booking.contact"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-hanfu-red focus:border-hanfu-red"
                    required
                    placeholder="电话或邮箱"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">预约日期 *</label>
                  <input
                    v-model="booking.date"
                    type="date"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-hanfu-red focus:border-hanfu-red"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">预约时间 *</label>
                  <select
                    v-model="booking.time"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-hanfu-red focus:border-hanfu-red"
                    required
                  >
                    <option value="">选择时间</option>
                    <option v-for="time in timeSlots" :key="time" :value="time">{{ time }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">备注信息</label>
                  <textarea
                    v-model="booking.notes"
                    rows="3"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-hanfu-red focus:border-hanfu-red"
                    placeholder="特殊需求或其他说明"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                class="btn-primary w-full py-4 mt-6 hover:scale-[1.02] transition-transform"
              >
                提交预约
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isLoading = ref(false)

// 模拟产品数据
const product = ref({
  id: 1,
  title: '唐风齐胸襦裙 · 霓裳羽衣',
  price: 89.99,
  dynasty: '唐',
})

// 预约信息
const booking = ref({
  name: '',
  contact: '',
  date: '',
  time: '',
  size: 'M',
  notes: '',
})

// 可用时间段
const timeSlots = ref([
  '10:00 - 11:30',
  '11:30 - 13:00',
  '13:00 - 14:30',
  '14:30 - 16:00',
  '16:00 - 17:30',
])

// 从URL参数获取产品信息
onMounted(() => {
  if (route.query.productId) {
    // 实际项目中这里应该从API获取产品详情
    console.log('预约产品:', route.query.productId)
  }

  if (route.query.size) {
    booking.value.size = route.query.size as string
  }
})

// 提交预约
function submitBooking() {
  isLoading.value = true
  setTimeout(() => {
    console.log('提交预约:', booking.value)
    alert('预约成功！我们将尽快与您确认。')
    router.push('/')
    isLoading.value = false
  }, 1500)
}
</script>
