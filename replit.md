# Overview

This is a full-stack task management application built with React, Express, and PostgreSQL. The application features a modern dashboard-style interface for managing tasks with priority levels, due dates, and completion tracking. It uses a monorepo structure with a client-side React application, Express.js backend server, and shared TypeScript schemas.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client is built using React with TypeScript and follows a component-based architecture:
- **UI Framework**: React with TypeScript, using Wouter for client-side routing
- **Styling**: Tailwind CSS with Shadcn/ui component library for consistent design
- **State Management**: TanStack React Query for server state management and caching
- **Theme System**: Custom React Context for light/dark theme switching
- **Component Structure**: Organized into feature-specific components (Dashboard, TaskFlow, TaskList) with reusable UI components

## Backend Architecture
The server follows a RESTful API design pattern:
- **Framework**: Express.js with TypeScript for type safety
- **API Design**: RESTful endpoints for CRUD operations on tasks (`GET /api/tasks`, `POST /api/tasks`, etc.)
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development and database support
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Development Setup**: Vite integration for hot reloading in development mode

## Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Type Safety**: Shared TypeScript types generated from Drizzle schemas using Zod for validation
- **Development Storage**: In-memory storage implementation with sample data for rapid development

## Database Schema Design
The application uses a single `tasks` table with the following structure:
- UUID primary keys with automatic generation
- Task fields: title, description, priority (enum: high/medium/low), completion status
- Timestamps: creation date and optional due date
- Validation through Zod schemas for both insert operations and runtime type checking

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives for building the interface
- **Tailwind CSS**: Utility-first CSS framework for styling with custom design tokens
- **Lucide React**: Icon library for consistent iconography throughout the application

### Data Management
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL dialect
- **Neon Database**: Serverless PostgreSQL database provider for hosting
- **TanStack React Query**: Server state management, caching, and synchronization

### Development Tools
- **Vite**: Fast build tool and development server with React plugin
- **TypeScript**: Static type checking across the entire codebase
- **ESBuild**: Fast JavaScript bundler for production builds

### Form and Validation
- **React Hook Form**: Performant forms with easy validation
- **Zod**: TypeScript-first schema validation library for runtime type checking
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation

The architecture prioritizes type safety, developer experience, and scalability while maintaining a clear separation of concerns between the frontend, backend, and shared utilities.