# 📚 Course Management API

A RESTful API built with Node.js, Express, and MongoDB for managing courses and users with authentication and file upload capabilities.

## 🚀 Features

- **Course Management**: Create, read, update, and delete courses
- **User Management**: User registration, login, and profile management
- **Authentication**: JWT-based authentication with role-based access control
- **File Upload**: Avatar/profile picture upload functionality
- **Validation**: Input validation using Express Validator
- **Error Handling**: Centralized error handling with custom error classes
- **Pagination**: Support for paginated results
- **CORS**: Cross-Origin Resource Sharing enabled
- **Environment Configuration**: Secure environment variable management

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **File Upload**: Multer
- **Validation**: Express Validator
- **Password Hashing**: bcryptjs
- **Environment Variables**: dotenv

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB Atlas Account](https://www.mongodb.com/atlas) or local MongoDB installation
- [Git](https://git-scm.com/)

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Express-courses-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
PORT=3000
JWT_SECRET_KEY=your_jwt_secret_key_here
```

**Important**: Replace the MongoDB URL with your actual connection string and add a secure JWT secret key.

### 4. Start the Development Server

```bash
npm start
```

The server will start on `http://localhost:3000`

## 📁 Project Structure

```
session5/
├── controllers/           # Route controllers
│   ├── courses.controller.js
│   └── users.controller.js
├── middlewares/           # Custom middleware
│   ├── allowedTo.js
│   ├── asyncWrapper.js
│   ├── validationSchema.js
│   └── verifyToken.js
├── models/               # Database models
│   ├── course.model.js
│   └── users.model.js
├── routes/               # API routes
│   ├── courses.route.js
│   └── users.route.js
├── utils/                # Utility functions
│   ├── appError.js
│   ├── generateJWT.js
│   ├── httpStatusText.js
│   └── userRoles.js
├── uploads/              # File upload directory
├── data/                 # Static data files
├── .env                  # Environment variables
├── index.js              # Application entry point
└── package.json          # Project dependencies
```

## 🔗 API Endpoints

### Courses

| Method | Endpoint           | Description                 | Auth Required |
| ------ | ------------------ | --------------------------- | ------------- |
| GET    | `/api/courses`     | Get all courses (paginated) | No            |
| GET    | `/api/courses/:id` | Get course by ID            | No            |
| POST   | `/api/courses`     | Create new course           | Yes (Manager) |
| PUT    | `/api/courses/:id` | Update course               | Yes (Manager) |
| DELETE | `/api/courses/:id` | Delete course               | Yes (Admin)   |

### Users

| Method | Endpoint              | Description               | Auth Required |
| ------ | --------------------- | ------------------------- | ------------- |
| GET    | `/api/users`          | Get all users (paginated) | Yes           |
| POST   | `/api/users/register` | Register new user         | No            |
| POST   | `/api/users/login`    | User login                | No            |
| POST   | `/api/users/avatar`   | Upload user avatar        | Yes           |

## 📝 API Usage Examples

### Register a New User

```bash
POST /api/users/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Login

```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Create a Course (Manager Only)

```bash
POST /api/courses
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Advanced JavaScript",
  "price": 99.99,
  "description": "Master advanced JavaScript concepts"
}
```

### Get All Courses with Pagination

```bash
GET /api/courses?page=1&limit=10
```

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication. After successful login, include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 👥 User Roles

- **USER**: Default role, basic access
- **ADMIN**: Full access to all operations
- **MANAGER**: Can create and update courses

## 🔄 Error Handling

The API uses standardized error responses:

```json
{
  "status": "error|fail",
  "message": "Error description",
  "data": null
}
```

## 📊 Response Format

All API responses follow a consistent format:

**Success Response:**

```json
{
  "status": "success",
  "data": {
    "courses": [...],
    "users": [...]
  }
}
```

**Error Response:**

```json
{
  "status": "fail",
  "data": {
    "message": "Error details"
  }
}
```

## 🧪 Testing

You can test the API using:

- **Postman**: Import the collection and test all endpoints
- **Thunder Client**: VS Code extension for API testing
- **cURL**: Command-line testing

### Example cURL Commands

```bash
# Get all courses
curl -X GET http://localhost:3000/api/courses

# Register a new user
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"password123"}'
```

## 🚀 Deployment

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

- `MONGO_URL`: Your MongoDB connection string
- `PORT`: Server port (default: 3000)
- `JWT_SECRET_KEY`: Strong secret key for JWT signing

### Production Considerations

1. Use a strong, unique JWT secret key
2. Enable MongoDB IP whitelisting
3. Use HTTPS in production
4. Implement rate limiting
5. Add request logging
6. Set up monitoring and health checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
