"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { getCurrentUser } from "@/lib/auth"
import Navbar from "@/components/layout/navbar"
import { useAuth } from "@/hooks/use-auth"
import type { User } from "@/types/auth"

interface LayoutWithAuthProps {
  children: React.ReactNode
}

export default function LayoutWithAuth({ children }: LayoutWithAuthProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { logout } = useAuth()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    await logout()
    setUser(null)
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      {children}
    </>
  )
}
