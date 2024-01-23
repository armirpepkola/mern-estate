import express from 'express';

// Import authentication-related controller functions
import { google, signOut, signin, signup } from '../controllers/auth.controller.js';

// Create an Express Router instance
const router = express.Router();

// Route for user signup (POST /api/auth/signup)
router.post("/signup", signup);

// Route for user signin (POST /api/auth/signin)
router.post("/signin", signin);

// Route for Google OAuth authentication (POST /api/auth/google)
router.post('/google', google);

// Route for user signout (GET /api/auth/signout)
router.get('/signout', signOut);

// Export the router for use in other parts of the application
export default router;