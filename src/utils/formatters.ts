/*
 * @Author: yzy
 * @Date: 2025-08-20 15:48:46
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-20 16:27:16
 */
import { type Product } from '@/types'

export const formatCurrency = (amount: number, currency = 'EUR'): string => {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const formatDate = (date: string | Date, locale = 'en-IE'): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
