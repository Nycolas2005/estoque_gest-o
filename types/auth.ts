export interface User {
  $id: string
  name: string
  email: string
  emailVerification: boolean
}

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface ValidationError {
  field: string
  message: string
}
