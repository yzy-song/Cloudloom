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
            <template v-if="booking.bookingType === 'standard'">
              <h3 class="text-lg font-medium">{{ product?.title }}</h3>
              <p class="text-gray-600 mt-1">尺寸: {{ booking.size }}</p>
              <p class="text-hanfu-red text-xl font-medium mt-2">
                €{{ product?.price ? product.price.toFixed(2) : '--' }}
              </p>
            </template>
            <template v-else>
              <h3 class="text-lg font-medium">时段预约</h3>
              <p class="text-gray-600 mt-1">您将预约一个时间段，无需指定具体商品。</p>
              <p class="text-hanfu-red text-xl font-medium mt-2">押金：€30</p>
            </template>
          </div>

          <!-- 预约表单 -->
          <div>
            <form @submit.prevent="submitBooking" novalidate>
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
                  <div v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">邮箱 *</label>
                  <input
                    v-model="booking.email"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-hanfu-red focus:border-hanfu-red"
                    required
                    placeholder="邮箱"
                  />
                  <div v-if="errors.email" class="text-red-500 text-xs mt-1">
                    {{ errors.email }}
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">电话 *</label>
                  <input
                    v-model="booking.phone"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-hanfu-red focus:border-hanfu-red"
                    required
                    placeholder="电话"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">预约日期 *</label>
                  <input
                    v-model="booking.bookingDate"
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
                  <label class="block text-sm font-medium text-gray-700 mb-1">预约类型 *</label>
                  <select
                    v-model="booking.bookingType"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-hanfu-red focus:border-hanfu-red"
                    required
                  >
                    <option value="standard">标准预约</option>
                    <option value="time_slot_only">仅预约时间段</option>
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

            <div v-if="message" class="my-4 text-center text-green-600 font-bold">
              {{ message }}
              <div class="mt-2">
                <router-link to="/my-bookings" class="btn-primary mr-2">查看我的预约</router-link>
                <router-link to="/" class="btn-secondary">返回首页</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stripe 支付弹窗 -->
    <div v-if="showStripe" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <StripeCheckout
        :clientSecret="clientSecret"
        :bookingDetails="{
          productId: booking.bookingType === 'standard' ? product?.id : undefined,
          customerFullname: booking.name,
          customerEmail: booking.email,
          customerPhone: booking.phone,
          bookingDate: booking.bookingDate,
          bookingTime: booking.time,
          participants: 1,
          notes: booking.notes,
          bookingType: booking.bookingType,
          totalAmount: product?.price ? product.price : 30,
          bookingNumber: booking.bookingNumber,
        }"
        @success="onStripeSuccess"
        @fail="onStripeFail"
        @cancel="showStripe = false"
      />
    </div>

    <!-- 支付成功提示 -->
    <div
      v-if="paymentSuccess"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl p-8 shadow-lg w-full max-w-md text-center">
        <div class="text-green-600 text-2xl font-bold mb-4">预约并支付成功！</div>
        <router-link to="/" class="btn-primary">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import StripeCheckout from '@/components/StripeCheckout.vue' // 新增
import { useBookingStore } from '@/stores/booking.store'
import { useProductStore } from '@/stores/product.store'
import { validateEmail, validatePhone, validateRequired } from '@/utils/validation'
const route = useRoute()
const isLoading = ref(false)
const message = ref('')

const productStore = useProductStore()
const bookingStore = useBookingStore()

const productId = computed(() => route.query.productId as string)
const sizeFromQuery = computed(() => route.query.size as string | undefined)

const product = computed(() => productStore.currentProduct)

// 预约信息
const booking = reactive({
  name: '',
  email: '',
  phone: '',
  bookingDate: '',
  time: '',
  size: sizeFromQuery.value || 'M',
  notes: '',
  bookingType: 'standard', // 默认预约类型
  bookingNumber: '', // 预约号
})

// 表单错误信息
const errors = ref({
  name: '',
  email: '',
  phone: '',
  bookingDate: '',
  time: '',
})

// 可用时间段
const timeSlots = [
  '10:00 - 11:30',
  '11:30 - 13:00',
  '13:00 - 14:30',
  '14:30 - 16:00',
  '16:00 - 17:30',
]

// 获取产品详情
onMounted(async () => {
  if (productId.value) {
    await productStore.fetchProductById(Number(productId.value))
  }
  if (sizeFromQuery.value) {
    booking.size = sizeFromQuery.value
  }
})

function validateBooking() {
  let valid = true
  errors.value = { name: '', email: '', phone: '', bookingDate: '', time: '' }

  const rules = [
    {
      key: 'name',
      value: booking.name,
      message: '请输入姓名',
      validate: validateRequired,
    },
    {
      key: 'email',
      value: booking.email,
      message: '请输入邮箱',
      validate: validateRequired,
    },
    {
      key: 'email',
      value: booking.email,
      message: '请输入有效的邮箱地址',
      validate: validateEmail,
      skipIfEmpty: true,
    },
    {
      key: 'phone',
      value: booking.phone,
      message: '请输入电话',
      validate: validateRequired,
    },
    {
      key: 'phone',
      value: booking.phone,
      message: '请输入有效的电话号码',
      validate: validatePhone,
      skipIfEmpty: true,
    },
    {
      key: 'bookingDate',
      value: booking.bookingDate,
      message: '请选择预约日期',
      validate: validateRequired,
    },
    {
      key: 'time',
      value: booking.time,
      message: '请选择预约时间',
      validate: validateRequired,
    },
  ]

  for (const rule of rules) {
    if (rule.skipIfEmpty && !rule.value) continue
    if (!rule.validate(rule.value)) {
      errors.value[rule.key as keyof typeof errors.value] = rule.message
      valid = false
    }
  }

  return valid
}

// 提交预约
const showStripe = ref(false)
const clientSecret = ref('')
const paymentSuccess = ref(false)

async function submitBooking() {
  message.value = ''
  if (!validateBooking()) return

  isLoading.value = true
  try {
    const res = await bookingStore.createBooking({
      productId: booking.bookingType === 'standard' ? product.value?.id : undefined,
      customerFullname: booking.name,
      customerEmail: booking.email,
      customerPhone: booking.phone,
      bookingDate: booking.bookingDate,
      bookingTime: booking.time,
      participants: 1,
      notes: booking.notes,
      bookingType: booking.bookingType,
      totalAmount: 30,
    })
    booking.bookingNumber = res.bookingNumber
    clientSecret.value = res.client_secret ?? ''
    showStripe.value = true
  } catch (e: any) {
    message.value =
      e?.response?.data?.message ||
      e?.response?.data?.error ||
      e?.message ||
      '预约失败，请稍后重试。'
  } finally {
    isLoading.value = false
  }
}

// Stripe 支付回调
function onStripeSuccess(paymentIntent: any) {
  paymentSuccess.value = true
  showStripe.value = false
  message.value = '支付成功，预约已提交！'
}
function onStripeFail(error: any) {
  message.value = error.message || '支付失败，请重试'
}
</script>
