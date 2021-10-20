import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { Session, User } from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import { PrismaClient } from '@prisma/client';

const prisma =
  process.env.NODE_ENV === 'production'
    ? new PrismaClient()
    : global.prisma ?? new PrismaClient();

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  callbacks: {
    session: async (session: Session, user: User) => {
      session.user.id = user.id;
      return Promise.resolve(session);
    },
  },
};

const auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default auth;
