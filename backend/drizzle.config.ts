import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { DB_URL } from './src/utils/config';

export default defineConfig({
  out: './drizzle',
  schema: ['./src/blogs/blogs.schema.ts', "./src/auth/auth.schema.ts"],
  dialect: 'postgresql',
  dbCredentials: {
    url: DB_URL,
  },
});