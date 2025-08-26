<!--
 * @Author: yzy
 * @Date: 2025-08-25 15:44:11
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-25 15:45:57
-->
<template>
  <div class="stripe-modal">
    <div class="stripe-title">支付押金</div>
    <div ref="cardElement" class="stripe-card"></div>
    <button :disabled="loading" @click="pay" class="stripe-btn">
      {{ loading ? '支付中...' : '确认支付' }}
    </button>
    <button class="stripe-cancel" @click="$emit('cancel')">取消支付</button>
    <div v-if="error" class="stripe-error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadStripe } from '@stripe/stripe-js'

const props = defineProps<{ clientSecret: string }>()
const emit = defineEmits(['success', 'fail', 'cancel'])

const stripePromise = loadStripe(
  'pk_test_51RzaFyGyhldLFyVCumvuQSYuWY76QLOXSzZCLYtyxgRqXW3C3eaMeMmlHTiv3HrMc2Gy4XzMFrD8TbTTsQBhbAet00y3lxnhb0',
)
const cardElement = ref<HTMLDivElement | null>(null)
let stripe: any = null
let elements: any = null
let card: any = null

const loading = ref(false)
const error = ref('')

onMounted(async () => {
  stripe = await stripePromise
  elements = stripe.elements()
  card = elements.create('card', {
    style: {
      base: {
        color: '#222',
        fontFamily: 'inherit',
        fontSize: '16px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        '::placeholder': { color: '#bbb' },
        iconColor: '#c53030',
        padding: '12px 16px',
      },
      invalid: {
        color: '#e53e3e',
        iconColor: '#e53e3e',
      },
    },
  })
  card.mount(cardElement.value)
})

async function pay() {
  loading.value = true
  error.value = ''
  const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
    props.clientSecret,
    { payment_method: { card } },
  )
  loading.value = false
  if (stripeError) {
    error.value = stripeError.message
    emit('fail', stripeError)
  } else if (paymentIntent && paymentIntent.status === 'succeeded') {
    emit('success', paymentIntent)
  }
}
</script>

<style scoped>
.stripe-modal {
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  padding: 2.5rem 2rem 2rem 2rem;
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
}
.stripe-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #c53030;
  text-align: center;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
}
.stripe-card {
  background: #f8fafc;
  border: 1.5px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 14px 16px 8px 16px;
  margin-bottom: 1.5rem;
  min-height: 48px;
}
.stripe-btn {
  background: #c53030;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.9rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition:
    transform 0.15s,
    box-shadow 0.15s;
  box-shadow: 0 2px 8px rgba(197, 48, 48, 0.08);
  cursor: pointer;
}
.stripe-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.stripe-btn:not(:disabled):hover {
  transform: scale(1.03);
  box-shadow: 0 4px 16px rgba(197, 48, 48, 0.13);
}
.stripe-cancel {
  background: none;
  border: none;
  color: #888;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: color 0.15s;
}
.stripe-cancel:hover {
  color: #c53030;
  text-decoration: underline;
}
.stripe-error {
  color: #e53e3e;
  font-size: 0.95rem;
  text-align: center;
  margin-top: 0.5rem;
}
</style>
