# Advisor Product REST API

A secure RESTful API that enables advisors to register, login, and manage their products. This API was built as part of a technical assessment using Node.js, TypeScript, and MongoDB.

## Features

- **Advisor Authentication**
  - Registration with email, password, and name
  - Login with JWT token generation
  - Password security with bcrypt hashing
  - Secure password requirements

- **Product Management**
  - Create products with name, description, and price
  - List advisor-specific products
  - Data validation with Zod schemas

- **Security**
  - JWT-based authentication
  - HTTP security headers with Helmet
  - Input validation at multiple levels
  - Proper error handling

## Technologies Used

- **Backend**: Node.js with Express
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js with JWT strategy
- **Validation**: Zod schema validation
- **Security**: bcrypt for password hashing, Helmet for HTTP headers
- **Testing**: Jest with supertest

## Project Structure

```
/
├── src/
│   ├── controllers/     # Business logic and request handling
│   ├── middleware/      # Authentication and error handlers
│   ├── models/          # Database models
│   ├── routes/          # API route definitions
│   ├── schemas/         # Validation schemas for requests/responses
│   ├── db/              # Database connection and configuration
│   ├── config/          # Application configuration
│   └── tests/           # Testing directory
│       ├── unit/        # Unit tests
│       └── integration/ # Integration tests
├── package.json
├── tsconfig.json
└── jest.config.js
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/machirajusandy/advisor-product-app.git
   cd advisor-porduct-node-restful-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a [`.env`](.env ) file based on [`.env.example`](.env.example ):
   ```bash
   cp .env.example .env
   ```

4. Update the [`.env`](.env ) file with your MongoDB URI and JWT secret:
   ```
   MONGODB_URI="mongodb://127.0.0.1:27017/product_advisor"
   JWT_SECRET="your-secure-secret-key"
   ```

## Running the Application

Development mode:
```bash
npm run dev
```

## API Endpoints

### Authentication

**Register a new advisor**
```
POST /register
Content-Type: application/json

{
  "name": "Advisor Name",
  "email": "advisor@example.com",
  "password": "SecurePassword1@"
}
```

**Login**
```
POST /login
Content-Type: application/json

{
  "email": "advisor@example.com",
  "password": "SecurePassword1@"
}
```
Response includes a JWT token to use for authenticated requests.

### Product Management

**Create a product**
```
POST /products
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99
}
```

**Get advisor's products**
```
GET /products
Authorization: Bearer <token>
```

## Testing

Run tests:
```bash
npm test
```

Run tests with watch mode:
```bash
npm run test:watch
```

## Security Features

- **Password Requirements**: Requires uppercase, lowercase, numbers, and special characters
- **JWT Authentication**: Secure, stateless authentication
- **Input Validation**: Schema-based validation for all inputs
- **HTTP Security Headers**: Implementation of security best practices with Helmet

## Error Handling

The API implements centralized error handling for:
- Validation errors
- Authentication failures
- Server errors

Errors are returned with appropriate HTTP status codes and descriptive messages.