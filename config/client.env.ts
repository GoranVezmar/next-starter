import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_CLIENT_URL: z.string().url(),
});

/**
 * Construct a plain object from process.env for Zod validation.
 *
 * Zod requires a plain JavaScript object to perform validation.
 * In the browser, process.env may be a proxy or non-plain object,
 * which can cause safeParse to fail even when the variables exist.
 */
const rawClientEnv = {
  NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
};

const parsedEnv = clientEnvSchema.safeParse(rawClientEnv);

if (!parsedEnv.success) {
  console.error("❌ Invalid client environment variables:", parsedEnv.error.format());
  throw new Error("Missing or invalid client environment variables");
}

export const envClient = parsedEnv.data;

/**
 * Alternative to this could be @t3-oss/env-nextjs
 */
