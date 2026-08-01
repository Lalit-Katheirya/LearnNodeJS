import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import connectDB from './db/config.js';
import pool from './db/sqlConfig.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routers/userRoutes.js';
import webRoutes from './routers/webRoutes.js';
import userAuth from './routers/userAuthJwt.js'; // Import the new router for JWT authentication

// Load environment configuration from .env file
dotenv.config();

const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to databases
connectDB(); // Connect to MongoDB
pool.getConnection()
  .then((connection) => {
    console.log('Connected to the MySQL database');
    connection.release();
  })
  .catch((error) => {
    console.error('Error connecting to the MySQL database:', error);
  });

// Create Express application
const app = express();

// Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/auth', userAuth); // Use the JWT authentication router
// TODO: add additional route modules when ready
// app.use('/api/products', productRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/carts', cartRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/reviews', reviewRoutes);

// Root health check
app.use('/', webRoutes);

// Error handling middleware should be added after route registration
app.use(errorHandler);

// Error handling middleware should be added after route registration
app.use(errorHandler);

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));