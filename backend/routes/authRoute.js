import express from 'express';
import { forgotPassword, login, logout, resetPassword, verifyEmail, checkAuth, signup, updateProfile } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();


router.get("/check-auth", verifyToken, checkAuth);
router.put("/update-profile", verifyToken, updateProfile);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


// Testing routes
// router.get('/profile', (req, res) => {
//   res.send("profile route");
// });

export default router;
