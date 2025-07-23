import RegisterForm from "@/components/forms/register-form"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <RegisterForm />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link href="/login" className="font-medium text-[#4B0082] hover:text-[#3A0066]">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
