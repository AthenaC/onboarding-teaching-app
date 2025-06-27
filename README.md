# Onboarding Teaching App

A simple onboarding application that demonstrates TypeScript, React Native, and cross-platform development concepts. This app serves as a learning tool to understand how different technologies work together.

## Features

- **User Registration & Login**: Basic authentication flow
- **Onboarding Flow**: Multi-step onboarding process
- **Profile Management**: User profile creation and editing
- **Cross-Platform**: Works on web and mobile
- **TypeScript**: Full type safety across the stack
- **Modern Stack**: React, React Native, Express, PostgreSQL

## Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd onboarding-teaching-app

# Install dependencies
npm run install:all

# Set up environment variables
npm run setup:env

# Set up database
npm run setup:db

# Start development servers
npm run dev
```

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, PostgreSQL, Knex.js
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Mobile**: React Native, Expo, TypeScript, NativeWind
- **Shared**: TypeScript, Axios

## Project Structure

```
├── backend/          # Express API server
├── frontend/         # React web application
├── mobile/           # React Native mobile app
├── shared/           # Shared types and utilities
└── docs/             # Documentation and tutorials
```

## Development

- `npm run dev` - Start all development servers
- `npm run dev:backend` - Start backend only
- `npm run dev:frontend` - Start frontend only
- `npm run dev:mobile` - Start mobile only

## Learning Objectives

This app demonstrates:

1. **TypeScript Integration**: How to use TypeScript across the stack
2. **Cross-Platform Development**: Sharing code between web and mobile
3. **Database Design**: User management and relationships
4. **API Design**: RESTful endpoints and error handling
5. **State Management**: Managing user state and authentication
6. **UI/UX Patterns**: Onboarding flows and form handling

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed explanations of each concept and how they work together.
