import { createMiddleware } from "hono/factory";

import { auth } from "@/lib/auth";

import { User } from "../schemas/auth.schema";

export type AuthEnv = {
  Variables: {
    user: User;
  };
};

export const authMiddleware = createMiddleware<AuthEnv>(async (c, next) => {
  try {
    const data = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!data?.session.id) return c.json({ error: "Unauthorized" }, 401);

    const user = data?.user;
    c.set("user", user);

    await next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});
