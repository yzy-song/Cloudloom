/**
 * Data Transfer Objects (DTOs)
 *
 * 这个文件定义了所有用于前端和后端 API 之间数据交换的类型。
 * 它们确保了前后端交互的数据结构是一致且类型安全的。
 */

// 用于用户登录的数据结构
export interface LoginUserDto {
  identifier: string
  password: string
}

// 用于用户注册的数据结构
export interface RegisterUserDto {
  username: string
  email: string
  password: string
  confirmPassword: string
}

// 用于 Google OAuth 登录的数据结构
export interface OAuthLoginDto {
  idToken: string
}
