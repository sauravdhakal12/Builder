import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DB_URL } from './config';

export const db = drizzle(DB_URL);