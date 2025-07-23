export interface Product {
  $id?: string
  name: string
  description: string
  price: number
  quantity: number
  category: string
  sku: string
  minStock: number
  supplier: string
  createdAt?: string
  updatedAt?: string
}

export interface StockStats {
  totalProducts: number
  totalValue: number
  lowStockItems: number
  outOfStockItems: number
}
