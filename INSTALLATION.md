# Installation Guide

This guide walks you through installing all dependencies for the cross-platform template after forking or cloning the repository.

## How Everything Connects: Understanding Your Template

Before we start installing, let me explain how all the pieces of your template work together. This will help you understand what you're building.

### 🏗️ The Architecture Overview

**Your template creates a complete app with three parts:**

1. **Backend (The Brain)** - Handles data, business logic, and API
2. **Frontend (Web Interface)** - What users see in their browser
3. **Mobile (Phone App)** - What users see on their phones
4. **Shared (Common Code)** - Code that both web and mobile use

### 🔄 How They Communicate

**The Communication Flow:**
```
User Action (Web/Mobile) → Backend → Database
                        ↑              ↓
                        ← Response ← Data
```

**Real-World Example:**
- User adds a product on their phone
- Mobile app sends data to backend
- Backend saves it to database
- Backend sends back "success"
- Mobile app shows "Product added!"

### 🛠️ What Each Part Does

**Backend (Express + PostgreSQL):**
- **Receives requests** from web and mobile
- **Processes data** (saves, updates, deletes)
- **Stores information** in the database
- **Sends responses** back to web and mobile

**Frontend (React + Vite):**
- **Shows the web interface** users interact with
- **Sends requests** to the backend
- **Displays data** from the backend
- **Handles user interactions** (clicks, forms, etc.)

**Mobile (React Native + Expo):**
- **Shows the mobile interface** users interact with
- **Sends requests** to the backend (same as web)
- **Displays data** from the backend
- **Works on iOS and Android**

**Shared (TypeScript + Axios):**
- **Common code** used by both web and mobile
- **Type definitions** that work everywhere
- **API client** for talking to the backend
- **Utility functions** shared between platforms

### 🎯 Why This Structure?

**Benefits for You:**
- **Write once, run everywhere** - Same code works on web and mobile
- **Consistent experience** - Users get the same features on all platforms
- **Easier maintenance** - Update shared code, affects both platforms
- **Type safety** - TypeScript catches errors before they happen

**What You Can Build:**
- Social media apps
- E-commerce stores
- Task management tools
- Learning platforms
- Any app that needs web + mobile

Now let's install everything and get your template running!

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **PostgreSQL** (for the database)
- **Git** (for version control)

### Installing Prerequisites

#### Node.js
```bash
# macOS (using Homebrew)
brew install node

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Windows
# Download from https://nodejs.org/
```

#### PostgreSQL
```bash
# macOS (using Homebrew)
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/
```

## Installation Methods

You have three options to install dependencies:

### Option 1: Automated Setup (Recommended)

The easiest way is to use the provided setup script:

```bash
# Make the script executable (if needed)
chmod +x setup.sh

# Run the setup script
./setup.sh
```

This script will:
- Install all dependencies for each platform
- Copy environment files
- Set up the project structure

### Option 2: Manual Installation

If you prefer to install manually or the script doesn't work:

```bash
# 1. Install root dependencies
npm install

# 2. Install backend dependencies
cd backend
npm install
cd ..

# 3. Install frontend dependencies
cd frontend
npm install
cd ..

# 4. Install mobile dependencies
cd mobile
npm install
cd ..

# 5. Install shared dependencies
cd shared
npm install
cd ..

# 6. Copy environment files
cp backend/env.example backend/.env
cp frontend/env.example frontend/.env
cp mobile/env.example mobile/.env
```

### Option 3: Using npm Scripts

The root package.json includes convenient scripts:

```bash
# Install all dependencies at once
npm run install:all

# Copy environment files
npm run setup:env
```

## Database Setup

After installing dependencies, you need to set up the database:

### 1. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE cross_platform_template;

# Exit psql
\q
```

### 2. Configure Environment Variables

Edit the backend environment file:

```bash
# Open the backend .env file
nano backend/.env
```

Update the database configuration:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cross_platform_template
DB_USER=postgres
DB_PASSWORD=your_password_here
NODE_ENV=development
```

### 3. Run Database Migrations

```bash
cd backend
npm run migrate
npm run seed
cd ..
```

## Verification

To verify everything is working:

### 1. Start All Services

```bash
# Start backend, frontend, and mobile
npm run dev
```

### 2. Check Each Service

- **Backend**: http://localhost:3001/health
- **Frontend**: http://localhost:3000
- **Mobile**: Scan QR code with Expo Go app

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using the port
lsof -i :3001
lsof -i :3000

# Kill the process
kill -9 <PID>
```

#### Database Connection Issues
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL if needed
sudo systemctl start postgresql
```

#### Permission Issues
```bash
# Fix npm permissions
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
```

#### Node Version Issues
```bash
# Check Node version
node --version

# Use nvm to switch versions
nvm install 18
nvm use 18
```

### Platform-Specific Issues

#### macOS
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Fix Homebrew permissions
sudo chown -R $(whoami) /usr/local/bin /usr/local/lib /usr/local/sbin
```

#### Windows
```bash
# Run PowerShell as Administrator
# Install Windows Build Tools
npm install --global --production windows-build-tools
```

#### Linux
```bash
# Install build essentials
sudo apt-get install build-essential

# Fix Python issues
sudo apt-get install python3
```

## Next Steps

After successful installation:

1. **Read the documentation**:
   - `README.md` - Overview and quick start
   - `SETUP_GUIDE.md` - Detailed setup instructions
   - `docs/API.md` - API documentation
   - `docs/DEPLOYMENT.md` - Deployment guide

2. **Start developing**:
   - Add your features to the template
   - Customize the components
   - Build your cross-platform app

3. **Test your setup**:
   - Run `npm run dev` to start all services
   - Verify each platform works correctly
   - Test the API endpoints

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the `SETUP_GUIDE.md` for detailed explanations
3. Check the GitHub issues for known problems
4. Create a new issue with your specific error

Happy coding! 🚀 