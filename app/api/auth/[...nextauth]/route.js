import NextAuth from "next-auth/next"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile(profile) {
                console.log("Google profile:", profile)
                console.log(profile.email.split("@")[0])
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                }
            }
        })
    ],

    callbacks: {
        async session({ session, user, }) {
            if (session.user) {
                session.user.id = user.id
                console.log(session.user) // Add this line to log the session user object
            }
            console.log(session.user)
            return session
        },
}}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }