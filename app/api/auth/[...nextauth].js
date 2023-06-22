// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import {User} from '../../../models/dbConn'


const options = {
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, _req) {
        console.log("Credentials: ", credentials);
        // Add your manual authentication logic here
        // You can query the database or call an authentication API
        // Return an object with user information if authentication is successful
        // Return null or throw an error if authentication fails
        const user = credentials;
        if (user) {
          return user;
        } else {
          throw new Error('Invalid username or password');
        }
      },
    }),
    // Add other authentication providers as needed
  ],
  // Configure other options as needed
};

export default (req, res) => NextAuth(req, res, options);
