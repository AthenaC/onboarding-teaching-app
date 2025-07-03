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

# Install mobile dependencies
echo "📱 Installing mobile dependencies..."
cd mobile
npm install
cd ..

# Copy environment files
echo "⚙️ Setting up environment files..."
cp backend/env.example backend/.env
cp mobile/env.example mobile/.env

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure your database in backend/.env"
echo "2. Run 'npm run dev' to start all services"
echo "3. Check SETUP_GUIDE.md for detailed instructions"
echo ""
echo "Happy coding! 🎉" 