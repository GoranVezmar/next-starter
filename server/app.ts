import { Hono } from "hono";

// import { userRoutes } from '@/server/routes/users'
import { postRoutes } from "@/server/routes/posts.routes";

import { logger } from "@/lib/logger";

import { authRoutes } from "./routes/auth.routes";

// import { authRoutes } from '@/server/routes/auth'
// import { commentRoutes } from '@/server/routes/comments'

export const runtime = "nodejs";

export const app = new Hono();

// app.route('/users', userRoutes)
export const apiRoutes = app.basePath("/api").route("/auth", authRoutes).route("/posts", postRoutes);
// app.route('/comments', commentRoutes)

// hello route

// const helloLogger = logger.child({ service: 'hello' })
// app.get('/hello', (c) => {

//     helloLogger.info('Hello route accessedddddddddddddddd')
//     return c.json({ message: 'Hello, world!' })
// })

app.all("*", (c) => c.json({ error: "Not Found" }, 404));

app.onError((err, c) => {
  logger.error("Unhandled error in route", {
    message: err.message,
    stack: err.stack,
    path: c.req.path,
  });

  return c.text("Internal Server Error", 500);
});

export type ApiRoutes = typeof apiRoutes;
