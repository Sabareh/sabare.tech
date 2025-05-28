import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const users = await sql`
            SELECT id, email, name, password_hash, role, avatar_url 
            FROM users 
            WHERE email = ${credentials.email}
            LIMIT 1
          `

          const user = users[0]

          if (!user || !user.password_hash) {
            return null
          }

          const isPasswordValid = await compare(credentials.password, user.password_hash)

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.avatar_url,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.role = token.role as string
      }

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      } else if (token.email) {
        try {
          const users = await sql`
            SELECT id, name, email, role, avatar_url 
            FROM users 
            WHERE email = ${token.email}
            LIMIT 1
          `

          const dbUser = users[0]

          if (dbUser) {
            token.id = dbUser.id.toString()
            token.name = dbUser.name
            token.email = dbUser.email
            token.picture = dbUser.avatar_url
            token.role = dbUser.role
          }
        } catch (error) {
          console.error("JWT callback error:", error)
        }
      }

      return token
    },
  },
}
