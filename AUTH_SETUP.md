# Authentication Setup

## Overview
This application uses NextAuth.js for authentication. Only users with registered emails in the database can log in.

## Setup Steps

### 1. Environment Variables
Copy `.env.local.example` to `.env.local` and fill in the required values:

```bash
cp .env.local.example .env.local
```

Required variables:
- `MONGODB_URI`: Your MongoDB connection string
- `GROQ_API_KEY`: Your Groq API key from console.groq.com
- `NEXTAUTH_SECRET`: A random secret for NextAuth (generate with the command below)
- `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for development)

Generate a secret:
```bash
openssl rand -base64 32
```

### 2. Create a User in MongoDB

You need to manually create users in your MongoDB database. Follow these steps:

#### Step 1: Hash Your Password
```bash
node scripts/hash-password.js your-password-here
```

This will output a hashed password that you can use in MongoDB.

#### Step 2: Insert User into MongoDB
Using MongoDB Compass, MongoDB Shell, or your preferred tool, insert a document into the `users` collection:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "your-hashed-password-from-step-1",
  "isActive": true,
  "createdAt": { "$date": "2025-01-01T00:00:00.000Z" },
  "updatedAt": { "$date": "2025-01-01T00:00:00.000Z" }
}
```

### 3. Login
1. Navigate to http://localhost:3000
2. You'll be redirected to `/login` if not authenticated
3. Enter the email and password you created
4. Upon successful login, you'll be redirected to the home page

## Protected Routes
The following routes require authentication:
- `/` (Home/Chat page)
- `/addSloka`
- `/allSlokas`
- `/chapter/*`
- `/slokalist`
- `/chat`

## Features
- **Session-based authentication** using JWT
- **Password hashing** with bcrypt
- **Automatic redirect** to login page for unauthenticated users
- **Protected routes** using NextAuth middleware
- **Logout functionality** in the sidebar
- **Active user check** - only users with `isActive: true` can log in

## Security Notes
- Passwords are hashed using bcrypt before storage
- Sessions are managed using JWT tokens
- Only pre-registered emails can access the application
- No signup functionality (admin must add users to database)
