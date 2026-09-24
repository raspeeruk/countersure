import NextAuth, { type NextAuthConfig } from 'next-auth';
import Resend from 'next-auth/providers/resend';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db, isDbAvailable } from '@/db';
import { users, accounts, sessions, verificationTokens } from '@/db/schema';
import { loginEmail } from './login-email';

const FROM = process.env.AUTH_EMAIL_FROM || 'Countersure <countersure@siftforms.com>';

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
          async sendVerificationRequest({ identifier, url, expires, provider }) {
            const response = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: { Authorization: `Bearer ${provider.apiKey}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                from: provider.from,
                to: [identifier],
                reply_to: 'countersure@rogergroup.xyz',
                ...loginEmail(url, expires),
              }),
              signal: AbortSignal.timeout(10_000),
            });
            if (!response.ok) throw new Error(`Login email failed (${response.status})`);
          },
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
