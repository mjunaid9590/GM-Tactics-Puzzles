import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        // Validate credentials against your database or any other authentication logic
        const { email, password } = credentials;
        user = true;
        if (user) {
          // Return object with `id`, `name`, and any other fields you need in the session
          return Promise.resolve({ id: 1, name: 'John Doe', email });
        } else {
          return Promise.resolve(null); // Return null if login failed
        }
      }
    })
  ],
  pages: {
    signIn: '/login' // Set the custom login page URL
  },
  callbacks: {
    session: async (session, user) => {
      session.user.id = user.id; // Add the user id to the session object
      return Promise.resolve(session);
    }
  }
};

export default (req, res) => NextAuth(req, res, options);



// // pages/api/auth/[...nextauth].js
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import {User} from '../../../../models/dbConn'


// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text', placeholder: 'Email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async(credentials)=>{
//     //   async authorize(credentials, _req) {
//         console.log("Credentials: ", credentials);
//         // Add your manual authentication logic here
//         // You can query the database or call an authentication API
//         // Return an object with user information if authentication is successful
//         // Return null or throw an error if authentication fails
//         const user = {id: 1, Email: "jsmith@example.com", Password: "fsdafs" };
//         // const user = credentials;
//         if (user) {
//             console.log(user);
//             return user;
//         } else {
//             return null;
//         }
//       },
//     }),
//     // Add other authentication providers as needed
//   ],
//   baseUrl: 'http://localhost:3000/',
//   pages: {
//     signIn: "/login",
//   },
//   secret: process.env.JWT_SECRET,
//   // Configure other options as needed
// });

// export { handler as GET, handler as POST }
