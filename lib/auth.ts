import { account } from "./appwrite"
import { ID } from "appwrite"
import type { User } from "@/types/auth"

export const createAccount = async (email: string, password: string, name: string): Promise<User> => {
  try {
    await account.create(ID.unique(), email, password, name)
    await account.createEmailPasswordSession(email, password)
    const user = await account.get()
    return user as User
  } catch (error: any) {
    throw new Error(error.message || "Erro ao criar conta")
  }
}

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    await account.createEmailPasswordSession(email, password)
    const user = await account.get()
    return user as User
  } catch (error: any) {
    throw new Error(error.message || "Erro ao fazer login")
  }
}

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const user = await account.get()
    return user as User
  } catch (error) {
    return null
  }
}

export const logoutUser = async (): Promise<void> => {
  try {
    await account.deleteSession("current")
  } catch (error) {
    console.error("Erro ao fazer logout:", error)
  }
}
