# Cross-Platform Template Setup Guide

This guide will walk you through creating a cross-platform template from scratch, explaining why each dependency is chosen and how everything connects together.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Git
- Expo CLI (`npm install -g @expo/cli`)

## How Everything Connects: The Big Picture

Before we start building, let me explain how all these technologies work together. Think of it like building a house with different rooms that need to communicate with each other.

### 🏠 The House Analogy

**Your app is like a house with three main areas:**

1. **Backend (Kitchen)** - Where data is processed and stored
2. **Frontend (Living Room)** - Where users interact on the web
3. **Mobile (Bedroom)** - Where users interact on their phones
4. **Shared (Hallway)** - Common tools used by both living room and bedroom

### 🔄 How They Talk to Each Other

**The Flow:**
```
User clicks button → Frontend/Mobile → Backend → Database
                ↑                                    ↓
                ← Response ← Backend ← Database ←
```

**Real Example:**
1. User clicks "Add Product" on their phone
2. Mobile app sends request to backend: "Hey, save this product"
3. Backend saves it to the database
4. Backend sends back: "Product saved successfully!"
5. Mobile app shows: "Product added!"

### 🛠️ What Each Technology Does

**Backend Technologies:**
- **Node.js** = The engine that runs your server
- **Express** = The framework that handles web requests
- **PostgreSQL** = The filing cabinet where data is stored
- **Knex.js** = The assistant that helps organize the filing cabinet

**Frontend Technologies:**
- **React** = The building blocks for your web interface
- **Vite** = The fast delivery system that gets your app to users
- **Tailwind CSS** = The design system that makes everything look good

**Mobile Technologies:**
- **React Native** = The same building blocks, but for mobile apps
- **Expo** = The toolkit that makes mobile development easier
- **NativeWind** = The same design system, but for mobile

**Shared Technologies:**
- **TypeScript** = The language that ensures everything works together
- **Axios** = The messenger that carries data between frontend/mobile and backend

### 🎯 Why This Structure?

