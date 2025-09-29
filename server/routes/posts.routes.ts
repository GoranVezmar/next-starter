import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../controllers/posts.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createPostSchema } from "../schemas/post.schema";

export const postRoutes = new Hono()
  .get("/", getAllPosts)
  .post("/", authMiddleware, zValidator("json", createPostSchema()), createPost)
  .get("/:id", getPost)
  .put("/:id", authMiddleware, updatePost)
  .delete("/:id", authMiddleware, deletePost);
