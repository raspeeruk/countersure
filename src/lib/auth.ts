import NextAuth, { type NextAuthConfig } from 'next-auth';
import Resend from 'next-auth/providers/resend';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db, isDbAvailable } from '@/db';
import { users, accounts, sessions, verificationTokens } from '@/db/schema';

const FROM = process.env.AUTH_EMAIL_FROM || 'Countersure <noreply@siftforms.com>';

export const authConfig: NextAuthConfig = {
  trustHost: true,
  ...(isDbAvailable()
    ? {
        adapter: DrizzleAdapter(db, {
          usersTable: users,
          accountsTable: accounts,
          sessionsTable: sessions,
          verificationTokensTable: verificationTokens,
        }),
      }
    : {}),
  providers: isDbAvailable()
    ? [
        Resend({
          apiKey: process.env.RESEND_API_KEY,
          from: FROM,
        }),
      ]
    : [],
  pages: {
    signIn: '/signin',
    verifyRequest: '/signin?check=email',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        (session.user as { id?: string; plan?: string }).id = user.id;
        (session.user as { id?: string; plan?: string }).plan =
          (user as { plan?: string }).plan ?? 'free';
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
