import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import multer from 'multer'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const upload = multer({ dest: 'uploads/' })

app.post('/api/process-images', upload.array('images'), async (req, res) => {
  const files = req.files
  const { width, height, format, quality, crop, keepAspect } = req.body
  const outputDir = path.resolve(__dirname, '../output')
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir)

  await Promise.all(
    files.map(async (file) => {
      let img = sharp(file.path)
      const w = parseInt(width)
      const h = parseInt(height)
      const q = parseInt(quality)
      if (crop === 'true') {
        img = img.resize(w, h, { fit: 'cover' })
      } else if (keepAspect === 'true') {
        img = img.resize(w, h, { fit: 'inside' })
      } else {
        img = img.resize(w, h, { fit: 'fill' })
      }
      if (format === 'jpeg') img = img.jpeg({ quality: q })
      if (format === 'png') img = img.png({ quality: q })
      if (format === 'webp') img = img.webp({ quality: q })
      const outPath = path.join(outputDir, `${path.parse(file.originalname).name}_out.${format}`)
      await img.toFile(outPath)
      fs.unlinkSync(file.path)
    }),
  )

  // 自动打开 output 目录（Windows）
  exec(`start "" "${outputDir}"`)

  res.json({ ok: true })
})

app.listen(3003, () => {
  console.log('图片处理服务已启动 http://localhost:3003')
  console.log('图片处理工具       http://localhost:4000/image-batch-tool')
})
