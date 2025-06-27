# Cross-Platform Template

A minimal, clean template for building cross-platform applications with PERN stack (PostgreSQL, Express, React, React Native).

## Features

- **Backend**: Express.js with TypeScript, PostgreSQL, Knex.js
- **Frontend**: React with TypeScript, Vite
- **Mobile**: React Native with Expo, TypeScript
- **Shared**: Common types, utilities, and API client
- **Database**: PostgreSQL with migrations and seeds
- **Development**: Hot reload, TypeScript, ESLint

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Git

## Installation

After forking or cloning this repository, you have several options to install dependencies:

### Option 1: Automated Setup (Recommended)
```bash
# Make the script executable
chmod +x setup.sh

# Run the automated setup
./setup.sh
```

### Option 2: Manual Installation
```bash
# Install all dependencies
npm run install:all

# Set up environment variables
npm run setup:env
```

### Option 3: Step by Step
```bash
# Root dependencies
npm install

# Backend dependencies
cd backend && npm install && cd ..

# Frontend dependencies
cd frontend && npm install && cd ..

# Mobile dependencies
cd mobile && npm install && cd ..

# Shared dependencies
cd shared && npm install && cd ..

# Copy environment files
cp backend/env.example backend/.env
cp frontend/env.example frontend/.env
cp mobile/env.example mobile/.env
```

For detailed installation instructions, see [INSTALLATION.md](./INSTALLATION.md).

## Quick Start

```bash
# Set up database (after installation)
cd backend
npm run migrate
npm run seed
cd ..

# Start all development servers
npm run dev
```

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, PostgreSQL, Knex.js
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Mobile**: React Native, Expo, TypeScript, NativeWind
- **Shared**: TypeScript, Axios

## Scripts

- `npm run dev` - Start all development servers
- `npm run build` - Build all applications
- `npm run test` - Run tests
- `npm run lint` - Lint all code
- `npm run install:all` - Install all dependencies
- `npm run setup:env` - Copy environment files

## Project Structure

```
├── backend/                    # Express API server
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Custom middleware
│   │   ├── models/            # Data models
│   │   ├── routes/            # API routes
│   │   ├── db/
│   │   │   ├── migrations/    # Database migrations
│   │   │   └── seeds/         # Database seeds
│   │   ├── utils/             # Utility functions
│   │   └── server.ts          # Main server file
│   ├── package.json
│   ├── tsconfig.json
│   └── knexfile.js
├── frontend/                   # React web application
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom hooks
│   │   ├── utils/            # Utility functions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── mobile/                     # React Native mobile app
│   ├── app/                   # Expo Router pages
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── components/            # Mobile components
│   ├── store/                 # State management
│   ├── package.json
│   └── app.json
├── shared/                     # Shared code
│   ├── src/
│   │   ├── api/              # API client
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Shared utilities
│   └── package.json
├── docs/                       # Documentation
│   ├── API.md
│   └── DEPLOYMENT.md
├── setup.sh                    # Automated setup script
├── package.json               # Root package.json
└── README.md 