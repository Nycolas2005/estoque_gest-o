import { databases } from "./appwrite"
import { ID, Query } from "appwrite"

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || ""
const TOKENS_COLLECTION_ID = "verification_tokens"

export interface VerificationToken {
  $id?: string
  email: string
  token: string
  expiresAt: string
  used: boolean
  createdAt: string
}

export const generateToken = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export const createVerificationToken = async (email: string): Promise<VerificationToken> => {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutos

  try {
    const response = await databases.createDocument(DATABASE_ID, TOKENS_COLLECTION_ID, ID.unique(), {
      email,
      token,
      expiresAt: expiresAt.toISOString(),
      used: false,
      createdAt: new Date().toISOString(),
    })
    return response as VerificationToken
  } catch (error) {
    throw error
  }
}

export const verifyToken = async (email: string, token: string): Promise<boolean> => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, TOKENS_COLLECTION_ID, [
      Query.equal("email", email),
      Query.equal("token", token),
      Query.equal("used", false),
    ])

    if (response.documents.length === 0) {
      return false
    }

    const tokenDoc = response.documents[0] as VerificationToken
    const now = new Date()
    const expiresAt = new Date(tokenDoc.expiresAt)

    if (now > expiresAt) {
      return false
    }

    // Marcar token como usado
    await databases.updateDocument(DATABASE_ID, TOKENS_COLLECTION_ID, tokenDoc.$id!, { used: true })

    return true
  } catch (error) {
    return false
  }
}
