/**
 * 根据文件名构建完整的、可访问的图片 URL。
 * 它会读取 .env 文件中的 VITE_API_BASE_IMAGE_URL 变量。
 * @param filename - 图片的文件名，例如 'image.jpg'
 * @returns 完整的图片 URL
 */
export function getBackendAssetURL(filename: string | null | undefined): string {
  // 如果文件名不存在，返回一个占位图，防止页面因 src 为空而显示错误图标
  if (!filename) {
    return 'https://via.placeholder.com/400x400.png?text=No+Image'
  }

  // 从环境变量中获取图片的基地址 (例如: http://localhost:3000/uploads)
  const baseImageUrl = import.meta.env.VITE_API_BASE_IMAGE_URL

  if (!baseImageUrl) {
    console.error('VITE_API_BASE_IMAGE_URL is not defined in .env file.')
    // 在环境变量缺失时提供一个回退，避免应用崩溃
    return 'https://via.placeholder.com/400x400.png?text=ENV+Error'
  }

  // 拼接成最终的 URL
  return `${baseImageUrl}/${filename}`
}
