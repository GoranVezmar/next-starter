import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// import { z } from "zod";
// import { users } from './users-schema';

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  // TODO - add not null here when users table is ready
  authorId: text("author_id"),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  // authorId: uuid('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
});

export const postSelectSchema = createSelectSchema(posts);
export const postInsertSchema = createInsertSchema(posts);
