# Workspace

## Overview

This project is a pnpm workspace monorepo utilizing TypeScript, designed to develop and deploy several distinct applications and shared libraries. The core vision is to create a suite of interconnected services and tools, focusing on high-quality development practices and efficient code sharing.

Key capabilities include:
- A personal portfolio and blog site (johnnyclem.dev) with four sections: Blog, Open Source, Work, and Fake Blog.
- The Fake Blog section features satirical, immersive fake websites styled as blog posts.
- A robust Express.js API server.
- A comprehensive database layer using PostgreSQL and Drizzle ORM.
- Centralized OpenAPI specification management for API clients and validation schemas.

## User Preferences

- I prefer a clear and concise communication style.
- I appreciate detailed explanations when introducing new concepts or significant changes.
- For development, I favor an iterative approach with frequent feedback.
- Please ask for confirmation before making any major architectural changes or introducing new dependencies.
- Ensure all new code adheres to TypeScript best practices and leverages type safety.

## System Architecture

The project is structured as a pnpm monorepo, facilitating shared code and consistent dependency management across packages.

**Core Technologies:**
- **Monorepo Tool:** pnpm workspaces
- **Node.js:** v24
- **TypeScript:** v5.9
- **API Framework:** Express v5
- **Database:** PostgreSQL with Drizzle ORM
- **Validation:** Zod (v4), `drizzle-zod`
- **API Codegen:** Orval (from OpenAPI spec)
- **Build Tool:** esbuild (for CJS bundles)

**Monorepo Structure:**
- `artifacts/`: Contains deployable applications.
    - `api-server/`: Express API server.
    - `tig-docs/`: Terminal Interface Guidelines documentation site (React + Vite SPA).
- `lib/`: Houses shared libraries.
    - `api-spec/`: Manages OpenAPI specification and Orval codegen.
    - `api-client-react/`: Generated React Query hooks for API interaction.
    - `api-zod/`: Generated Zod schemas for API validation.
    - `db/`: Drizzle ORM schema and database connection.
- `scripts/`: Utility scripts.

**TypeScript Configuration:**
All packages are configured as TypeScript composite projects, extending a base `tsconfig.base.json`. Type-checking and declaration emission are managed at the monorepo root to ensure correct cross-package dependency resolution.

**`tig-docs` Application Details:**
- **UI/UX:** Personal portfolio site (johnnyclem.dev) with four tabbed sections: Blog (real posts, coming soon), Open Source (GitHub projects), Work (proprietary projects like FiLMiC Pro), and Fake Blog (satirical fake websites as blog posts). The Fake Blog section contains 12 immersive posts, each with unique design parodying real tech sites.
- **Technology Stack:** React 19, Vite, Tailwind CSS v4, Wouter for routing, Lucide React for icons.
- **Navigation:** Top-level `SiteNav` component with 4 tabs; `PostNav` component for individual fake blog posts with breadcrumbs (Fake Blog > Category > Title).
- **Visual Design:** Apple-inspired frosted glass navigation, scroll-spy sidebars, font stacks (`-apple-system`, `JetBrains Mono`, `Playfair Display`), and unique UI components per post theme.
- **Key Features:** OG/Twitter Card meta tags generation, scroll-reveal animations, `prefers-reduced-motion` accessibility, SPA routing with production server for OG tags.
- **Routes:** `/` and `/blog` (Blog), `/open-source`, `/work`, `/fake-blog`, `/posts/:slug`, `/admin` (CMS admin panel).
- **CMS Admin:** Password-protected admin dashboard at `/admin` with tabs for Blog Posts (CRUD), Page Content (metadata overrides), and Theme Settings (fonts/colors). DB posts appear alongside static posts. Theme settings apply via CSS custom properties.

**`api-server` Application Details:**
- **Architecture:** An Express.js server with routes organized under `src/routes/`.
- **Validation:** Utilizes `@workspace/api-zod` for request and response validation.
- **Persistence:** Integrates with `@workspace/db` for database operations.
- **CMS Endpoints:** Blog posts CRUD (`/api/blog-posts`), page item overrides (`/api/page-item-overrides`), theme settings (`/api/theme-settings`), admin auth verification (`/api/admin/verify`).
- **Admin Auth:** Simple Bearer token middleware using `ADMIN_TOKEN` env var. Read-only endpoints (GET) are public; write endpoints require auth.

**`lib/db` Database Layer:**
- Uses Drizzle ORM with PostgreSQL.
- Exports a Drizzle client and schema models.
- Migration management is integrated with Replit for production deployments.
- **Tables:** `blog_posts` (CMS blog posts with markdown content), `page_item_overrides` (metadata overrides keyed by registry type + slug), `site_theme_settings` (fonts and colors).

**`lib/api-spec` API Specification Management:**
- Centralizes the OpenAPI 3.1 specification (`openapi.yaml`).
- Configures Orval for code generation, producing React Query hooks and Zod schemas into sibling packages.

## External Dependencies

- **PostgreSQL:** Primary database for persistent data storage.
- **Orval:** Used for generating API client code and Zod schemas from OpenAPI specifications.
- **React Query:** Integrated for data fetching and state management in React applications (`lib/api-client-react`).
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development (`artifacts/tig-docs`).
- **Lucide React:** Icon library used within the `tig-docs` application.
- **Vite:** Frontend build tool used for the `tig-docs` SPA.
- **Zod:** Schema declaration and validation library, used for API request/response validation and database schema definition.