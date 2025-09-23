import api from '../api';
/**
 * 批量上传文件
 * @param files 要上传的文件数组
 * @param type  图片类型（如 'products', 'avatars', 'banners', 'photowall'）
 * @returns 返回一个包含 {path: string} 对象的数组的 Promise
 */
export const uploadFiles = (files: File[], type: string) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  // 带上 type 参数
  return api.post<{ path: string }[]>(`/uploads/${type}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
