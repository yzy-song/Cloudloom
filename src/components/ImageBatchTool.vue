<!-- filepath: src/components/ImageBatchTool.vue -->
<template>
  <div class="p-6 bg-white rounded shadow max-w-xl mx-auto">
    <h2 class="text-xl font-bold mb-4">图片批量处理工具</h2>
    <div class="mb-4">
      <label class="block mb-1">选择图片（可多选）</label>
      <input type="file" multiple accept="image/*" @change="onFilesChange" />
    </div>
    <div class="mb-4 flex gap-4">
      <div>
        <label class="block mb-1">宽度(px)</label>
        <input
          type="number"
          v-model.number="params.width"
          min="1"
          class="border rounded px-2 py-1 w-24"
        />
      </div>
      <div>
        <label class="block mb-1">高度(px)</label>
        <input
          type="number"
          v-model.number="params.height"
          min="1"
          class="border rounded px-2 py-1 w-24"
        />
      </div>
      <div>
        <label class="block mb-1">格式</label>
        <select v-model="params.format" class="border rounded px-2 py-1">
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="webp">WebP</option>
        </select>
      </div>
      <div>
        <label class="block mb-1">质量(1-100)</label>
        <input
          type="number"
          v-model.number="params.quality"
          min="1"
          max="100"
          class="border rounded px-2 py-1 w-20"
        />
      </div>
    </div>
    <div class="mb-4 flex gap-4">
      <label>
        <input type="checkbox" v-model="params.crop" />
        裁剪为指定尺寸
      </label>
      <label>
        <input type="checkbox" v-model="params.keepAspect" />
        保持原始比例
      </label>
    </div>
    <button
      class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      :disabled="files.length === 0"
      @click="process"
    >
      开始处理
    </button>
    <div v-if="processing" class="mt-4 text-blue-600">正在处理...</div>
    <div v-if="done" class="mt-4 text-green-600">处理完成！请到 output 目录查看。</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const files = ref<File[]>([])
const processing = ref(false)
const done = ref(false)

const params = ref({
  width: 800,
  height: 800,
  format: 'jpeg',
  quality: 80,
  crop: false,
  keepAspect: true,
})

function onFilesChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files) {
    files.value = Array.from(input.files)
    done.value = false
  }
}

async function process() {
  if (files.value.length === 0) return
  processing.value = true
  done.value = false
  const formData = new FormData()
  files.value.forEach((f) => formData.append('images', f))
  Object.entries(params.value).forEach(([k, v]) => formData.append(k, String(v)))
  await fetch('http://localhost:3003/api/process-images', {
    method: 'POST',
    body: formData,
  })
  processing.value = false
  done.value = true
}
</script>
