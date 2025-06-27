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
PORT=5000
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
const PORT = process.env.PORT || 5000;

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
npm install axios react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Why these choices:**
- `vite`: Super fast development server
- `react-ts`: React with TypeScript template
- `axios`: HTTP client for API calls
- `react-router-dom`: Client-side routing
- `tailwindcss`: Utility-first CSS framework

### Step 9: Mobile Foundation

Set up React Native with Expo:

```bash
cd ../mobile
npx create-expo-app@latest . --template blank-typescript
npm install nativewind
npm install -D tailwindcss
npx tailwindcss init
```

**Why Expo?** It handles all the complex native build configuration. You can test on your phone instantly with the Expo Go app.

### Step 10: Shared Code

Create the shared package for common code:

```bash
cd ../shared
npm init -y
npm install axios
npm install -D typescript
```

This is where we'll put:
- API client configuration
- Common TypeScript interfaces
- Utility functions used by both platforms

## How Everything Connects

Now let me explain how all these pieces work together:

### 1. Data Flow
```
User Action → Frontend/Mobile → API Request → Backend → Database
                ↑                                    ↓
                ← Response ← Backend ← Database ←
```

### 2. Type Safety
We define interfaces in the shared package:

```typescript
// shared/src/types/user.ts
export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
```

Both frontend and mobile import these types, ensuring consistency.

### 3. API Communication
The shared package contains our API client:

```typescript
// shared/src/api/client.ts
import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 4. Authentication Flow
1. User enters email/password
2. Frontend sends to `/auth/register` or `/auth/login`
3. Backend validates and creates/verifies user
4. Backend returns JWT token
5. Frontend stores token and includes it in future requests
6. Backend middleware validates token on protected routes

## Development Workflow

Here's how you'll typically work:

1. **Start all services**: `npm run dev` (runs backend, frontend, and mobile)
2. **Database changes**: Create migration → run migration → update types
3. **API changes**: Update backend → update shared types → update frontend/mobile
4. **UI changes**: Update components → test on both platforms

## Common Patterns You'll Learn

### 1. Form Handling
```typescript
const [formData, setFormData] = useState({
  email: '',
  password: '',
});

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  try {
    const response = await apiClient.post('/auth/register', formData);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### 2. Protected Routes
```typescript
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;
  
  return <>{children}</>;
};
```

### 3. Cross-Platform Components
```typescript
// Works on both web and mobile
const Button = ({ onPress, children }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} className="bg-blue-500 p-4 rounded">
      <Text className="text-white text-center">{children}</Text>
    </Pressable>
  );
};
```

## Next Steps

This foundation gives you:
- ✅ Type-safe backend API
- ✅ Database with migrations
- ✅ Frontend with routing
- ✅ Mobile app with Expo
- ✅ Shared code structure
- ✅ Authentication foundation

In the next phase, we'll build:
1. User registration and login
2. Onboarding flow screens
3. Profile management
4. Cross-platform navigation
5. State management

## Troubleshooting Tips

**Database connection issues:**
- Make sure PostgreSQL is running
- Check your `.env` file has correct credentials
- Try `npx knex migrate:latest` to run migrations

**Mobile build issues:**
- Clear Expo cache: `expo start -c`
- Make sure you have Expo Go app installed
- Check that your phone and computer are on same network

**TypeScript errors:**
- Run `npm run build` to see all type errors
- Make sure shared types are exported correctly
- Check that API responses match your interfaces

This foundation sets you up for success! The key is understanding how each piece connects to the others. TypeScript helps catch errors early, shared code reduces duplication, and the modular structure makes it easy to add new features.

Ready to start building the actual onboarding flow? Let's dive in! 