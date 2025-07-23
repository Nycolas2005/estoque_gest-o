import { Card, CardContent } from "@/components/ui/card"
import { Shield, BarChart3, Smartphone, Clock, Users, Zap } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Segurança Avançada",
    description: "Autenticação com verificação por email e criptografia de ponta a ponta.",
  },
  {
    icon: BarChart3,
    title: "Relatórios Detalhados",
    description: "Análises completas com gráficos e métricas em tempo real.",
  },
  {
    icon: Smartphone,
    title: "Totalmente Responsivo",
    description: "Acesse de qualquer dispositivo - desktop, tablet ou smartphone.",
  },
  {
    icon: Clock,
    title: "Tempo Real",
    description: "Atualizações instantâneas de estoque e movimentações.",
  },
  {
    icon: Users,
    title: "Multi-usuário",
    description: "Gerencie equipes com diferentes níveis de acesso.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Sistema otimizado para alta performance e velocidade.",
  },
]

export default function Features() {
  return (
    <section id="recursos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Recursos Poderosos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo que você precisa para gerenciar seu estoque de forma eficiente e profissional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 p-4 rounded-full w-fit mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-[#4B0082]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