**The Problem We're Solving:**
- You want to build an app that works on web AND mobile
- You want to share code between platforms (don't write everything twice)
- You want a database to store user data
- You want everything to work together seamlessly

**The Solution:**
- **Same backend** serves both web and mobile
- **Shared code** means you write once, use everywhere
- **TypeScript** catches errors before they happen
- **Modern tools** make development fast and enjoyable

### 🚀 What You'll Be Able to Build

After following this guide, you'll have:
- A web app that users can visit in their browser
- A mobile app that users can download from app stores
- A backend API that both apps can use
- A database that stores all your data
- Shared code that works on both platforms

**Examples of what you could build:**
- Social media app (like Instagram)
- E-commerce store (like Amazon)
- Task management app (like Todoist)
- Learning platform (like Duolingo)

Now let's start building! I'll explain each step and why we're doing it.

## Step 1: Initialize the Project

```bash
mkdir cross-platform-template
cd cross-platform-template
npm init -y
```

**Why**: We start with a root `package.json` to manage workspace scripts and dependencies.

## Step 2: Create Directory Structure

```bash
mkdir backend frontend mobile shared docs
```

**Why**: This structure separates concerns and allows each platform to have its own dependencies and configuration. The `docs` folder will contain additional documentation.

## Step 3: Backend Setup

### Initialize Backend
```bash
cd backend
npm init -y
```

### Install Dependencies
```bash
npm install express cors dotenv helmet morgan
npm install -D typescript @types/node @types/express @types/cors @types/morgan nodemon ts-node
npm install knex pg
npm install -D @types/pg
```

**Why each dependency**:
- `express`: Web framework for Node.js
- `cors`: Cross-origin resource sharing middleware
- `dotenv`: Environment variable management
- `helmet`: Security headers middleware
- `morgan`: HTTP request logger
- `typescript`: Type safety and modern JavaScript features
- `knex`: SQL query builder and migration tool
- `pg`: PostgreSQL client

### TypeScript Configuration
```bash
npx tsc --init
```

Create `backend/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "migrate": "knex migrate:latest",
    "migrate:make": "knex migrate:make",
    "seed": "knex seed:run",
    "seed:make": "knex seed:make"
  }
}
```

### Create Backend Structure
```bash
mkdir -p src/{controllers,middleware,models,routes,db/{migrations,seeds},utils}
```

Create `backend/src/server.ts`:
```typescript
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Allow cross-origin requests
app.use(morgan('dev')); // Log requests
app.use(express.json()); // Parse JSON bodies

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Cross-Platform Template API is running!' });
});

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
```

## Step 4: Frontend Setup

### Initialize Frontend
```bash
cd ../frontend
npm create vite@latest . -- --template react-ts
```

### Install Additional Dependencies
```bash
npm install axios react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Why each dependency**:
- `vite`: Fast build tool and dev server
- `react-ts`: React with TypeScript template
- `axios`: HTTP client for API calls
- `react-router-dom`: Client-side routing
- `tailwindcss`: Utility-first CSS framework

### Tailwind Configuration
Create `frontend/tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Vite Configuration
Create `frontend/vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

### Create Frontend Structure
```bash
mkdir -p src/{components,pages,hooks,utils}
```

## Step 5: Mobile Setup

### Initialize Mobile
```bash
cd ../mobile
npx create-expo-app@latest . --template blank-typescript
```

### Install Dependencies
```bash
npm install nativewind expo-router
npm install -D tailwindcss
npx tailwindcss init
```

**Why each dependency**:
- `expo`: React Native development platform
- `nativewind`: Tailwind CSS for React Native
- `expo-router`: File-based routing for Expo
- `typescript`: Type safety

### Tailwind Configuration
Create `mobile/tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Babel Configuration
Create `mobile/babel.config.js`:
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};
```

### Create Mobile Structure
```bash
mkdir -p app components store
```

## Step 6: Shared Setup

### Initialize Shared
```bash
cd ../shared
npm init -y
```

### Install Dependencies
```bash
npm install axios
npm install -D typescript
```

**Why**: Shared code needs to be accessible by both frontend and mobile, with common types and API utilities.

### TypeScript Configuration
Create `shared/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Create Shared Structure
```bash
mkdir -p src/{api,types,utils}
```

## Step 7: Database Setup

### PostgreSQL Setup
```bash
# Create database
createdb cross_platform_template

# Create user (optional)
createuser -P cross_platform_user
```

### Knex Configuration
Create `backend/knexfile.js`:
```javascript
require('dotenv').config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'cross_platform_template',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
    },
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
  test: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME_TEST || 'cross_platform_template_test',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
    },
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
};
```

## Step 8: Environment Variables

### Backend (.env)
```bash
cd backend
cp env.example .env
```

Create `backend/env.example`:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cross_platform_template
DB_USER=postgres
DB_PASSWORD=
NODE_ENV=development
```

### Frontend (.env)
```bash
cd ../frontend
cp env.example .env
```

Create `frontend/env.example`:
```env
VITE_API_URL=http://localhost:5000
```

### Mobile (.env)
```bash
cd ../mobile
cp env.example .env
```

Create `mobile/env.example`:
```env
EXPO_PUBLIC_API_URL=http://localhost:5000
```

## Step 9: Root Package.json Scripts

Update the root `package.json`:
```json
{
  "name": "cross-platform-template",
  "version": "1.0.0",
  "description": "A minimal template for cross-platform PERN stack applications",
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\" \"npm run dev:mobile\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:mobile": "cd mobile && npm start",
    "build": "npm run build:backend && npm run build:frontend && npm run build:mobile",
    "build:backend": "cd backend && npm run build",
    "build:frontend": "cd frontend && npm run build",
    "build:mobile": "cd mobile && npm run build",
    "install:all": "npm install && cd backend && npm install && cd ../frontend && npm install && cd ../mobile && npm install && cd ../shared && npm install",
    "setup": "npm run install:all && npm run setup:env && npm run setup:db",
    "setup:env": "cp backend/env.example backend/.env && cp frontend/env.example frontend/.env && cp mobile/env.example mobile/.env",
    "setup:db": "cd backend && npm run migrate && npm run seed"
  },
  "devDependencies": {
    "concurrently": "^8.0.0"
  }
}
```

## Step 10: Setup Script

Create `setup.sh` for automated installation:
```bash
#!/bin/bash

