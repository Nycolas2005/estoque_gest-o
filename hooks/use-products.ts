"use client"

import { useState, useEffect } from "react"
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/lib/products"
import type { Product, StockStats } from "@/types/product"

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts()
      setProducts(data)
      setError(null)
    } catch (err: any) {
      setError(err.message || "Erro ao carregar produtos")
    } finally {
      setLoading(false)
    }
  }

  const addProduct = async (product: Omit<Product, "$id" | "createdAt" | "updatedAt">) => {
    try {
      const newProduct = await createProduct(product)
      setProducts((prev) => [newProduct, ...prev])
      return newProduct
    } catch (err: any) {
      setError(err.message || "Erro ao adicionar produto")
      throw err
    }
  }

  const editProduct = async (id: string, product: Partial<Product>) => {
    try {
      const updatedProduct = await updateProduct(id, product)
      setProducts((prev) => prev.map((p) => (p.$id === id ? updatedProduct : p)))
      return updatedProduct
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar produto")
      throw err
    }
  }

  const removeProduct = async (id: string) => {
    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p.$id !== id))
    } catch (err: any) {
      setError(err.message || "Erro ao remover produto")
      throw err
    }
  }

  const getStats = (): StockStats => {
    const totalProducts = products.length
    const totalValue = products.reduce((sum, product) => sum + product.price * product.quantity, 0)
    const lowStockItems = products.filter((product) => product.quantity <= product.minStock).length
    const outOfStockItems = products.filter((product) => product.quantity === 0).length

    return {
      totalProducts,
      totalValue,
      lowStockItems,
      outOfStockItems,
    }
  }

  return {
    products,
    loading,
    error,
    addProduct,
    editProduct,
    removeProduct,
    refreshProducts: fetchProducts,
    stats: getStats(),
  }
}
