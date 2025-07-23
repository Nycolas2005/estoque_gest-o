import type { LoginFormData, RegisterFormData, ValidationError } from "@/types/auth"

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 8
}

export const validateLoginForm = (data: LoginFormData): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!data.email.trim()) {
    errors.push({ field: "email", message: "Email é obrigatório" })
  } else if (!validateEmail(data.email)) {
    errors.push({ field: "email", message: "Email inválido" })
  }

  if (!data.password) {
    errors.push({ field: "password", message: "Senha é obrigatória" })
  }

  return errors
}

export const validateRegisterForm = (data: RegisterFormData): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!data.name.trim()) {
    errors.push({ field: "name", message: "Nome é obrigatório" })
  } else if (data.name.trim().length < 2) {
    errors.push({ field: "name", message: "Nome deve ter pelo menos 2 caracteres" })
  }

  if (!data.email.trim()) {
    errors.push({ field: "email", message: "Email é obrigatório" })
  } else if (!validateEmail(data.email)) {
    errors.push({ field: "email", message: "Email inválido" })
  }

  if (!data.password) {
    errors.push({ field: "password", message: "Senha é obrigatória" })
  } else if (!validatePassword(data.password)) {
    errors.push({ field: "password", message: "Senha deve ter pelo menos 8 caracteres" })
  }

  if (!data.confirmPassword) {
    errors.push({ field: "confirmPassword", message: "Confirmação de senha é obrigatória" })
  } else if (data.password !== data.confirmPassword) {
    errors.push({ field: "confirmPassword", message: "Senhas não coincidem" })
  }

  return errors
}
