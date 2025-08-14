import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: { username: { label: 'Username', type: 'text' }, password: { label: 'Password', type: 'password' } },
      authorize: async (credentials) => {
        if (!process.env.AUTH_ENABLED || process.env.AUTH_ENABLED === 'false') return { id: 'single', name: 'Single User' }
        if (credentials?.username === 'admin' && credentials?.password === 'admin') return { id: 'admin', name: 'Admin' }
        return null
      },
    }),
  ],
  pages: {},
})

export { handler as GET, handler as POST }
