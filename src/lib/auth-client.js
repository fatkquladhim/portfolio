import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // Gunakan variabel environment dari Vercel
    baseURL: import.meta.env.VITE_API_BASE_URL,
    fetchOptions: {
        // Tanpa baris ini, session tidak akan pernah terbaca oleh server (Error 401)
        credentials: "include"
    }
})

export const { signIn, signUp, useSession, signOut } = authClient;