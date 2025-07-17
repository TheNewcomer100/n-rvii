# Nrvii - Mental Health & Productivity Platform

## Overview

Nrvii is a mental health-focused productivity application designed as a full-stack TypeScript solution. The platform helps users manage goals, track energy levels, and maintain sustainable productivity while prioritizing mental wellbeing. It features an energy-first approach to task management, compassionate goal setting, and AI-powered task suggestions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React hooks with Tanstack Query for server state
- **Routing**: React Router for client-side navigation
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple

### Authentication Strategy
- **Primary**: Supabase Auth for user management
- **Fallback**: Custom email/password system with local storage
- **Social Login**: Google and Apple OAuth integration
- **Guest Mode**: Anonymous usage without account creation

## Key Components

### Data Models
- **Users**: Authentication and profile management
- **Goals**: SMART goal framework with energy-aware tracking
- **Tasks**: AI-generated and user-created tasks linked to goals
- **Mood Entries**: Daily emotional check-ins with energy levels
- **Reflections**: Personal journaling and progress notes
- **Settings**: User preferences and subscription tiers

### Core Features
1. **Energy-First Task Management**: Tasks are suggested based on current energy levels
2. **Compassionate Goal Setting**: SMART goals with mental health considerations
3. **AI Task Generation**: OpenAI-powered task suggestions via Supabase Edge Functions
4. **Mood Tracking**: Daily emotional check-ins with visual progress
5. **Onboarding Flow**: Multi-step user personalization and setup
6. **Subscription Tiers**: Free (2 goals) and Premium (unlimited) plans

### Component Structure
- **Dashboard**: Main interface with mood check-in, goals, and tasks
- **Onboarding**: Welcome, privacy consent, auth, personalization, and demo
- **Settings**: Profile management, privacy controls, and data export
- **Crisis Support**: Mental health resources and emergency contacts

## Data Flow

### User Journey
1. **Onboarding**: Privacy consent → Authentication → Personalization → Goal setting → Interactive demo
2. **Daily Flow**: Mood check-in → Energy-matched task suggestions → Goal progress tracking → Reflection
3. **Data Persistence**: Real-time sync with PostgreSQL via Drizzle ORM

### State Management
- **Client State**: React hooks for UI state and form management
- **Server State**: Tanstack Query for API calls and caching
- **Authentication**: Supabase Auth context with fallback to custom auth
- **Local Storage**: Onboarding progress and guest mode data

## External Dependencies

### Core Infrastructure
- **Database**: Neon PostgreSQL for serverless scaling
- **Authentication**: Supabase for user management and OAuth
- **AI Services**: OpenAI API via OpenRouter for task generation
- **File Storage**: Supabase Storage for user assets

### Development Tools
- **Build**: Vite with React plugin and TypeScript support
- **Styling**: Tailwind CSS with PostCSS processing
- **Database Migration**: Drizzle Kit for schema management
- **Runtime**: tsx for TypeScript execution in development

### UI/UX Libraries
- **Component System**: Radix UI primitives with shadcn/ui styling
- **Icons**: Lucide React for consistent iconography
- **Form Handling**: React Hook Form with Zod validation
- **Date Utilities**: date-fns for time calculations

## Deployment Strategy

### Development Environment
- **Server**: Express with Vite middleware for HMR
- **Database**: Local PostgreSQL or Neon development branch
- **Environment**: NODE_ENV=development with tsx runner

### Production Build
- **Frontend**: Vite build outputting to dist/public
- **Backend**: esbuild bundling server to dist/index.js
- **Assets**: Static file serving via Express
- **Database**: Neon PostgreSQL production instance

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **OPENAI_API_KEY**: AI task generation (via server routes)

### Scaling Considerations
- **Database**: Neon serverless auto-scaling for PostgreSQL
- **Authentication**: Custom authentication system with PostgreSQL sessions
- **Static Assets**: Ready for CDN deployment
- **API**: Stateless Express server suitable for horizontal scaling

The application prioritizes mental health and sustainability over traditional productivity metrics, implementing features like "sick day mode" and energy-based task filtering to support user wellbeing.

## Recent Changes

### January 17, 2025 - Major Migration from Lovable to Replit
- **Database Migration**: Successfully migrated from Supabase to Neon PostgreSQL using Drizzle ORM
- **Architecture Change**: Moved from client-side Supabase calls to secure server-side API routes
- **Security Enhancement**: Implemented proper client/server separation with authenticated API endpoints
- **AI Integration**: Ported Supabase Edge Functions to Express.js server routes for AI task generation
- **Routing Update**: Migrated from React Router to Wouter for simpler client-side routing
- **New Component**: Added PieChart component for task time tracking with real-time updates and sick day mode
- **Database Schema**: Comprehensive schema with users, goals, tasks, moods, reflections, settings, and task logs
- **API Routes**: Full REST API implementation with authentication, CRUD operations, and AI task generation