echo "🚀 Setting up Cross-Platform Template..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "🔧 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "🌐 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install mobile dependencies
echo "📱 Installing mobile dependencies..."
cd mobile
npm install
cd ..

# Install shared dependencies
echo "📚 Installing shared dependencies..."
cd shared
npm install
cd ..

# Copy environment files
echo "⚙️ Setting up environment files..."
cp backend/env.example backend/.env
cp frontend/env.example frontend/.env
cp mobile/env.example mobile/.env

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure your database in backend/.env"
echo "2. Run 'npm run dev' to start all services"
echo "3. Check SETUP_GUIDE.md for detailed instructions"
echo ""
echo "Happy coding! 🎉"
```

Make it executable:
```bash
chmod +x setup.sh
```

## Step 11: Complete File Structure

### Backend Structure
```
backend/
├── src/
│   ├── controllers/
│   │   └── index.ts
│   ├── middleware/
│   │   └── index.ts
│   ├── models/
│   │   └── index.ts
│   ├── routes/
│   │   └── index.ts
│   ├── db/
│   │   ├── migrations/
│   │   │   └── 20240101000001_create_example_table.js
│   │   ├── seeds/
│   │   │   └── 01_example_seed.js
│   │   └── database.ts
│   ├── utils/
│   │   └── index.ts
│   └── server.ts
├── package.json
├── tsconfig.json
├── knexfile.js
└── env.example
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   └── index.ts
│   ├── pages/
│   │   └── HomePage.tsx
│   ├── hooks/
│   │   └── index.ts
│   ├── utils/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── App.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── index.html
└── env.example
```

### Mobile Structure
```
mobile/
├── app/
│   ├── _layout.tsx
│   └── index.tsx
├── components/
│   └── index.ts
├── store/
│   └── index.ts
├── package.json
├── app.json
├── babel.config.js
├── tailwind.config.js
├── tsconfig.json
├── index.ts
└── env.example
```

### Shared Structure
```
shared/
├── src/
│   ├── api/
│   │   └── client.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── index.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

### Root Structure
```
cross-platform-template/
├── backend/
├── frontend/
├── mobile/
├── shared/
├── docs/
│   ├── API.md
│   └── DEPLOYMENT.md
├── setup.sh
├── package.json
├── .gitignore
├── README.md
├── SETUP_GUIDE.md
└── INSTALLATION.md
```

## Step 12: Development Workflow

1. **Start all services**: `npm run dev`
2. **Backend only**: `npm run dev:backend`
3. **Frontend only**: `npm run dev:frontend`
4. **Mobile only**: `npm run dev:mobile`

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in `.env` files
2. **Database connection**: Ensure PostgreSQL is running
3. **Mobile build issues**: Clear Expo cache with `expo start -c`
4. **TypeScript errors**: Run `npm run build` to check for type issues

### Best Practices

1. **Environment variables**: Never commit `.env` files
2. **Database migrations**: Always use migrations for schema changes
3. **Type safety**: Use TypeScript interfaces for API responses
4. **Code organization**: Keep shared code in the shared directory
5. **Testing**: Add tests for critical functionality

## Next Steps

This template provides a solid foundation for cross-platform development. You can now:

1. Add authentication
2. Implement CRUD operations
3. Add state management (Redux, Zustand)
4. Set up testing frameworks
5. Add CI/CD pipelines

The template is designed to be minimal but extensible, allowing you to build any type of cross-platform application. 