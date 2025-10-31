# FlowServe Backend API

A scalable and reliable REST API for real-time transaction processing and digital wallet operations built with Node.js, Express, TypeScript, and PostgreSQL.

## 🚀 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL(Supabase)** -cloud hosted Database
- **Prisma** - ORM
- **Pino** - Logging
- **Zod** - Validation
- **Express Rate Limit** - Rate limiting

## 📋 Features

- ✅ User management (CRUD operations)
- ✅ Transaction processing (create, view, update status)
- ✅ Pagination support
- ✅ Transaction status filtering
- ✅ Request validation with Zod
- ✅ Error handling middleware
- ✅ Request logging with Pino
- ✅ Rate limiting
- ✅ CORS enabled
- ✅ TypeScript for type safety

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher) local or supabase hosted
- npm or yarn

## Installation

1. **Clone the repository:**

```bash
git clone <https://github.com/maryokafor28/flowserve-backend.git>
cd flowserve-backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory:

```env
# Server
PORT=4000
NODE_ENV=development

# Local PostgreSQL (for local development)
DATABASE_URL="postgresql://postgres:password@localhost:5432/flowserve"

# Supabase (for production deployment)
# Replace with your Supabase connection string from Project Settings → Database
# DATABASE_URL="postgresql://postgres.<SUPABASE_USER>:<SUPABASE_PASSWORD>@db.<SUPABASE_PROJECT>.supabase.co:5432/postgres"
```

When deploying, set your Supabase DATABASE_URL in your hosting environment (Render, Vercel, Railway, etc.) under Environment Variables. 4. **Set up the database:**

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed database with test data
npx prisma db seed
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

Server runs on `http://localhost:4000`

### Production Build

```bash
npm run build
npm start
```

## 📚 API Documentation

### Base URL

```
http://localhost:4000/api or deployed url
https://flowserve-backend.onrender.com/api

```

### Health Check

```http
GET /
```

Response:

```json
{
  "message": "FlowServe API running 🚀"
}
```

---

### Users Endpoints

#### Get All Users

```http
GET /api/users?page=1&limit=20
```

**Query Parameters:**

- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 20) - Items per page

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "total": 45,
  "page": 1,
  "limit": 20,
  "totalPages": 3
}
```

#### Get Single User

```http
GET /api/users/:id
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

#### Create User

```http
POST /api/users
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

#### Update User

```http
PATCH /api/users/:id
```

**Request Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

#### Delete User

```http
DELETE /api/users/:id
```

**Response:**

```json
{
  "message": "User deleted successfully"
}
```

---

### Transactions Endpoints

#### Get All Transactions

```http
GET /api/transactions?page=1&limit=10&status=PENDING
```

**Query Parameters:**

- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Items per page
- `status` (optional) - Filter by status: `PENDING`, `COMPLETED`, `FAILED`, `CANCELLED`

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "amount": "100.50",
      "description": "Payment for lunch",
      "status": "COMPLETED",
      "senderId": "uuid",
      "receiverId": "uuid",
      "sender": {
        "id": "uuid",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "receiver": {
        "id": "uuid",
        "name": "Jane Smith",
        "email": "jane@example.com"
      },
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10,
  "totalPages": 3
}
```

#### Create Transaction

```http
POST /api/transactions
```

**Request Body:**

```json
{
  "amount": 100.5,
  "description": "Payment for lunch",
  "senderId": "uuid",
  "receiverId": "uuid"
}
```

**Response:**

```json
{
  "message": "Transaction created successfully",
  "transaction": {
    "id": "uuid",
    "amount": "100.50",
    "description": "Payment for lunch",
    "status": "PENDING",
    "senderId": "uuid",
    "receiverId": "uuid",
    "sender": {
      /* user object */
    },
    "receiver": {
      /* user object */
    },
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

#### Update Transaction Status

```http
PATCH /api/transactions/:id/status
```

**Request Body:**

```json
{
  "status": "COMPLETED"
}
```

**Valid Statuses:** `PENDING`, `COMPLETED`, `FAILED`, `CANCELLED`

**Response:**

```json
{
  "message": "Transaction marked as COMPLETED",
  "transaction": {
    /* updated transaction object */
  }
}
```

---

## 🔒 Rate Limiting

API is rate-limited to prevent abuse:

- **Development:** 1000 requests per 15 minutes (disabled by default)
- **Production:** 100 requests per 15 minutes per IP

Rate limit headers are included in responses:

```
RateLimit-Limit: 100
RateLimit-Remaining: 95
RateLimit-Reset: 1698589845
```

---

## ⚠️ Error Responses

All errors follow a consistent format:

**400 Bad Request:**

```json
{
  "status": "fail",
  "message": "Validation error",
  "errors": [
    {
      "path": "body.email",
      "message": "Invalid email format"
    }
  ]
}
```

**404 Not Found:**

```json
{
  "status": "fail",
  "message": "User not found"
}
```

**429 Too Many Requests:**

```json
{
  "status": 429,
  "error": "Too many requests, please try again later."
}
```

**500 Internal Server Error:**

```json
{
  "status": "error",
  "message": "Internal Server Error"
}
```

---

## 📁 Project Structure

```
flowserve-backend/
├── src/
│   ├── controllers/          # Request handlers
│   ├── services/             # Business logic
│   ├── middlewares/          # Custom middleware
│   ├── routes/               # API routes
│   ├── validators/           # Zod schemas
│   ├── utils/                # Utility functions
│   ├── logger/               # Pino logger setup
│   ├── app.ts                # Express app configuration
│   └── server.ts             # Server entry point
├── prisma/
│   └── schema.prisma         # Database schema
├── .env                      # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧪 Testing

Test the API using:

1. **Postman Collection** (import from `/postman` folder)
2. **cURL examples:**

```bash
# Create a user
curl -X POST http://localhost:4000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

# Get all users
curl http://localhost:4000/api/users

# Create a transaction
curl -X POST http://localhost:4000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "senderId": "sender-uuid",
    "receiverId": "receiver-uuid",
    "description": "Test payment"
  }'
```

---

## 🐛 Debugging

View logs in the console (formatted with Pino Pretty in development):

```
[14:30:45] INFO: Server started on port 4000
[14:30:46] INFO: 📤 GET /api/users
[14:30:47] INFO: ✅ 200 /api/users
```

---

## 🚢 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=4000
DATABASE_URL="postgresql://user:password@host:5432/database"
```

### Build and Start

```bash
npm run build
npm start
```

---

## Contributing

This is a test project for learning purposes.

---

## License

MIT

---

## 👤 Author

**Mary Amadi**  
GitHub: [@braveredemptive](https://github.com/braveredemptive)

---

## Related Repositories

- [https://github.com/maryokafor28/flowserve-frontend.git](link-to-frontend-repo) - React + vite + TypeScript + Tailwind CSS

---
