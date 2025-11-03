# pwl25-mini-project - Products REST API with JWT Authentication

**Nama:** M. Bayu Aji  
**NIM:** F1D02310144

## 📝 Ringkasan Proyek

Repository ini adalah submission Mini Project UTS yang mengimplementasikan REST API untuk manajemen data produk **dengan JWT Authentication**. Proyek ini dibangun menggunakan Node.js dan Express.js, dengan MySQL sebagai database. Arsitektur yang diterapkan mengikuti pola MVC (Model-View-Controller) dan mencakup middleware esensial untuk logging, validasi, authentication, dan error handling.

## ✨ Fitur Utama

### Authentication & Security
- ✅ **JWT Authentication** - Token-based authentication
- ✅ **Password Hashing** - Menggunakan bcrypt untuk keamanan password
- ✅ **Role-Based Access Control** - Admin dan User dengan permissions berbeda
- ✅ **Protected Endpoints** - Middleware untuk proteksi route

### CRUD Operations
- ✅ **Create** - Tambah produk baru (requires authentication)
- ✅ **Read** - Lihat semua produk atau detail produk (public)
- ✅ **Update** - Update data produk (requires authentication)
- ✅ **Delete** - Hapus produk (admin only)

### Additional Features
- ✅ **User Registration** - Daftar user baru dengan role
- ✅ **User Login** - Login dan dapatkan JWT token
- ✅ **User Profile** - Lihat profile user yang sedang login
- ✅ **Input Validation** - Validasi data sebelum proses
- ✅ **Error Handling** - Centralized error handler
- ✅ **Request Logging** - Log setiap request yang masuk

---

## 📁 Struktur Folder Proyek

```
pwl25-mini-project/
├── src/                          # Source code folder
│   ├── config/
│   │   └── database.js           # Database connection configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── productController.js  # Product CRUD logic
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification & authorization
│   │   ├── errorHandler.js       # Global error handler
│   │   ├── logger.js             # Request logger
│   │   └── validationMiddleware.js  # Input validation
│   ├── models/
│   │   └── productModel.js       # Database queries for products
│   └── routes/
│       ├── authRoutes.js         # Authentication endpoints
│       └── productRoutes.js      # Product endpoints
├── screenshots/                   # Testing screenshots
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── app.js                        # Main application entry point
├── database.sql                  # Database schema & initial data
├── package.json                  # Project dependencies
└── README.md                     # Project documentation
```

**Struktur MVC + Authentication:**
- **Model** (`src/models/`) - Database layer
- **View** (JSON Response) - API responses
- **Controller** (`src/controllers/`) - Business logic
- **Routes** (`src/routes/`) - Endpoint definitions
- **Middleware** (`src/middleware/`) - Authentication, validation, logging

---

## 🗄️ Database Schema

### Table: `products`
```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table: `users`
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    full_name VARCHAR(255),
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Cara Instalasi & Menjalankan

### 1. Clone Repository
```bash
git clone https://github.com/Pabloz666999/pwl25-jwt-auth-project.git
cd pwl25-mini-project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database
```bash
mysql -u root -p

source database.sql
```

### 4. Konfigurasi Environment
Edit file `.env`:
```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=uts_product_api

JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRES_IN=24h
```

### 5. Jalankan Server
```bash
npm run dev

npm start
```

Server akan berjalan di: `http://localhost:3000`

---

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register user baru | ❌ |
| POST | `/auth/login` | Login dan dapatkan token | ❌ |
| GET | `/auth/profile` | Lihat profile user | ✅ |

### Product Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/products` | Get all products | ❌ | - |
| GET | `/products/:id` | Get product by ID | ❌ | - |
| POST | `/products` | Create new product | ✅ | user/admin |
| PUT | `/products/:id` | Update product | ✅ | user/admin |
| DELETE | `/products/:id` | Delete product | ✅ | **admin only** |

---

## 🔐 Authentication Flow

