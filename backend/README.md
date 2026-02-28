# InterStock Backend API

Backend API for InterStock Web App built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/inter-stock
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

3. Make sure MongoDB is running on your system

4. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Health Check

- `GET /api/health` - Check server status

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)
