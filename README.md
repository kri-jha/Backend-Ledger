# Backend Ledger

A backend banking/ledger API built with **Node.js, Express, MongoDB, and Mongoose**.

The project is being developed as a practical backend-learning project, focusing on authentication, database modeling, API routing, password security, JWT-based authentication, cookies, and email integration.

## 🚀 Features

### Authentication
- User registration
- User login
- Email format validation
- Duplicate email detection
- Password hashing with **bcryptjs**
- Password comparison during login
- JWT token generation
- JWT token stored in an HTTP cookie

### Database
- MongoDB connection using **Mongoose**
- User schema with validation and timestamps
- Account schema with status and currency fields
- MongoDB indexes for account-related queries

### Email Service
- Registration/welcome email using **Nodemailer**
- Gmail OAuth2 configuration
- Environment-based email credentials

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JSON Web Token (JWT)
- **Password Security:** bcryptjs
- **Cookies:** cookie-parser
- **Email:** Nodemailer + Gmail OAuth2
- **Environment Variables:** dotenv
- **Development:** Nodemon

## 📁 Project Structure

```text
Backend-Ledger/
│
├── SRC/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── auth.controllers.js
│   │   └── account.controller.js
│   │
│   ├── middleware/
│   │   └── account.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   └── account.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── account.routes.js
│   │
│   ├── services/
│   │   └── email.services.js
│   │
│   └── app.js
│
├── .env.example
├── .gitignore
├── brain.md
├── package.json
├── package-lock.json
└── server.js
```

## 🔄 Request Flow

The current authentication flow follows this structure:

```text
Client
  │
  ▼
server.js
  │
  ▼
app.js
  │
  ▼
Route
  │
  ▼
Controller
  │
  ▼
Mongoose Model
  │
  ▼
MongoDB
  │
  ▼
Response
  │
  ▼
Client
```

For example, registration:

```text
POST /api/auth/register
        ↓
auth.routes.js
        ↓
userRegisterController()
        ↓
User Model
        ↓
MongoDB
        ↓
JWT generation
        ↓
Cookie + JSON response
        ↓
Registration email
```

## 🔐 Authentication Endpoints

### Register

```http
POST /api/auth/register
Content-Type: application/json
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

The registration flow:
1. Checks whether the email already exists.
2. Creates the user.
3. Hashes the password before saving.
4. Generates a JWT valid for 7 days.
5. Stores the token in a cookie.
6. Sends a registration email.

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

The login flow:
1. Finds the user by email.
2. Retrieves the password field for verification.
3. Compares the submitted password with the stored bcrypt hash.
4. Generates a new JWT.
5. Stores the token in a cookie.
6. Returns the authenticated user's details.

## 🗄️ Data Models

### User

The user model contains:

- `name`
- `email`
- `password`
- `createdAt`
- `updatedAt`

Important validation/security rules include:

- Email is normalized to lowercase.
- Email format is validated with a regular expression.
- Email is unique.
- Password must be at least 6 characters.
- Password is excluded from normal query results with `select: false`.
- Passwords are hashed with bcryptjs before saving.

### Account

The account model currently includes:

- `user` — reference to a user
- `status` — `ACTIVE`, `FROZEN`, or `CLOSED`
- `currency` — defaults to `INR`
- `createdAt`
- `updatedAt`

A compound index is defined on:

```text
{ user: 1, status: 1 }
```

## ⚙️ Environment Variables

Create a `.env` file in the project root.

Use `.env.example` as the template:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_ID=your_google_oauth_client_id
CLIENT_SECRET=your_google_oauth_client_secret
REFRESH_TOKEN=your_google_refresh_token
EMAIL_USER=your_email_address
```

**Never commit your real `.env` file or secrets to GitHub.**

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kri-jha/Backend-Ledger.git
cd Backend-Ledger
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and add your MongoDB, JWT, and email OAuth2 credentials.

### 4. Start the development server

```bash
npm run dev
```

The server runs on:

```text
http://localhost:3000
```

### 5. Start in production mode

```bash
npm start
```

## 🧪 API Testing

The authentication endpoints can be tested using tools such as **Postman**.

### Register

```text
POST http://localhost:3000/api/auth/register
```

### Login

```text
POST http://localhost:3000/api/auth/login
```

For JSON requests, send:

```http
Content-Type: application/json
```

## 🧠 What I Learned

This project was built to understand backend architecture through implementation.

Key concepts practiced:

- Express application setup
- Route organization
- Route-to-controller flow
- Controllers and service layers
- Mongoose schemas and models
- MongoDB connection handling
- Password hashing with bcrypt
- JWT authentication
- Cookies and cookie-parser
- Environment variables
- Email services with Nodemailer
- API testing with Postman
- Debugging backend errors
- Understanding unreachable code and response flow

## 📌 Current Status

Authentication functionality is implemented, while the account module is currently structured for further development.

Planned extensions include:

- Account creation endpoints
- Authentication middleware
- Protected account routes
- Account balance management
- Transaction/ledger functionality
- Deposit and withdrawal APIs
- Transfer APIs
- Transaction history
- Improved error handling and validation
- Automated tests

## ⚠️ Disclaimer

This project is for **learning and development purposes**. It is not intended for handling real banking transactions or production financial data.

## 👨‍💻 Author

**Krishna Kumar Jha**

GitHub: [@kri-jha](https://github.com/kri-jha)

---

⭐ If you are learning backend development, feel free to explore the code and follow the project as it evolves.
