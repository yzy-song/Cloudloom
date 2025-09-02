<!-- filepath: src/components/ImageCropper.vue -->
<template>
  <div>
    <input type="file" accept="image/*" @change="onFileChange" />
    <div v-if="imageUrl" style="width: 400px; height: 400px; position: relative">
      <img ref="imgRef" :src="imageUrl" style="max-width: 100%; display: block" />
    </div>
    <button v-if="imageUrl" @click="crop">裁剪并上传</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

const imgRef = ref<HTMLImageElement | null>(null)
const cropper = ref<InstanceType<typeof Cropper> | null>(null)
const imageUrl = ref<string | null>(null)
const fileData = ref<File | null>(null)

function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files && files[0]) {
    fileData.value = files[0]
    imageUrl.value = URL.createObjectURL(files[0])
  }
}

onMounted(() => {
  watchImage()
})

onBeforeUnmount(() => {
  cropper.value?.destroy()
})

function watchImage() {
  watch(
    () => imageUrl.value,
    (val) => {
      if (val && imgRef.value) {
        cropper.value?.destroy()
        cropper.value = new Cropper(imgRef.value, {
          viewMode: 1, // 限制图片不能移出裁剪框
          dragMode: 'move', // 拖动图片
          aspectRatio: 1, // 裁剪框比例（1:1，可自定义）
          autoCropArea: 1, // 裁剪框填满容器
          movable: true,
          cropBoxMovable: false, // 裁剪框不可拖动
          cropBoxResizable: false, // 裁剪框不可缩放
          background: false,
        })
      }
    },
    { immediate: true },
  )
}

async function crop() {
  if (!cropper.value) return
  // 获取裁剪参数
  const cropData = cropper.value.getData(true) // { x, y, width, height }
  // 获取裁剪后的blob
  cropper.value.getCroppedCanvas().toBlob(
    async (blob) => {
      if (!blob) return
      const formData = new FormData()
      formData.append('image', blob, 'cropped.jpg')
      formData.append('x', String(cropData.x))
      formData.append('y', String(cropData.y))
      formData.append('width', String(cropData.width))
      formData.append('height', String(cropData.height))
      // 发送到后端
      await fetch('http://localhost:3003/api/process-images', {
        method: 'POST',
        body: formData,
      })
      alert('裁剪并上传成功')
    },
    'image/jpeg',
    0.95,
  )
}
</script>
