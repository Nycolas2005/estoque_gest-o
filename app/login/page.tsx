import LoginForm from "@/components/forms/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <LoginForm />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{" "}
            <Link href="/register" className="font-medium text-[#4B0082] hover:text-[#3A0066]">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
