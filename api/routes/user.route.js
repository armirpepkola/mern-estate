import express from 'express';

// Import user-related controller functions and token verification middleware
import { deleteUser, test, updateUser, getUserListings, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

// Create an Express Router instance
const router = express.Router();

// Route for testing the user route (GET /api/user/test)
router.get('/test', test);

// Route for updating user information (POST /api/user/update/:id)
router.post('/update/:id', verifyToken, updateUser);

// Route for deleting a user account (DELETE /api/user/delete/:id)
router.delete('/delete/:id', verifyToken, deleteUser);

// Route for retrieving user listings (GET /api/user/listings/:id)
router.get('/listings/:id', verifyToken, getUserListings);

// Route for retrieving user information by ID (GET /api/user/:id)
router.get('/:id', verifyToken, getUser);

// Export the router for use in other parts of the application
export default router;