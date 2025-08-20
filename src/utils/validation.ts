/*
 * @Author: yzy
 * @Date: 2025-08-20 15:48:49
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-20 16:27:26
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+353|0)(\d{7,9})$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export const validateMinLength = (value: string, min: number): boolean => {
  return value.length >= min
}
