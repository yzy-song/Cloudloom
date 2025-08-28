/*
 * @Author: yzy
 * @Date: 2025-08-27 23:48:22
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-28 13:52:01
 */
// src/i18n/index.ts
import { createI18n } from 'vue-i18n'

// 动态加载语言包（推荐）
export async function createI18nInstance() {
  const i18n = createI18n({
    legacy: false, // 使用 Composition API 模式
    locale: localStorage.getItem('locale') || 'zh', // 从本地存储获取语言
    fallbackLocale: 'en',
    messages: {}, // 初始为空，动态加载
  })

  // 动态加载所有语言包（或按需加载）
  const locales = ['en', 'zh']
  for (const lang of locales) {
    const messages = await fetch(`/locales/${lang}.json`).then((res) => res.json())
    i18n.global.setLocaleMessage(lang, messages)
  }

  return i18n
}

// 初始化 i18n
const i18n = await createI18nInstance()
export default i18n
