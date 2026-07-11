import { z } from 'zod';

/**
 * Server-side environment variables schema
 */
export const serverEnvSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('Invalid DATABASE_URL'),

  // Redis
  REDIS_URL: z.string().url('Invalid REDIS_URL').default('redis://localhost:6379'),

  // JWT
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters').default('fallback_jwt_secret_key_must_be_at_least_32_characters_long'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters').default('fallback_jwt_refresh_secret_key_must_be_at_least_32_characters_long'),
  JWT_EXPIRATION: z.string().default('15m'),
  JWT_REFRESH_EXPIRATION: z.string().default('7d'),

  // Razorpay
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),

  // API
  API_PORT: z.coerce.number().default(4000),
  API_PREFIX: z.string().default('api'),
  CORS_ORIGINS: z.string().default('http://localhost:3000,http://localhost:3001'),

  // AI
  AI_PROVIDER: z.enum(['gemini', 'openai', 'anthropic']).default('gemini'),
  AI_API_KEY: z.string().optional(),

  // Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),

  // Storage
  UPLOAD_DIR: z.string().default('./uploads'),
  MAX_FILE_SIZE: z.coerce.number().default(10485760), // 10MB

  // App
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * Client-side environment variables schema (prefixed with NEXT_PUBLIC_)
 */
export const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:4000/api'),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_ADMIN_API_URL: z.string().url().default('http://localhost:4000/api'),
  NEXT_PUBLIC_GOOGLE_MAPS_KEY: z.string().optional(),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>;

/**
 * Validate and parse server environment variables.
 * Call this at API startup to fail fast on missing config.
 */
export function validateServerEnv(env: Record<string, unknown> = process.env): ServerEnv {
  const parsed = serverEnvSchema.safeParse(env);
  if (!parsed.success) {
    console.error('❌ Invalid server environment variables:');
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error('Invalid server environment variables');
  }
  return parsed.data;
}

/**
 * Validate and parse client environment variables.
 * Call this at Next.js build time.
 */
export function validateClientEnv(env: Record<string, unknown> = process.env): ClientEnv {
  const parsed = clientEnvSchema.safeParse(env);
  if (!parsed.success) {
    console.error('❌ Invalid client environment variables:');
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error('Invalid client environment variables');
  }
  return parsed.data;
}
