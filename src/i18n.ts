/*
 * @Author: yzy
 * @Date: 2025-08-27 23:48:22
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-29 12:24:26
 */
// src/i18n/index.ts
import { createI18n } from 'vue-i18n'

// 直接导入语言包文件
import enMessages from '@/locales/en.json'
import zhMessages from '@/locales/zh.json'

import { logger } from '@/utils/logger'

/**
 * 获取用户偏好或浏览器默认语言
 * @returns {string} 语言代码
 */
function getInitialLocale(): string {
  // 1. 尝试从 localStorage 读取用户偏好语言
  const savedLocale = localStorage.getItem('user-locale')
  if (savedLocale && (savedLocale === 'zh' || savedLocale === 'en')) {
    return savedLocale
  }

  // 2. 如果没有保存的偏好，根据浏览器语言设置
  const browserLanguage = navigator.language.split('-')[0] // 'zh-CN' -> 'zh'
  if (browserLanguage === 'zh') {
    return 'zh'
  }

  // 3. 默认为英语
  return 'en'
}

/**
 * 创建i18n实例
 * @returns {any}
 */
export function createI18nInstance() {
  const initialLocale = getInitialLocale()

  const i18n = createI18n({
    legacy: false, // 使用 Composition API 模式
    locale: initialLocale,
    fallbackLocale: 'en',
    // 在创建时直接提供所有语言包
    messages: {
      en: enMessages,
      zh: zhMessages,
    },
  })

  logger.log(`i18n instance created with locale: ${initialLocale}`)

  return i18n
}
