# Building an Onboarding App: A Complete Guide

Welcome to the journey of building a cross-platform onboarding application! This guide is written like a blog post, walking you through each concept, why we use it, and how everything connects together.

## What We're Building

We're creating an onboarding app that demonstrates modern web and mobile development. Think of it like the first-time user experience you see in apps like Instagram, TikTok, or any app that guides new users through setup.

## The Big Picture

Our app will have:
- **User Registration**: Sign up with email/password
- **Onboarding Flow**: Multi-step process to collect user preferences
- **Profile Creation**: Set up user profile with basic info
- **Cross-Platform**: Same codebase works on web and mobile

## Why This Stack?

Let me explain why we chose each technology:

### Backend: Node.js + Express + TypeScript
**Why Node.js?** It's JavaScript everywhere! Same language on frontend and backend means easier development and code sharing.

**Why Express?** It's the most popular Node.js framework. Simple, flexible, and has a huge ecosystem.

**Why TypeScript?** Type safety prevents bugs and makes code more maintainable. When you're building for multiple platforms, you need confidence that your data structures are consistent.

### Database: PostgreSQL + Knex.js
**Why PostgreSQL?** It's a powerful, reliable database that handles complex relationships well. Perfect for user data and future scaling.

**Why Knex.js?** It's a SQL query builder that makes database operations safer and more readable. Plus, it handles migrations automatically.

### Frontend: React + TypeScript + Vite
**Why React?** It's the most popular frontend framework with excellent mobile support through React Native.

**Why Vite?** Lightning-fast development server and build tool. Hot reload makes development super smooth.

### Mobile: React Native + Expo
**Why React Native?** Write once, run anywhere. Same React concepts you know from web development.

**Why Expo?** It handles all the complex native build configuration. You can focus on your app logic instead of native setup.

## Setting Up the Foundation

Let's start building! I'll walk you through each step and explain what's happening.

### Step 1: Project Structure

First, let's create our directory structure:

```bash
mkdir onboarding-teaching-app
cd onboarding-teaching-app
mkdir backend frontend mobile shared docs
```

**Why this structure?** We separate concerns so each platform can have its own dependencies and configuration. The `shared` folder contains code that both web and mobile can use.

### Step 2: Backend Foundation

Let's start with the backend because it's the foundation everything else builds on.

```bash
cd backend
npm init -y
```

Now let's install our dependencies:

```bash
npm install express cors dotenv helmet morgan bcryptjs jsonwebtoken
npm install -D typescript @types/node @types/express @types/cors @types/morgan @types/bcryptjs @types/jsonwebtoken nodemon ts-node
npm install knex pg
npm install -D @types/pg
```

**Let me explain each dependency:**

- `express`: Our web framework
- `cors`: Allows our frontend to talk to our backend (cross-origin requests)
- `dotenv`: Loads environment variables from a .env file
- `helmet`: Adds security headers to prevent common attacks
- `morgan`: Logs HTTP requests so we can debug what's happening
- `bcryptjs`: Securely hashes passwords (never store plain text passwords!)
- `jsonwebtoken`: Creates and verifies authentication tokens
- `knex`: SQL query builder and migration tool
- `pg`: PostgreSQL client

### Step 3: TypeScript Configuration

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
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

**What this does:** Tells TypeScript how to compile our code and what rules to follow. The `strict: true` flag catches more potential bugs.

### Step 4: Database Setup

Create `backend/knexfile.js`:

```javascript
require('dotenv').config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'onboarding_app',
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
};
```

**Why this matters:** This tells Knex how to connect to our database and where to find our migration files. Migrations are like version control for your database schema.

### Step 5: Environment Variables

Create `backend/.env.example`:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=onboarding_app
DB_USER=postgres
DB_PASSWORD=
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

**Security note:** Never commit your actual `.env` file! The `.env.example` shows what variables are needed without exposing sensitive data.

### Step 6: Basic Server Setup

Create `backend/src/server.ts`:

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Allow cross-origin requests
app.use(morgan('dev')); // Log requests
app.use(express.json()); // Parse JSON bodies

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Onboarding API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Let's break this down:**

1. **Middleware**: Functions that run before your route handlers
   - `helmet()`: Adds security headers
   - `cors()`: Allows frontend to make requests
   - `morgan()`: Logs requests for debugging
   - `express.json()`: Parses JSON request bodies

2. **Route handler**: Responds to GET requests at the root path

3. **Server startup**: Listens on the specified port

### Step 7: Database Schema

Let's create our first migration. This defines our database structure:

```bash
npx knex migrate:make create_users_table
```

This creates a file like `backend/src/db/migrations/20240101000001_create_users_table.js`:

```javascript
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').unique().notNullable();
    table.string('password_hash').notNullable();
    table.string('first_name');
    table.string('last_name');
    table.boolean('onboarding_completed').defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
```

**What this does:**
- `up`: Creates the table when we run the migration
- `down`: Drops the table if we need to rollback
- `increments('id')`: Auto-incrementing primary key
- `unique().notNullable()`: Email must be unique and required
- `password_hash`: Stores encrypted password
- `onboarding_completed`: Tracks if user finished onboarding
- `timestamps`: Adds `created_at` and `updated_at` columns

### Step 8: Frontend Foundation

Now let's set up the web frontend:

```bash
cd ../frontend
npm create vite@latest . -- --template react-ts
npm install
```

**Why these choices:**
- `vite`: Super fast development server

### Step 9: Mobile Foundation

Set up React Native with Expo:

```bash
cd ../mobile
npx create-expo-app@latest . --template blank-typescript
npm install nativewind
```

**Why Expo?** It handles all the complex native build configuration. You can test on your phone instantly with the Expo Go app.

### Step 10: Shared Code

Create the shared package for common code:

```bash
cd ../shared
npm init -y
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

## Step 11: Database Setup

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

## Step 12: Environment Variables

### Backend (.env)
```bash
cd backend
cp env.example .env
```

Create `backend/env.example`:
```env
PORT=3001
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
VITE_API_URL=http://localhost:3001
```

### Mobile (.env)
```bash
cd ../mobile
cp env.example .env
```

Create `mobile/env.example`:
```env
EXPO_PUBLIC_API_URL=http://localhost:3001
```

## Step 13: Root Package.json Scripts

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

## Step 14: Setup Script

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

## Step 15: Complete File Structure

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

## Step 16: Development Workflow

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
