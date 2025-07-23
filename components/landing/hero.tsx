"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Play, CheckCircle } from "lucide-react"

export default function Hero() {
  return (
    <section id="inicio" className="pt-20 pb-16 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-8">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Controle seu <span className="text-[#4B0082]">estoque</span> com inteligência
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                Sistema completo de gestão de estoque com autenticação segura, controle em tempo real e relatórios
                detalhados. Tudo que você precisa para gerenciar seu negócio.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 max-w-2xl">
              {[
                "Autenticação segura com verificação por email",
                "Controle de estoque em tempo real",
                "Relatórios e análises detalhadas",
                "Interface moderna e responsiva",
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#4B0082] hover:bg-[#3A0066] text-white" asChild>
                <Link href="/register" className="flex items-center">
                  Começar Grátis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex items-center bg-transparent border-[#4B0082] text-[#4B0082] hover:bg-purple-50"
              >
                <Play className="mr-2 h-4 w-4" />
                Ver Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
