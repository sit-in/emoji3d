# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a 3D Emoji Generator web application built with Next.js 14 and TypeScript. The app allows users to upload photos and convert them into 3D island-style emoji stickers using AI (Replicate API).

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14.2.16 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives wrapped in custom components
- **Forms**: React Hook Form with Zod validation
- **State Management**: React hooks (no global state management)
- **Image Processing**: Replicate API for AI generation

### Project Structure
- `/app` - Next.js App Router pages and API routes
  - `/api/generate` - Handles 3D emoji generation via Replicate API
  - `/api/leads` - Lead collection endpoint
- `/components` - React components
  - `/ui` - Reusable UI components based on Radix UI
  - Main page sections: Hero, Steps, Gallery, Uploader, FAQ, Footer
- `/lib` - Utility functions
- `/hooks` - Custom React hooks

### Key Features
1. **Image Upload**: Drag-and-drop file uploader with React Dropzone
2. **AI Generation**: Integrates with Replicate API for 3D emoji generation
3. **Demo Mode**: Falls back to placeholder when no API key is configured
4. **Responsive Design**: Mobile-first with island/tropical theme

### Component Conventions
- All components use TypeScript with proper type definitions
- UI components follow the shadcn/ui pattern with Radix UI primitives
- Components use `"use client"` directive when needed for interactivity
- Styling uses Tailwind CSS utility classes with custom theme colors

### API Integration
The `/api/generate` endpoint handles:
- Image upload validation
- Base64 conversion for Replicate API
- Polling for generation completion
- Error handling with appropriate status codes
- Demo mode fallback when `REPLICATE_API_TOKEN` is not set

### Environment Variables
- `REPLICATE_API_TOKEN` - Required for production AI generation

### Important Notes
- TypeScript and ESLint errors are ignored in build (`next.config.mjs`)
- Images are unoptimized for faster builds
- The app uses Chinese (zh-CN) locale with island/tropical themed UI