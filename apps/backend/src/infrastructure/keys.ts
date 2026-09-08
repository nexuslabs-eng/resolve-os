import { config } from 'dotenv';
import { z } from 'zod';

// load env files
if (process.env.NODE_ENV !== 'production') {
  config();
}

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.url(),
  PORT: z.coerce.number().default(4000),
  LOG_LEVEL: z.string().default('info'),
  CLIENT_URL: z.url(),
});

export const env = EnvSchema.parse(process.env);