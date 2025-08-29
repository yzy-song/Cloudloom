/*
 * @Author: yzy
 * @Date: 2025-08-27 23:48:22
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-29 08:02:34
 */
// src/i18n/index.ts
import { createI18n } from 'vue-i18n'

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
 * 动态加载所有语言包并创建i18n实例
 * @returns {Promise<any>}
 */
export async function createI18nInstance() {
  const initialLocale = getInitialLocale()

  const i18n = createI18n({
    legacy: false, // 使用 Composition API 模式
    locale: initialLocale,
    fallbackLocale: 'en',
    messages: {}, // 初始为空，动态加载
  })

  // 动态加载所有语言包
  const locales = ['en', 'zh']
  for (const lang of locales) {
    try {
      const messages = await fetch(`/locales/${lang}.json`).then((res) => res.json())
      i18n.global.setLocaleMessage(lang, messages)
    } catch (error) {
      logger.error(`Failed to load locale messages for ${lang}:`, error)
    }
  }

  return i18n
}
