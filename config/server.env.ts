import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_CLIENT_URL: z.string().url(),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters long"),
  DATABASE_URL: z.string().url(),
  LOG_LEVEL: z.enum(["info", "warn", "error", "debug"]).default("info"),
  LOGTAIL_SOURCE_TOKEN: z.string().optional(),
  LOGTAIL_INGESTING_HOST: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  RESEND_API_KEY: z.string(),
  EMAIL_SENDER_NAME: z.string(),
  EMAIL_SENDER_EMAIL: z.string().email(),
});

const parsedEnv = serverEnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid server environment variables:", parsedEnv.error.format());
  throw new Error("Missing or invalid server environment variables");
}

/**
 * Use this on the server side only.
 * Using this on the client side will make the app crash.
 */
export const envServer = parsedEnv.data;
