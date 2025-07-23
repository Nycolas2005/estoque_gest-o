import { databases } from "./appwrite"
import { ID, Query } from "appwrite"
import type { Product } from "@/types/product"

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || ""
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || ""

export const createProduct = async (product: Omit<Product, "$id" | "createdAt" | "updatedAt">): Promise<Product> => {
  try {
    const response = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    return response as Product
  } catch (error) {
    throw error
  }
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.orderDesc("createdAt")])
    return response.documents as Product[]
  } catch (error) {
    throw error
  }
}

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  try {
    const response = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, {
      ...product,
      updatedAt: new Date().toISOString(),
    })
    return response as Product
  } catch (error) {
    throw error
  }
}

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id)
  } catch (error) {
    throw error
  }
}
