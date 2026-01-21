import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import checkUserExistence from "@/actions/checkUserExistence"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session }) {
      if (session?.user?.email) {
        const user = await checkUserExistence(session.user.email)
        session.user.role = user?.role ?? null
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
