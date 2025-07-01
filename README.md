# Product Store Demo App

A full-stack product store application built with React Native (TypeScript) frontend and Node.js/PostgreSQL backend.

## Project Structure

```
onboarding-teaching-app/
├── mobile/                 # React Native TypeScript frontend
│   ├── app/               # Expo Router screens
│   │   └── (tabs)/        # Tab navigation screens
│   ├── components/        # Reusable UI components
│   │   ├── screens/       # Screen components
│   │   └── ui/           # UI components (Button, ProductCard)
│   ├── context/          # React Context (CartContext)
│   ├── hooks/            # Custom hooks (useProducts, useOrders)
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions and mock data
│   └── constants/        # App constants (colors, etc.)
├── backend/              # Node.js Express backend
│   ├── src/
│   │   ├── controllers/  # API route handlers
│   │   ├── models/       # Data models
│   │   ├── routes/       # API routes
│   │   ├── db/          # Database setup and migrations
│   │   └── middleware/   # Express middleware
│   └── knexfile.js      # Database configuration
└── setup.sh             # Project setup script
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- PostgreSQL (for backend)

## Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Create a `.env` file in the backend directory and add the following variables:
   ```
   PORT=3001
   DATABASE_URL=postgresql://username:password@localhost:5432/product_store
   NODE_ENV=development
   ```

4. **Configure PostgreSQL database:**
   - Make sure your PostgreSQL server is running
   - Create a database named 'product_store'
   - Update the DATABASE_URL in your .env file

5. **Run migrations:**
   ```bash
   npm run migrate
   ```

6. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

7. **Start the development server:**
   ```bash
   npm run dev
   ```

The backend API will be available at http://localhost:3001

## Frontend Setup

1. **Navigate to the mobile directory:**
   ```bash
   cd mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

The mobile app will be available through Expo Go or simulators.

## API Endpoints

- `GET /api/products` - List all products
- `GET /api/products/:id` - Retrieve a specific product
- `GET /api/users` - List all users
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id` - Update an order
- `DELETE /api/orders/:id` - Delete an order

## Features

- Browse product catalog with images and descriptions
- Add/remove items from shopping cart
- Manage item quantities in cart
- View order history with status tracking
- Responsive design with modern UI components
- TypeScript for type safety
- RESTful API architecture
- Mock data mode for offline demonstration

## Technologies Used

### Frontend
- React Native
- TypeScript
- Expo
- Expo Router
- React Context API
- Expo Vector Icons

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Knex.js ORM

## Development

- Expo development server: `npm start`
- Backend development server: `npm run dev`
- Database migrations: `npm run migrate`
- Seed database: `npm run seed`

## License

MIT License - see LICENSE file for details.

