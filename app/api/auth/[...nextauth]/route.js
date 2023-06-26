import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorizing")

        const user = {
          username: credentials.username,
          password: credentials.password,
        }
        // const user = await res.json();
        console.log(user);
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login' // Set the custom login page URL
  },
  secret: 'khgsdk4hsdkh',
  callbacks: {
    async session({ session, user, token }) {
      session.user = token.user;
      console.log(user)

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      // console.log(token)
      return token
    },
  },

});

export { handler as GET, handler as POST }