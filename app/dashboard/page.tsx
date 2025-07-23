"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2, Package, DollarSign, AlertTriangle, TrendingUp, Plus, LogOut } from "lucide-react"
import { getCurrentUser, logoutUser } from "@/lib/auth"
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/lib/products"
import ProductForm from "@/components/stock/product-form"
import ProductList from "@/components/stock/product-list"
import type { User } from "@/types/auth"
import type { Product } from "@/types/product"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [productsLoading, setProductsLoading] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (user) {
      fetchProducts()
    }
  }, [user])

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push("/login")
        return
      }
      setUser(currentUser)
    } catch (error) {
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      setProductsLoading(true)
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error("Erro ao carregar produtos:", error)
    } finally {
      setProductsLoading(false)
    }
  }

  const handleLogout = async () => {
    await logoutUser()
    router.push("/login")
  }

  const handleAddProduct = async (product: Omit<Product, "$id" | "createdAt" | "updatedAt">) => {
    try {
      const newProduct = await createProduct(product)
      setProducts((prev) => [newProduct, ...prev])
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Erro ao adicionar produto:", error)
    }
  }

  const handleEditProduct = async (product: Omit<Product, "$id" | "createdAt" | "updatedAt">) => {
    if (!editingProduct?.$id) return

    try {
      const updatedProduct = await updateProduct(editingProduct.$id, product)
      setProducts((prev) => prev.map((p) => (p.$id === editingProduct.$id ? updatedProduct : p)))
      setIsEditDialogOpen(false)
      setEditingProduct(null)
    } catch (error) {
      console.error("Erro ao editar produto:", error)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p.$id !== id))
    } catch (error) {
      console.error("Erro ao deletar produto:", error)
    }
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setIsEditDialogOpen(true)
  }

  const getStats = () => {
    const totalProducts = products.length
    const totalValue = products.reduce((sum, product) => sum + product.price * product.quantity, 0)
    const lowStockItems = products.filter((product) => product.quantity <= product.minStock).length
    const outOfStockItems = products.filter((product) => product.quantity === 0).length

    return { totalProducts, totalValue, lowStockItems, outOfStockItems }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#4B0082] mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sistema de Estoque</h1>
              <p className="text-gray-600">Bem-vindo, {user.name}!</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Produtos</p>
                  <p className="text-3xl font-bold">{stats.totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-[#4B0082]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Valor Total</p>
                  <p className="text-3xl font-bold">R$ {stats.totalValue.toFixed(0)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Estoque Baixo</p>
                  <p className="text-3xl font-bold">{stats.lowStockItems}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sem Estoque</p>
                  <p className="text-3xl font-bold">{stats.outOfStockItems}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Product Button */}
        <div className="flex justify-end mb-6">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#4B0082] hover:bg-[#3A0066]">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Produto</DialogTitle>
                <DialogDescription>Preencha as informações do produto</DialogDescription>
              </DialogHeader>
              <ProductForm onSubmit={handleAddProduct} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Products List */}
        <ProductList
          products={products}
          onEdit={openEditDialog}
          onDelete={handleDeleteProduct}
          loading={productsLoading}
        />

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Produto</DialogTitle>
              <DialogDescription>Atualize as informações do produto</DialogDescription>
            </DialogHeader>
            {editingProduct && <ProductForm onSubmit={handleEditProduct} initialData={editingProduct} />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
