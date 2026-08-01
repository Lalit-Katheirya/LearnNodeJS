import express from 'express';
import {
  deleteUser,
  loginUser,
  registerUser,
  updateUser,
  usersDetails,
} from '../controllers/usersControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public view routes
router.get('/register', (req, res) => {
  res.render('registration', { title: 'User Registration' });
});

// User authentication routes
router.post('/register', registerUser);
router.post('/login', protect, loginUser); // protect middleware can be applied to routes that require authentication

// User profile routes
router.get('/users-details', usersDetails);
router.post('/update-profile', updateUser);
router.post('/remove', deleteUser);

export default router