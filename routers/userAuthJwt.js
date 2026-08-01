import express from 'express';
import { deleteUser, loginUser, registerUser, updateUser, usersDetails } from '../controllers/userAuthController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// Jwt Authentication Routes
router.post('/register', registerUser)

export default router;