"use client"

import { useState, useCallback } from "react"
import { loginUser, createAccount, logoutUser } from "@/lib/auth"
import type { LoginFormData, RegisterFormData } from "@/types/auth"

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<{ message: string } | null>(null)

  const login = useCallback(async (data: LoginFormData) => {
    setLoading(true)
    setError(null)

    try {
      await loginUser(data.email, data.password)
      return true
    } catch (err: any) {
      setError({ message: err.message || "Erro ao fazer login" })
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (data: RegisterFormData) => {
    setLoading(true)
    setError(null)

    try {
      await createAccount(data.email, data.password, data.name)
      return true
    } catch (err: any) {
      setError({ message: err.message || "Erro ao criar conta" })
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutUser()
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  }
}
