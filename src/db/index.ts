import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const url = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;

export const db = url
  ? drizzle(neon(url), { schema })
  : (null as unknown as ReturnType<typeof drizzle>);

export const isDbAvailable = () => Boolean(url);
