# Deployment Guide

This guide covers deploying the cross-platform template to various platforms.

## Backend Deployment

### Heroku

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku app**
   ```bash
   cd backend
   heroku create your-app-name
   ```

4. **Add PostgreSQL addon**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

5. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-super-secret-jwt-key
   ```

6. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

7. **Run migrations**
   ```bash
   heroku run npm run migrate
   ```

### Railway

1. **Connect your GitHub repository to Railway**
2. **Add environment variables in Railway dashboard**
3. **Deploy automatically on push**

### DigitalOcean App Platform

1. **Connect your GitHub repository**
2. **Configure build settings**
3. **Set environment variables**
4. **Deploy**

## Frontend Deployment

### Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Set environment variables in Vercel dashboard**
   - `VITE_API_URL`: Your backend URL

### Netlify

1. **Connect your GitHub repository**
2. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Set environment variables**
4. **Deploy**

## Mobile Deployment

### Expo Application Services (EAS)

1. **Install EAS CLI**
   ```bash
   npm install -g @expo/eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure EAS**
   ```bash
   cd mobile
   eas build:configure
   ```

4. **Build for production**
   ```bash
   # Android
   eas build --platform android
   
   # iOS
   eas build --platform ios
   
   # Both
   eas build --platform all
   ```

5. **Submit to stores**
   ```bash
   # Android
   eas submit --platform android
   
   # iOS
   eas submit --platform ios
   ```

### Manual Build

#### Android

1. **Generate keystore**
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Build APK**
   ```bash
   cd mobile
   eas build --platform android --profile preview
   ```

#### iOS

1. **Requires macOS and Xcode**
2. **Build IPA**
   ```bash
   cd mobile
   eas build --platform ios --profile preview
   ```

## Environment Variables

### Backend (.env)
```env
PORT=5000
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com
```

### Mobile (.env)
```env
EXPO_PUBLIC_API_URL=https://your-backend-url.com
```

## SSL/HTTPS

For production, ensure your backend API is served over HTTPS. Most cloud platforms provide SSL certificates automatically.

## Monitoring

### Backend Monitoring

- **Heroku**: Built-in monitoring
- **Railway**: Built-in monitoring
- **DigitalOcean**: Use monitoring addons

### Frontend Monitoring

- **Vercel**: Built-in analytics
- **Netlify**: Built-in analytics

### Mobile Monitoring

- **Expo**: Built-in crash reporting
- **Sentry**: Add for detailed error tracking

## Performance Optimization

### Backend

1. **Enable compression**
2. **Use caching (Redis)**
3. **Optimize database queries**
4. **Use CDN for static assets**

### Frontend

1. **Code splitting**
2. **Lazy loading**
3. **Image optimization**
4. **Service workers for caching**

### Mobile

1. **Bundle optimization**
2. **Image compression**
3. **Lazy loading**
4. **Offline support**

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] JWT secrets are strong
- [ ] CORS configured properly
- [ ] Input validation
- [ ] Rate limiting
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection 