import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/server/utils/dbConnect.js';
import User from '@/server/models/User';
import axios from 'axios';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { findUserOrCreate } from '@/server/controllers/users';

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const { email, password } = credentials;

        try {
          await dbConnect();
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error('No user found with the provided email');
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw new Error('Invalid credentials');
          }

          // Set cookies or perform other actions here
          const response = await axios.post(
            'http://localhost:3000/api/set-cookies',
            { id: user._id },
            {
              withCredentials: true,
            },
          );
          const apiCookies = response.headers['set-cookie'];

          if (apiCookies && apiCookies.length > 0) {
            apiCookies.forEach((cookie) => {
              const parsedCookie = parse(cookie);
              const [cookieName, cookieValue] = Object.entries(parsedCookie)[0];
              const httpOnly = cookie.includes('httponly;');

              cookies().set({
                name: cookieName,
                value: cookieValue,
                httpOnly: httpOnly,
                maxAge: parseInt(parsedCookie['Max-Age']),
                path: parsedCookie.path,
                sameSite: !!parsedCookie.samesite,
                expires: new Date(parsedCookie.expires),
                secure: true,
              });
            });
          }
          //console.log(response.data);
          return {
            id: user._id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error('Error during authorization:', error);
          throw new Error('An error occurred during authorization.');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ account, profile }) {
      // console.log(account, profile);
      if (account?.provider === 'google' && profile?.email) {
        try {
          const userAuth = await findUserOrCreate(
            profile.email,
            profile.name,
            profile.picture,
          );
          console.log(userAuth, 105);
          const response = await axios.post(
            'http://localhost:3000/api/set-cookies',
            { id: userAuth.id },
            {
              withCredentials: true,
            },
          );
          const apiCookies = response.headers['set-cookie'];

          if (apiCookies && apiCookies.length > 0) {
            apiCookies.forEach((cookie) => {
              const parsedCookie = parse(cookie);
              const [cookieName, cookieValue] = Object.entries(parsedCookie)[0];
              const httpOnly = cookie.includes('httponly;');

              cookies().set({
                name: cookieName,
                value: cookieValue,
                httpOnly: httpOnly,
                maxAge: parseInt(parsedCookie['Max-Age']),
                path: parsedCookie.path,
                sameSite: !!parsedCookie.samesite,
                expires: new Date(parsedCookie.expires),
                secure: true,
              });
            });
          }
        } catch (error) {
          console.error('Error during Google sign-in:', error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, account, profile, user }) {
      return token;
    },

    async session({ session, token }) {
      return session;
    },
  },
};
