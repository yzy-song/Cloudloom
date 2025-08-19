/*
 * @Author: yzy
 * @Date: 2025-08-16 10:23:53
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-19 12:10:32
 */
import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginImport from 'eslint-plugin-import'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,

  // ✅ import 插件配置
  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      // import 顺序
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // 内置模块
            'external', // 第三方依赖
            'internal', // 内部别名路径
            ['parent', 'sibling', 'index'], // 相对路径
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: 'vue',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // console.log 警告（但允许 warn 和 error）
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // 关闭 Vue 里的一些规则
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
)
