import {
  pgTable, pgEnum, text, varchar, boolean, integer,
  timestamp, uuid, jsonb, index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ─── Multilingual content type ───────────────────────────────────────────────
export type I18n = { fa?: string; en?: string; fr?: string; ar?: string };

// ─── Enums ───────────────────────────────────────────────────────────────────
export const roleEnum    = pgEnum('role',    ['admin', 'editor', 'viewer']);
export const themeEnum   = pgEnum('theme',   ['dark', 'light', 'system']);
export const mediaEnum   = pgEnum('media_kind', ['image', 'video', 'pdf']);

// ─── better-auth required tables ─────────────────────────────────────────────
export const users = pgTable('users', {
  id:            text('id').primaryKey(),
  name:          text('name').notNull(),
  email:         text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image:         text('image'),
  role:          roleEnum('role').notNull().default('admin'),
  createdAt:     timestamp('created_at').notNull().defaultNow(),
  updatedAt:     timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
});

export const sessions = pgTable('sessions', {
  id:        text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token:     text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId:    text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
}, (t) => [index('sessions_user_id_idx').on(t.userId)]);

export const accounts = pgTable('accounts', {
  id:                     text('id').primaryKey(),
  accountId:              text('account_id').notNull(),
  providerId:             text('provider_id').notNull(),
  userId:                 text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  accessToken:            text('access_token'),
  refreshToken:           text('refresh_token'),
  idToken:                text('id_token'),
  accessTokenExpiresAt:   timestamp('access_token_expires_at'),
  refreshTokenExpiresAt:  timestamp('refresh_token_expires_at'),
  scope:                  text('scope'),
  password:               text('password'),
  createdAt:              timestamp('created_at').notNull().defaultNow(),
  updatedAt:              timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
});

export const verifications = pgTable('verifications', {
  id:         text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value:      text('value').notNull(),
  expiresAt:  timestamp('expires_at').notNull(),
  createdAt:  timestamp('created_at').defaultNow(),
  updatedAt:  timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
});

// ─── Blog Posts ───────────────────────────────────────────────────────────────
export const posts = pgTable('posts', {
  id:            uuid('id').primaryKey().defaultRandom(),
  slug:          varchar('slug', { length: 255 }).notNull().unique(),
  title:         jsonb('title').$type<I18n>().notNull(),
  excerpt:       jsonb('excerpt').$type<I18n>(),
  content:       jsonb('content').$type<I18n>().notNull(),
  coverImageUrl: text('cover_image_url'),
  published:     boolean('published').notNull().default(false),
  publishedAt:   timestamp('published_at'),
  authorId:      text('author_id').references(() => users.id, { onDelete: 'set null' }),
  tags:          text('tags').array().notNull().default([]),
  viewCount:     integer('view_count').notNull().default(0),
  seoTitle:      jsonb('seo_title').$type<I18n>(),
  seoDesc:       jsonb('seo_desc').$type<I18n>(),
  createdAt:     timestamp('created_at').notNull().defaultNow(),
  updatedAt:     timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
}, (t) => [
  index('posts_published_idx').on(t.published),
  index('posts_slug_idx').on(t.slug),
]);

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projects = pgTable('projects', {
  id:            uuid('id').primaryKey().defaultRandom(),
  slug:          varchar('slug', { length: 255 }).notNull().unique(),
  title:         jsonb('title').$type<I18n>().notNull(),
  description:   jsonb('description').$type<I18n>().notNull(),
  coverImageUrl: text('cover_image_url'),
  projectUrl:    text('project_url'),
  githubUrl:     text('github_url'),
  category:      varchar('category', { length: 100 }),
  tags:          text('tags').array().notNull().default([]),
  featured:      boolean('featured').notNull().default(false),
  order:         integer('order').notNull().default(0),
  published:     boolean('published').notNull().default(true),
  completedAt:   timestamp('completed_at'),
  createdAt:     timestamp('created_at').notNull().defaultNow(),
  updatedAt:     timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
}, (t) => [
  index('projects_featured_idx').on(t.featured, t.published),
]);

// ─── Skills ───────────────────────────────────────────────────────────────────
export const skills = pgTable('skills', {
  id:          uuid('id').primaryKey().defaultRandom(),
  name:        varchar('name', { length: 255 }).notNull(),
  category:    varchar('category', { length: 100 }).notNull(),
  proficiency: integer('proficiency').notNull().default(80),
  iconUrl:     text('icon_url'),
  order:       integer('order').notNull().default(0),
  visible:     boolean('visible').notNull().default(true),
  createdAt:   timestamp('created_at').notNull().defaultNow(),
});

// ─── Contact Messages ─────────────────────────────────────────────────────────
export const contacts = pgTable('contacts', {
  id:        uuid('id').primaryKey().defaultRandom(),
  name:      varchar('name', { length: 255 }).notNull(),
  email:     varchar('email', { length: 255 }).notNull(),
  phone:     varchar('phone', { length: 50 }),
  subject:   varchar('subject', { length: 500 }),
  message:   text('message').notNull(),
  locale:    varchar('locale', { length: 5 }).notNull().default('fa'),
  read:      boolean('read').notNull().default(false),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => [index('contacts_read_idx').on(t.read)]);

// ─── Media ────────────────────────────────────────────────────────────────────
export const media = pgTable('media', {
  id:        uuid('id').primaryKey().defaultRandom(),
  url:       text('url').notNull(),
  alt:       text('alt'),
  width:     integer('width'),
  height:    integer('height'),
  bytes:     integer('bytes'),
  kind:      mediaEnum('kind').notNull().default('image'),
  uploadedBy: text('uploaded_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ─── Site Settings (single row) ───────────────────────────────────────────────
export const siteSettings = pgTable('site_settings', {
  id:                 text('id').primaryKey().default('default'),
  theme:              themeEnum('theme').notNull().default('dark'),
  gtagId:             text('gtag_id'),
  ogDefaultImageUrl:  text('og_default_image_url'),
  sitemapEnabled:     boolean('sitemap_enabled').notNull().default(true),
  updatedAt:          timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
});

// ─── Profile (single-row, editable via admin) ────────────────────────────────
export const profile = pgTable('profile', {
  id:          text('id').primaryKey().default('default'),
  fullName:    text('full_name').notNull().default(''),
  title:       text('title').notNull().default(''),
  bioMarkdown: text('bio_markdown').notNull().default(''),
  location:    text('location').notNull().default(''),
  updatedAt:   timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
});

// ─── Relations ────────────────────────────────────────────────────────────────
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  posts:    many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}));
