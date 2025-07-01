# 🛍️ Product Store Mobile App

A React Native mobile application demonstrating core React Native and TypeScript concepts. This project serves as a proof-of-concept for a simple e-commerce application, showcasing essential features of the React Native ecosystem.

## 🎯 Project Overview

This application demonstrates my understanding of React Native and TypeScript by implementing a simple product store with the following key features:

- **Product Browsing**: Display products from a REST API
- **Shopping Cart**: Add/remove items with quantity management
- **State Management**: React Context for cart state
- **Type Safety**: Full TypeScript implementation
- **API Integration**: Clean service layer architecture
- **Component Architecture**: Reusable UI components

## 🏗️ Project Structure

```
mobile/
├── app/                          # Expo Router (File-based routing)
│   ├── (tabs)/                   # Tab navigation
│   │   ├── _layout.tsx          # Tab navigation configuration
│   │   ├── index.tsx            # Products screen (main tab)
│   │   ├── cart.tsx             # Shopping cart screen
│   │   └── orders.tsx           # Order history screen
│   ├── _layout.tsx              # Root layout with providers
│   └── +not-found.tsx           # 404 error page
├── components/                   # Reusable components
│   ├── screens/                 # Screen components
│   │   ├── ProductListScreen.tsx
│   │   ├── ProductDetailScreen.tsx
│   │   └── CartScreen.tsx
│   └── ui/                      # UI components
│       ├── Button.tsx           # Reusable button component
│       └── ProductCard.tsx      # Product display card
├── constants/                   # App constants
│   ├── api.ts                  # API endpoint definitions
│   └── colors.ts               # Color theme
├── context/                    # React Context
│   └── CartContext.tsx         # Cart state management
├── hooks/                      # Custom hooks
│   └── useProducts.ts          # Product data management
├── services/                   # API services
│   └── api.ts                  # API functions
├── types/                      # TypeScript types
│   └── index.ts                # Type definitions
└── utils/                      # Utility functions
    ├── formatters.ts           # Data formatting
    └── handleFetch.ts          # Centralized fetch handler
```

## 🚀 Key Features Demonstrated

### 1. **React Native Core Concepts**
- **Component Architecture**: Reusable, composable components
- **State Management**: React Context for global state
- **Navigation**: Expo Router with tab navigation
- **Styling**: StyleSheet with consistent theming
- **Lists**: FlatList for efficient product rendering

### 2. **TypeScript Integration**
- **Type Safety**: Full type definitions for all data structures
- **Interface Design**: Clean API contracts
- **Generic Types**: Reusable fetch handler with generics
- **Type Guards**: Proper error handling with type checking

### 3. **Modern React Patterns**
- **Custom Hooks**: `useProducts` for data fetching
- **Context API**: Cart state management
- **Functional Components**: Modern React with hooks
- **Props Interface**: Type-safe component props

### 4. **API Integration**
- **Service Layer**: Clean separation of concerns
- **Error Handling**: Comprehensive error management
- **Loading States**: User feedback during data fetching
- **RESTful Design**: Standard HTTP methods

## 🛠️ Technologies Used

- **React Native**: Mobile app framework
- **TypeScript**: Type-safe JavaScript
- **Expo**: Development platform and tools
- **Expo Router**: File-based navigation
- **React Context**: State management
- **Fetch API**: HTTP requests

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)
- Expo Go app (for device testing)

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd onboarding-teaching-app/mobile
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm start
```

### 4. Run on Device/Simulator
- **iOS**: Press `i` in the terminal or scan QR code with Camera app
- **Android**: Press `a` in the terminal or scan QR code with Expo Go
- **Web**: Press `w` in the terminal

## 🔌 API Endpoints

This app connects to a backend API with the following endpoints:

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

## 🎨 Frontend Features

### Product Browsing
- Grid layout of product cards
- Product images, names, descriptions, and prices
- Loading states and error handling
- Pull-to-refresh functionality

### Shopping Cart
- Add/remove items from cart
- Quantity management with +/- buttons
- Real-time total calculation
- Empty cart state
- Checkout button (placeholder)

### Navigation
- Tab-based navigation between screens
- Product list, cart, and orders tabs
- Clean, intuitive user interface

### State Management
- Global cart state using React Context
- Persistent cart data across navigation
- Optimistic updates for better UX

## 🏛️ Architecture Highlights

### 1. **Separation of Concerns**
- **Components**: UI logic only
- **Hooks**: Data fetching and state management
- **Services**: API communication
- **Utils**: Reusable functions
- **Types**: Type definitions

### 2. **Type Safety**
```typescript
// Example: Type-safe API response
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Example: Type-safe component props
interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}
```

### 3. **Custom Hook Pattern**
```typescript
// Example: useProducts hook
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // ... implementation
  
  return { products, loading, error, refetch };
};
```

### 4. **Context Pattern**
```typescript
// Example: Cart context
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);
```

## 🔧 Development Decisions

### Why React Native?
- **Cross-platform**: Single codebase for iOS and Android
- **Performance**: Native performance with JavaScript
- **Ecosystem**: Rich library ecosystem
- **Learning**: Foundation for mobile development

### Why TypeScript?
- **Type Safety**: Catch errors at compile time
- **Developer Experience**: Better IDE support
- **Maintainability**: Self-documenting code
- **Scalability**: Easier to maintain as project grows

### Why Expo?
- **Development Speed**: Fast iteration cycle
- **Tooling**: Built-in development tools
- **Ecosystem**: Access to native features
- **Deployment**: Easy app store deployment

## 🚀 Future Enhancements

This project serves as a foundation for more advanced features:

1. **Authentication**: User login/signup
2. **Payment Integration**: Stripe or PayPal
3. **Push Notifications**: Order updates
4. **Offline Support**: Data caching
5. **Image Upload**: Product image management
6. **Search & Filter**: Advanced product discovery
7. **Reviews & Ratings**: User feedback system
8. **Order Tracking**: Real-time order status

## 📚 Learning Outcomes

Through this project, I've demonstrated understanding of:

- **React Native Fundamentals**: Components, state, props, navigation
- **TypeScript**: Types, interfaces, generics, type safety
- **State Management**: Context API, custom hooks
- **API Integration**: RESTful services, error handling
- **Mobile Development**: Platform-specific considerations
- **Code Organization**: Clean architecture, separation of concerns
- **Development Workflow**: Expo development cycle

## 🤝 Contributing

This is a learning project, but contributions and feedback are welcome! Feel free to:

- Report bugs or issues
- Suggest improvements
- Ask questions about the implementation
- Share your own React Native projects

## 📄 License

This project is created for educational purposes as part of the Onboarding program.

---

**Created with ❤️ using React Native and TypeScript**
