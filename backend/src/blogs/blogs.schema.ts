import { InferInsertModel } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// Blogs table
export const BlogsTable = pgTable("blogs", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  summary: text("summary").notNull(),
  published: timestamp("published", {
    withTimezone: true
  }).defaultNow(),
  last_edited: timestamp("last_edited", {
    withTimezone: false,
  }).defaultNow().$onUpdate(() => new Date())
});

// Type for inserting to blogs table
export type BlogType = InferInsertModel<typeof BlogsTable>;

export const addNewPostSchema = createInsertSchema(BlogsTable);
