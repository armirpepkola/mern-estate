import express from 'express';

// Import listing-related controller functions and token verification middleware
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

// Create an Express Router instance
const router = express.Router();

// Route for creating a new listing (POST /api/listing/create)
router.post('/create', verifyToken, createListing);

// Route for deleting a listing by ID (DELETE /api/listing/delete/:id)
router.delete('/delete/:id', verifyToken, deleteListing);

// Route for updating a listing by ID (POST /api/listing/update/:id)
router.post('/update/:id', verifyToken, updateListing);

// Route for retrieving a single listing by ID (GET /api/listing/get/:id)
router.get('/get/:id', getListing);

// Route for retrieving a list of listings with optional filters and pagination (GET /api/listing/get)
router.get('/get', getListings);

// Export the router for use in other parts of the application
export default router;