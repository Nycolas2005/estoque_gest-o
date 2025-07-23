"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, RefreshCw } from "lucide-react"
import { verifyToken, createVerificationToken } from "@/lib/tokens"
import { sendVerificationToken } from "@/lib/email"

interface EmailVerificationProps {
  email: string
  onVerified: () => void
}

export default function EmailVerification({ email, onVerified }: EmailVerificationProps) {
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const isValid = await verifyToken(email, token.toUpperCase())

      if (isValid) {
        setSuccess("Email verificado com sucesso!")
        setTimeout(() => {
          onVerified()
        }, 1500)
      } else {
        setError("Código inválido ou expirado. Tente novamente.")
      }
    } catch (error) {
      setError("Erro ao verificar código. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleResendToken = async () => {
    setResending(true)
    setError("")
    setSuccess("")

    try {
      const tokenData = await createVerificationToken(email)
      await sendVerificationToken(email, tokenData.token)
      setSuccess("Novo código enviado para seu email!")
    } catch (error) {
      setError("Erro ao reenviar código. Tente novamente.")
    } finally {
      setResending(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
          <Mail className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle>Verificar Email</CardTitle>
        <CardDescription>
          Enviamos um código de verificação para
          <br />
          <strong>{email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="token">Código de Verificação</Label>
            <Input
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value.toUpperCase())}
              placeholder="Digite o código de 6 dígitos"
              maxLength={6}
              className="text-center text-2xl font-mono tracking-widest"
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading || token.length !== 6}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Verificando..." : "Verificar Email"}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Não recebeu o código?</p>
            <Button type="button" variant="ghost" size="sm" onClick={handleResendToken} disabled={resending}>
              {resending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {resending ? (
                "Reenviando..."
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reenviar código
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
