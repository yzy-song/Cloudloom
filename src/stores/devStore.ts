/*
 * @Author: yzy
 * @Date: 2025-08-16 13:45:16
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-16 14:10:01
 */
import { defineStore } from 'pinia'

export const useDevStore = defineStore('dev', {
  state: () => ({
    devPanelVisible: true,
    showQrCode: false,
  }),
  actions: {
    togglePanel() {
      this.devPanelVisible = !this.devPanelVisible
      localStorage.setItem('devPanelVisible', this.devPanelVisible.toString())
    },
    toggleQrCode() {
      this.showQrCode = !this.showQrCode
    },
  },
})
