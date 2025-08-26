import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'

const i18n = createI18n({
  legacy: false, // 推荐组合式API
  locale: 'en-US', // 默认语言
  fallbackLocale: 'en-US',
  messages: {
    'en-US': en,
    'zh-CN': zh,
  },
})

export default i18n
