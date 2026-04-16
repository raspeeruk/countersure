import {
  pgTable,
  text,
  timestamp,
  integer,
  primaryKey,
  serial,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';

// NextAuth v5 / Drizzle adapter tables ------------------------------------------------

export const users = pgTable('user', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  // Countersure additions
  plan: text('plan').notNull().default('free'), // free | cs_pro | cs_team | cs_api
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (a) => [primaryKey({ columns: [a.provider, a.providerAccountId] })]
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.identifier, t.token] })]
);

// Countersure-specific tables ---------------------------------------------------------

export const verifications = pgTable(
  'verification',
  {
    id: text('id').primaryKey(), // CS-YYYYMMDD-XXXXXXXX
    userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
    vatNumber: text('vat_number').notNull(),
    countryCode: text('country_code').notNull().default('GB'),
    status: text('status').notNull(), // verified | flagged | not_found | error
    name: text('name'),
    address: text('address'),
    source: text('source').notNull().default('HMRC'),
    rawResponse: text('raw_response'), // JSON
    checkedAt: timestamp('checked_at').notNull().defaultNow(),
  },
  (v) => [uniqueIndex('verification_vat_idx').on(v.vatNumber, v.checkedAt)]
);

export const apiKeys = pgTable('api_key', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  prefix: text('prefix').notNull(), // cs_live_a1b2c3d4 — first 12 chars
  hashed: text('hashed').notNull(), // sha256 of full key
  name: text('name').notNull().default('default'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastUsedAt: timestamp('last_used_at'),
  revokedAt: timestamp('revoked_at'),
});

export const usageMonth = pgTable(
  'usage_month',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    yearMonth: text('year_month').notNull(), // 2026-04
    singleChecks: integer('single_checks').notNull().default(0),
    bulkChecks: integer('bulk_checks').notNull().default(0),
    apiCalls: integer('api_calls').notNull().default(0),
  },
  (u) => [primaryKey({ columns: [u.userId, u.yearMonth] })]
);
