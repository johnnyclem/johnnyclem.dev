import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const siteThemeSettingsTable = pgTable("site_theme_settings", {
  id: serial("id").primaryKey(),
  fontSans: text("font_sans"),
  fontDisplay: text("font_display"),
  fontMono: text("font_mono"),
  accentColor: text("accent_color"),
  backgroundColor: text("background_color"),
  textColor: text("text_color"),
  textSecondaryColor: text("text_secondary_color"),
  borderColor: text("border_color"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertSiteThemeSettingsSchema = createInsertSchema(siteThemeSettingsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertSiteThemeSettings = z.infer<typeof insertSiteThemeSettingsSchema>;
export type SiteThemeSettings = typeof siteThemeSettingsTable.$inferSelect;
