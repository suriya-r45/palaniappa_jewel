# Overview

This is a full-stack e-commerce web application for Palaniappa Jewellers, a luxury jewelry store serving customers in India and Bahrain. The application showcases jewelry collections including gold, silver, and diamond pieces with dual currency pricing (INR/BHD). It features a modern, responsive design with product browsing, detailed views, WhatsApp integration for customer inquiries, and an admin panel for inventory management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for brand colors (gold theme)
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful API endpoints for product and user management
- **Data Storage**: In-memory storage implementation with interface for easy database migration

## Database Schema
- **Products Table**: Stores jewelry items with dual pricing (INR/BHD), categories, stock levels, and image URLs
- **Users Table**: Basic user management with username/password authentication
- **Schema Validation**: Drizzle-Zod integration for runtime type checking

## Key Features
- **Dual Currency Support**: Seamless switching between Indian Rupees and Bahraini Dinar
- **Category-based Navigation**: Organized product browsing by gold, silver, diamonds, and new arrivals
- **WhatsApp Integration**: Direct customer inquiry system with pre-formatted messages
- **Responsive Design**: Mobile-first approach with comprehensive breakpoint coverage
- **Admin Panel**: Product upload and inventory management interface
- **Image Carousel**: Interactive product image galleries

## Design Patterns
- **Component Composition**: Reusable UI components with consistent design system
- **Custom Hooks**: Currency context and mobile detection for responsive behavior
- **Type Safety**: End-to-end TypeScript with shared schema definitions
- **Error Boundaries**: Comprehensive error handling with user-friendly fallbacks

# External Dependencies

## Core Frontend Libraries
- **React Ecosystem**: React 18 with TypeScript support
- **UI Framework**: Radix UI primitives with Shadcn/ui component system
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Font Awesome and Lucide React icons

## Backend Infrastructure
- **Database**: PostgreSQL configured with Neon Database serverless adapter
- **Session Management**: PostgreSQL session store with connect-pg-simple
- **Development Tools**: TSX for TypeScript execution and hot reloading

## Build and Development
- **Build System**: Vite with React plugin for fast development and optimized builds
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Asset Management**: Vite asset pipeline with alias resolution

## Business Integrations
- **Communication**: WhatsApp Business API integration for customer support
- **Fonts**: Google Fonts (Inter, Playfair Display) for typography
- **Images**: Unsplash integration for placeholder product images

## Development Environment
- **Replit Integration**: Specialized plugins for Replit development environment
- **Hot Reloading**: Development server with instant refresh capabilities
- **Error Handling**: Runtime error overlay for debugging

The application is designed for easy deployment and scaling, with a clear separation between frontend and backend concerns, and a flexible data layer that can transition from in-memory storage to a full PostgreSQL database.