### 1. Register User
```bash
POST /auth/register
Content-Type: application/json

{
  "username": "admin666",
  "password": "admin123",
  "email": "admin@666.com",
  "full_name": "Administrator",
  "role": "admin"
}
```

### 2. Login
```bash
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin666",
    "role": "admin"
  }
}
```

### 3. Use Token for Protected Endpoints
```bash
POST /products
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "New Product",
  "category": "Electronics",
  "price": 1000,
  "stock": 50
}
```

---

## 🧪 Testing dengan Postman

### Testing Flow:

1. **Register Admin**
   - POST `/auth/register`
   - Role: `admin`

2. **Register Regular User**
   - POST `/auth/register`
   - Role: `user`

3. **Login as Admin**
   - POST `/auth/login`
   - Copy token dari response

4. **Get All Products (Public)**
   - GET `/products`
   - Tidak perlu token

5. **Create Product (Protected)**
   - POST `/products`
   - Tambahkan header: `Authorization: Bearer <token>`

6. **Update Product (Protected)**
   - PUT `/products/1`
   - Perlu token

7. **Delete Product as User (Should Fail)**
   - DELETE `/products/1`
   - Login sebagai user
   - Expected: 403 Forbidden

8. **Delete Product as Admin (Success)**
   - DELETE `/products/1`
   - Login sebagai admin
   - Expected: 200 OK

---

## 📸 Screenshots Testing

### 1. Register User
![alt text](screenshots/Register.png)

### 2. Login.
![alt text](screenshots/Login.png)

### 3. Create Product (with Token)
![alt text](screenshots/CreateProduct.png)

### 4. Delete Product (Admin Only)
![alt text](screenshots/DeleteProduct.png)

### 5. Get See Profile
![alt text](screenshots/Profile.png)

---

## 🎯 Implementasi Middleware

### 1. Logger (`src/middleware/logger.js`)
Mencatat setiap request yang masuk:
```javascript
[LOGGER] GET /products
[LOGGER] POST /auth/login
```

### 2. Validation (`src/middleware/validationMiddleware.js`)
Validasi input sebelum proses:
- Required fields check
- Data type validation
- Value range validation

### 3. Authentication (`src/middleware/authMiddleware.js`)
- **authenticateToken**: Verifikasi JWT token
- **authorizeRole**: Check user role/permissions

### 4. Error Handler (`src/middleware/errorHandler.js`)
Centralized error handling untuk semua error.

---

## 🔒 Security Features

1. **Password Hashing**
   - Menggunakan bcrypt dengan salt rounds 10
   - Password tidak pernah disimpan dalam plain text

2. **JWT Token**
   - Token expires dalam 24 jam (configurable)
   - Signed dengan secret key
   - Payload berisi user id, username, dan role

3. **Role-Based Access Control**
   - Admin: Full access (CRUD semua)
   - User: Create, Read, Update (tidak bisa delete)

4. **Protected Endpoints**
   - POST/PUT/DELETE requires authentication
   - DELETE requires admin role

---

## 🚀 Improvisasi & Fitur Tambahan

### ✅ Implementasi Sesuai Modul:
1. JWT Authentication
2. bcrypt Password Hashing
3. Register & Login System
4. Protected Routes
5. Token Verification Middleware

### 🎯 Improvisasi Tambahan:
1. **Role-Based Access Control**
   - 2 role: admin & user
   - Different permissions

2. **Enhanced User Model**
   - Email field
   - Full name field
   - Role field
   - Timestamps

3. **Profile Endpoint**
   - User dapat melihat profile mereka

4. **Better Error Handling**
   - Token expired handling
   - Invalid token handling
   - Detailed error messages

5. **Structured Code Organization**
   - Menggunakan folder `src/`
   - Clean separation of concerns

6. **Authorization Middleware**
   - `authorizeRole()` untuk check permissions
   - Reusable untuk berbagai role

7. **Complete API Documentation**
   - Detailed endpoint documentation
   - Testing flow guide
   - Screenshots

---
