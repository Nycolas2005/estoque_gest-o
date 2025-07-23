import Link from "next/link"
import { Package, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#4B0082] rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">StockPro</span>
            </Link>
            <p className="text-gray-400">Sistema completo de gestão de estoque para empresas modernas.</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <div className="space-y-2">
              <Link href="#recursos" className="block text-gray-400 hover:text-white transition-colors">
                Recursos
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Preços
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Documentação
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <div className="space-y-2">
              <Link href="#contato" className="block text-gray-400 hover:text-white transition-colors">
                Contato
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Privacidade
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Termos
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">nycolasdavigr@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+55 (11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Aracaju, Brasil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 StockPro. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
