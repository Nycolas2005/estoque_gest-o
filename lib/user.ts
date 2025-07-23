import { account } from "./appwrite"
import type { User } from "./auth"

// Obter usuário atual
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    return await account.get()
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}
