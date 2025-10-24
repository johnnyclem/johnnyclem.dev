# Jonathan Clem Portfolio Application

## Overview

This is a full-stack portfolio website for Jonathan Clem, a Senior iOS Engineer and Innovation Architect. The application showcases professional experience, technical skills, patents, and project highlights through an interactive web interface with both public-facing portfolio views and an authenticated admin panel for content management.

The application is built as a modern web stack with React frontend, Express backend, PostgreSQL database via Neon, and uses Drizzle ORM for type-safe database operations.

**Status**: ✅ Production-ready (pending environment variable configuration)

**Recent Updates** (October 24, 2025):
- ✅ **NEW: Blog Management & Theme Editor**
  - Complete blog post management with markdown support
  - Draft/Published status with automatic publishedAt timestamps
  - Public blog page at `/blog` displaying published posts only
  - Theme customization with HSL color inputs (primary, accent, background, foreground)
  - Font family selection for body and heading text
  - Admin tabs for Blog and Theme in the admin panel
  - End-to-end tested blog lifecycle (create, publish, unpublish, delete)
- ✅ Implemented clickable skills with bidirectional many-to-many navigation
  - Created skillItems and projectSkillItems junction tables for proper relationships
  - Skills in SkillsMatrix are clickable and filter projects by selected skill
  - Projects display skills from database with clickable badges for bidirectional navigation
  - Implemented consistent slug generation handling special cases (C++ → cpp, C# → csharp, Objective-C → objective-c)
  - Filter UI with Clear Filter button and selected skill indicator
- ✅ Added real company logos and app screenshots throughout portfolio
  - FiLMiC Pro and FiLMiC Remote app icons in projects
  - Souls agentic AI platform macOS app screenshot (featured project)
  - Official Truepic company logo (wordmark)
  - Official Belief Agency stacked logo (hand icon + text)
  - Company logos for AI Layer Labs, Wire Network, FiLMiC Inc, Paladin Innovators, General Assembly, Analytics Pros
  - Fixed static file serving to prevent content-type issues (images now served as image/png, image/webp, image/jpeg)
- ✅ Added complete work experience timeline (6 companies spanning 2013-2025)
- ✅ Fixed resume download - now serves actual PDF (167KB) instead of blank file
- Implemented secure session-based authentication with CSRF protection
- Added schema validation to all CRUD API routes
- Enhanced color vibrancy (85% saturation) for a more alive, professional feel
- Successfully tested end-to-end with admin and public flows
- Created comprehensive security documentation (SECURITY.md)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server with HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing (smaller alternative to React Router)
- TanStack Query (React Query) for server state management, data fetching, and caching

**UI Component Library**
- Radix UI primitives as the foundation for accessible, unstyled components
- shadcn/ui design system (New York style) providing pre-styled, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for component variant management

**Styling System**
- Dark mode as the primary theme with light mode support
- Custom color palette based on HSL values with CSS custom properties
- Design system inspired by Linear's typography and Apple's minimalism
- Consistent spacing units (4, 6, 8, 12, 16, 20, 24) for visual rhythm
- Custom hover/active elevation effects using CSS variables

**Form Management**
- React Hook Form for performant form state management
- Zod for schema validation on the frontend
- @hookform/resolvers for integrating Zod schemas with React Hook Form

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- Session-based authentication using express-session
- PostgreSQL session store via connect-pg-simple for persistent sessions

**API Design**
- RESTful API endpoints under `/api` prefix
- CRUD operations for all portfolio entities (profile, skills, experiences, patents, projects, companies)
- Admin-only mutations protected by `requireAdmin` middleware
- All routes return JSON responses

**Data Access Layer**
- Storage abstraction pattern (`server/storage.ts`) providing a clean interface for database operations
- Methods for each entity type (get, create, update, delete)
- Type-safe operations using TypeScript interfaces derived from Drizzle schema

### Authentication & Authorization

**Session Management**
- Server-side sessions with HttpOnly cookies to prevent XSS attacks
- SameSite='lax' cookie setting for CSRF protection
- Session regeneration on login to prevent session fixation attacks
- 24-hour session expiration with automatic cleanup

**Admin Access Control**
- Single admin user model with password-based authentication
- Environment variable configuration for admin password (ADMIN_PASSWORD)
- `requireAdmin` middleware protecting all mutating routes (POST, PATCH, DELETE)
- Session-based authorization check on admin panel access
- Client-side route protection with server-side session validation

**Security Features**
- Secure cookie flag automatically enabled in production
- SESSION_SECRET environment variable for session encryption
- Server-side password validation (no client-side password storage)
- Automatic logout on unauthorized access attempts

### Database Architecture

**ORM & Schema**
- Drizzle ORM for type-safe database queries and migrations
- Schema-first approach with TypeScript types automatically generated
- Zod schema integration via drizzle-zod for runtime validation

**Database Schema**
- `users` table for admin authentication (currently minimal, extensible for future multi-user support)
- `profile` table (singleton) for main portfolio information
- `skills` table with categories, icons, and sort ordering
- `experiences` table with company relationships and date ranges
- `patents` table with status tracking and external links
- `projects` table with technology tags and impact metrics
- `companies` table for featured company logos and information

**Data Validation**
- Insert schemas generated from Drizzle tables using createInsertSchema
- Partial schemas for PATCH operations supporting incremental updates
- Consistent validation between frontend and backend using shared Zod schemas

### Deployment Architecture

**Development Mode**
- Vite dev server with middleware mode integrated into Express
- HMR for rapid frontend development
- Replit-specific plugins for error overlay and development banners
- Static file serving for attached_assets mounted before Vite middleware (critical: prevents content-type issues)

**Production Build**
- Frontend: Vite builds static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Static file serving from Express in production
- ESM (ES Modules) throughout the codebase

**Environment Configuration**
- NODE_ENV for environment detection
- DATABASE_URL for PostgreSQL connection (required)
- SESSION_SECRET for session encryption (generated via openssl in production)
- ADMIN_PASSWORD for admin authentication (must be changed from default)

## External Dependencies

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database via @neondatabase/serverless
- WebSocket-based connection using ws package for compatibility
- Connection pooling via Neon's Pool implementation

### UI Component Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled components (@radix-ui/react-*)
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel/slider functionality for project showcase
- **cmdk**: Command palette component (extensible for future features)

### Styling & Theming
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with autoprefixer
- **clsx & tailwind-merge**: Conditional class name utilities

### Data Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management
- **Zod**: Schema validation and type inference
- **date-fns**: Date formatting and manipulation

### Development Tools
- **TypeScript**: Type safety across frontend and backend
- **Drizzle Kit**: Database migration management
- **tsx**: TypeScript execution for development server
- **esbuild**: Production build bundling for server code

### Session & Security
- **express-session**: Session middleware
- **connect-pg-simple**: PostgreSQL session store
- **ws**: WebSocket implementation for Neon database connections

### Fonts
- **Google Fonts**: Inter (for UI) and JetBrains Mono (for code/technical elements)
- Preconnected for performance optimization