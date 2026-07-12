import { pgTable, text, serial, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const pageItemOverridesTable = pgTable("page_item_overrides", {
  id: serial("id").primaryKey(),
  registryType: text("registry_type").notNull(),
  slug: text("slug").notNull(),
  title: text("title"),
  description: text("description"),
  subtitle: text("subtitle"),
  date: text("date"),
  category: text("category"),
  coverGradient: text("cover_gradient"),
  coverIcon: text("cover_icon"),
  tags: text("tags").array(),
  role: text("role"),
  period: text("period"),
  gradient: text("gradient"),
  icon: text("icon"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => [
  uniqueIndex("page_item_overrides_registry_type_slug_idx").on(table.registryType, table.slug),
]);

export const insertPageItemOverrideSchema = createInsertSchema(pageItemOverridesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertPageItemOverride = z.infer<typeof insertPageItemOverrideSchema>;
export type PageItemOverride = typeof pageItemOverridesTable.$inferSelect;
