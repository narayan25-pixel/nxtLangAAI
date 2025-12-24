# Quick Start Guide - Authentication

## 1. Setup Environment Variables

```bash
# Copy example file
cp .env.local.example .env.local

# Generate NextAuth secret
openssl rand -base64 32

# Add to .env.local:
NEXTAUTH_SECRET=<your-generated-secret>
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=<your-mongodb-uri>
GROQ_API_KEY=<your-groq-key>
```

## 2. Create Your First User

### Option A: Using the API (Recommended)

Send a POST request to create a user:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "yourpassword123",
    "isActive": true
  }'
```

Or use Postman:
- URL: `http://localhost:3000/api/users`
- Method: `POST`
- Body (JSON):
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "yourpassword123",
  "isActive": true
}
```

### Option B: Manual MongoDB Insert

1. Hash your password:
```bash
node scripts/hash-password.js yourpassword123
```

2. Copy the hashed password and insert into MongoDB users collection:
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "<hashed-password-from-step-1>",
  "isActive": true,
  "createdAt": { "$date": "2025-12-23T00:00:00.000Z" },
  "updatedAt": { "$date": "2025-12-23T00:00:00.000Z" }
}
```

## 3. Start the App

```bash
npm run dev
```

## 4. Login

1. Go to http://localhost:3000
2. You'll be redirected to `/login`
3. Enter your email and password
4. You're in! 🎉

## API Endpoints

- `POST /api/users` - Create a new user (password auto-hashed)
- `GET /api/users` - Get all users (passwords excluded)
- `POST /api/auth/signin` - Login (handled by NextAuth)
- `POST /api/auth/signout` - Logout

## Notes

- ✅ All passwords are automatically hashed with bcrypt
- ✅ Only users in the database can login
- ✅ No signup page - admin must add users
- ✅ Session persists across page refreshes
- ✅ Automatic redirect to login for protected routes
- ✅ Logout button in sidebar
