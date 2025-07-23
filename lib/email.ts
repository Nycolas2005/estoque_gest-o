"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  try {
    const { data, error } = await resend.emails.send({
      from: "contato@seudominio.com", // Você precisa configurar um domínio no Resend
      to: ["nycolasdavigr@gmail.com"],
      subject: `Contato do site: ${subject}`,
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: "Erro ao enviar email" }
  }
}

export async function sendVerificationToken(email: string, token: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "noreply@seudominio.com",
      to: [email],
      subject: "Verificação de Email - Sistema de Estoque",
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="color: #4B0082;">Verificação de Email</h2>
          <p>Olá!</p>
          <p>Para completar seu cadastro, use o código de verificação abaixo:</p>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #4B0082; font-size: 32px; margin: 0; letter-spacing: 4px;">${token}</h1>
          </div>
          <p>Este código expira em 10 minutos.</p>
          <p>Se você não solicitou esta verificação, ignore este email.</p>
        </div>
      `,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: "Erro ao enviar token" }
  }
}
