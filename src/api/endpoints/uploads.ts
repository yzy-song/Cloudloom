import api from '../api';

/**
 * 批量上传文件（支持进度回调）
 * @param files 要上传的文件数组
 * @param type  图片类型（如 'products', 'avatars', 'banners', 'photowall'）
 * @param onProgress 上传进度回调
 * @returns 返回一个包含 {path: string} 对象的数组的 Promise
 */
export const uploadFiles = (files: File[], type: string, onProgress?: (percent: number) => void) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  return api.post<{ path: string }[]>(`/uploads/${type}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: progressEvent => {
      if (onProgress) {
        const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
        onProgress(percent);
      }
    },
  });
};
