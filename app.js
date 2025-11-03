require('dotenv').config(); 
const express = require('express');
const cors = require('cors');

const logger = require('./src/middleware/logger');
const errorHandler = require('./src/middleware/errorHandler');
const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Product CRUD API with JWT Authentication',
    version: '2.0.0',
    author: 'M. Bayu Aji',
    endpoints: {
      auth: {
        register: 'POST /auth/register',
        login: 'POST /auth/login',
        profile: 'GET /auth/profile (requires token)'
      },
      products: {
        getAll: 'GET /products',
        getById: 'GET /products/:id',
        create: 'POST /products (requires token)',
        update: 'PUT /products/:id (requires token)',
        delete: 'DELETE /products/:id (requires admin token)'
      }
    }
  });
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`JWT Authentication is enabled`);
});