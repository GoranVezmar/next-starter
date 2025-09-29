import { delay } from "@/utils";
import { eq } from "drizzle-orm";
import { Context } from "hono";

import { db } from "../db";
import { posts as postsTable } from "../db/schemas/post.schema";

// TODO - split this to get all posts and get user posts
export const getAllPosts = async (c: Context) => {
  try {
    const { userId } = c.req.query();
    const posts = await db
      .select()
      .from(postsTable)
      .where(userId ? eq(postsTable.authorId, userId) : undefined);

    await delay(2000);

    return c.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return c.json({ message: "Failed to fetch posts" }, 500);
  }
};

export const createPost = async (c: Context) => {
  const { title, content } = await c.req.json();
  const user = c.get("user");

  await delay(2000);

  const newPost = await db
    .insert(postsTable)
    .values({
      title,
      content,
      authorId: user.id,
    })
    .returning()
    .then((data) => data[0]);

  if (!newPost) return c.json({ message: "Post not created" }, 500);

  return c.json({ post: newPost }, 201);
};

export const getPost = async (c: Context) => {
  const { id } = c.req.param();

  const post = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.id, id))
    .then((data) => data[0]);

  if (!post) return c.json({ message: "Post not found" }, 404);

  return c.json({ post });
};

export const updatePost = async () => {};

export const deletePost = async () => {};
