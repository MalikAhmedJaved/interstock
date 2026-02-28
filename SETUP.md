# InterStock Backend Setup Guide

## Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (local installation or MongoDB Atlas account)

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/inter-stock
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

**Note:** For MongoDB Atlas, use a connection string like:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inter-stock
```

4. Make sure MongoDB is running:
   - **Local MongoDB**: Start MongoDB service on your system
   - **MongoDB Atlas**: Ensure your IP is whitelisted and connection string is correct

5. Start the backend server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd inter-stock-web
```

2. Create a `.env` file (optional, defaults to localhost:5000):
```
VITE_API_BASE_URL=http://localhost:5000/api
```

3. Install dependencies (if not already done):
```bash
npm install
```

4. Start the frontend:
```bash
npm run dev
```

## API Endpoints

### Authentication

- **POST** `/api/auth/signup` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890" // optional
  }
  ```

- **POST** `/api/auth/signin` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **GET** `/api/auth/me` - Get current user (requires Authorization header)
  ```
  Authorization: Bearer <token>
  ```

## Testing the API

You can test the API using:
- Postman
- curl
- The frontend application

### Example curl commands:

**Sign Up:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Sign In:**
```bash
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get Current User:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your-token>"
```

## Troubleshooting

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running
   - Check the connection string in `.env`
   - Verify network/firewall settings

2. **Port Already in Use:**
   - Change the PORT in `.env` file
   - Or stop the process using port 5000

3. **CORS Errors:**
   - Ensure backend is running
   - Check API_BASE_URL in frontend `.env`

4. **JWT Token Errors:**
   - Ensure JWT_SECRET is set in backend `.env`
   - Clear browser localStorage and login again
