# Jonathan Clem Portfolio Application

## Overview
This full-stack portfolio website for Jonathan Clem, a Senior iOS Engineer and Innovation Architect, showcases professional experience, technical skills, patents, and project highlights. It features an interactive public-facing portfolio and an authenticated admin panel for content management. The application aims to provide a comprehensive, interactive representation of Jonathan Clem's professional journey and technical prowess, targeting potential employers, collaborators, and clients. It is built using a modern web stack with React, Express, PostgreSQL (via Neon), and Drizzle ORM.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework & Build System**: React 18, TypeScript, Vite, Wouter (routing), TanStack Query (data fetching).
- **UI Component Library**: Radix UI (accessible primitives), shadcn/ui (New York style components), Tailwind CSS, Class Variance Authority (CVA).
- **Styling System**: Light mode only, vibrant purple primary and coral accent color scheme (HSL values), custom color palette, Linear/Apple-inspired typography, consistent spacing, CSS variable-based elevation effects.
- **Form Management**: React Hook Form, Zod for validation, @hookform/resolvers.

### Backend Architecture
- **Server Framework**: Express.js, session-based authentication with `express-session`, PostgreSQL-backed session store via `connect-pg-simple`.
- **API Design**: RESTful API under `/api`, CRUD operations for all entities, admin-only routes protected by middleware, JSON responses.
- **Data Access Layer**: `server/storage.ts` abstraction for database operations, type-safe via TypeScript interfaces derived from Drizzle schema.

### Authentication & Authorization
- **Session Management**: Server-side sessions, HttpOnly cookies, SameSite='lax', session regeneration on login, 24-hour expiration.
- **Admin Access Control**: Single admin user, password-based authentication (ADMIN_PASSWORD env var), `requireAdmin` middleware for mutating routes, session-based authorization.
- **Security Features**: Secure cookie flag, SESSION_SECRET for encryption, server-side password validation, automatic logout on unauthorized access.

### Database Architecture
- **ORM & Schema**: Drizzle ORM for type-safe queries and migrations, schema-first approach with TypeScript types, Zod schema integration via `drizzle-zod`.
- **Database Schema**: `users`, `profile`, `skills`, `experiences`, `patents`, `projects`, `companies` tables, along with `chat_conversations`, `chat_messages`, `chat_prompts`, and `media_assets` for AI chatbot and media features.
- **Data Validation**: Insert and partial schemas from Drizzle for consistent frontend/backend validation.

### Deployment Architecture
- **Development Mode**: Vite dev server integrated with Express, HMR, Replit plugins, static file serving for attached assets.
- **Production Build**: Vite builds frontend to `dist/public`, esbuild bundles backend to `dist/index.js`, static file serving from Express.
- **Environment Configuration**: NODE_ENV, DATABASE_URL, SESSION_SECRET, ADMIN_PASSWORD.

### Key Features
- **AI Chatbot**: RAG-enabled using OpenAI gpt-4o, contextual responses from resume/patents/experience, iPhone carousel for media display, admin management for prompts.
- **Voice Chat**: ElevenLabs text-to-speech integration for natural voice responses, voice toggle, manual replay, concise responses with markdown links.
- **Featured In Section**: Showcases media appearances with embedded YouTube videos, CRUD admin management.
- **Social Activity Integration**: Displays recent GitHub commits, Stack Overflow activity feed, Twitter/X embedded timeline.
- **Blog Management**: Full CRUD for blog posts with markdown support, draft/published status.
- **Theme Customization**: Admin panel for HSL color inputs (primary, accent, background, foreground) and font selection.
- **Interactive Skills**: Clickable skills filter projects, projects display clickable skill badges for bidirectional navigation.
- **Content Management**: Comprehensive CRUD for all portfolio sections (Patents, Skills, Experience, Projects, Companies, Media Appearances) via authenticated admin panel.

## External Dependencies

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL via `@neondatabase/serverless`, WebSocket-based connection.

### UI Component Libraries
- **Radix UI**: `@radix-ui/react-*` for accessible components.
- **Lucide React**: Icon library.
- **Embla Carousel**: Carousel/slider functionality.
- **cmdk**: Command palette.

### Styling & Theming
- **Tailwind CSS**: Utility-first CSS framework.
- **PostCSS**: CSS processing.
- **clsx & tailwind-merge**: Conditional class name utilities.

### Data Management
- **TanStack Query**: Server state management.
- **React Hook Form**: Form state management.
- **Zod**: Schema validation.
- **date-fns**: Date formatting.

### Development Tools
- **TypeScript**: Type safety.
- **Drizzle Kit**: Database migration management.
- **tsx**: TypeScript execution.
- **esbuild**: Production bundling.

### Session & Security
- **express-session**: Session middleware.
- **connect-pg-simple**: PostgreSQL session store.
- **ws**: WebSocket implementation (for Neon).

### AI & Voice
- **OpenAI API**: For AI Chatbot (gpt-4o).
- **ElevenLabs API**: For text-to-speech voice responses.

### Third-Party APIs
- **GitHub API**: For fetching recent commits.
- **Stack Exchange API**: For fetching Stack Overflow activity.
- **YouTube API**: For embedding videos in "Featured In" section.

### Fonts
- **Google Fonts**: Inter and JetBrains Mono.