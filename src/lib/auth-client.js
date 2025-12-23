import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/auth` : "https://portfolio-api-production-5604.up.railway.app/api",
    fetchOptions: {
        credentials: "include"
    }
})

export const { signIn, signUp, useSession, signOut } = authClient;
