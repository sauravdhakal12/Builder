import { InferInsertModel } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const UsersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  joined: timestamp("published", {
    withTimezone: true
  }).defaultNow(),
});

// Type of users table for inserting
export type UserType = InferInsertModel<typeof UsersTable>;

// Schema validation, additional constrains
export const createNewUserSchema = createInsertSchema(UsersTable, {
  email: z.string().email(),
  password: z.string().min(6),
});