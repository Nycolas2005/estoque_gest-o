"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, Loader2, Package } from "lucide-react"
import { sendContactEmail } from "@/lib/email"

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setMessage(null)

    try {
      const result = await sendContactEmail(formData)

      if (result.success) {
        setMessage({ type: "success", text: "Mensagem enviada com sucesso! Entraremos em contato em breve." })
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
      } else {
        setMessage({ type: "error", text: result.error || "Erro ao enviar mensagem. Tente novamente." })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao enviar mensagem. Tente novamente." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contato" className="py-20 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Entre em Contato</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tem alguma dúvida ou precisa de ajuda? Estamos aqui para ajudar você.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Sobre a Empresa */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-[#4B0082]" />
                  <span>Sobre a StockPro</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  A <strong>StockPro</strong> é uma empresa especializada em soluções tecnológicas para gestão de
                  estoque. Desenvolvemos sistemas modernos e intuitivos que ajudam empresas de todos os tamanhos a
                  otimizar seus processos de controle de inventário.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Nossa missão é simplificar a gestão de estoque através de tecnologia de ponta, oferecendo ferramentas
                  que proporcionam maior controle, eficiência e crescimento para seu negócio.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#4B0082] mb-2">O que oferecemos:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Sistema completo de gestão de estoque</li>
                    <li>• Autenticação segura com verificação por email</li>
                    <li>• Relatórios e análises em tempo real</li>
                    <li>• Interface moderna e responsiva</li>
                    <li>• Suporte técnico especializado</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Envie uma Mensagem</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {message && (
                <Alert
                  className={`mb-6 ${message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                >
                  <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
                    {message.text}
                  </AlertDescription>
                </Alert>
              )}

              <form id="contact-form" action={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" name="name" placeholder="Seu nome completo" required disabled={loading} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" name="subject" placeholder="Como podemos ajudar?" required disabled={loading} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Descreva sua dúvida ou solicitação..."
                    rows={5}
                    required
                    disabled={loading}
                  />
                </div>

                <Button type="submit" className="w-full bg-[#4B0082] hover:bg-[#3A0066] text-white" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
