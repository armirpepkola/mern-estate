import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

// Controller function for creating a new listing
export const createListing = async (req, res, next) => {
  try {
    // Create a new listing using the request body
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    // Handle any errors that may occur during listing creation
    next(error);
  }
};

// Controller function for deleting a listing
export const deleteListing = async (req, res, next) => {
  // Find the listing by ID
  const listing = await Listing.findById(req.params.id);

  // If listing not found, return an error
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  // Check if the logged-in user is the owner of the listing
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    // Delete the listing from the database
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    // Handle any errors that may occur during listing deletion
    next(error);
  }
};

// Controller function for updating a listing
export const updateListing = async (req, res, next) => {
  // Find the listing by ID
  const listing = await Listing.findById(req.params.id);

  // If listing not found, return an error
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  // Check if the logged-in user is the owner of the listing
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    // Update the listing in the database
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    // Handle any errors that may occur during listing update
    next(error);
  }
};

// Controller function for retrieving a single listing by ID
export const getListing = async (req, res, next) => {
  try {
    // Find the listing by ID
    const listing = await Listing.findById(req.params.id);

    // If listing not found, return an error
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }

    res.status(200).json(listing);
  } catch (error) {
    // Handle any errors that may occur during listing retrieval
    next(error);
  }
};

// Controller function for retrieving a list of listings with optional filters and pagination
export const getListings = async (req, res, next) => {
  try {
    // Extract query parameters from the request
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    // ... (similar logic for other optional filters)

    // Set default values for undefined filters
    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }
    // ... (similar logic for other undefined filters)

    // Build the query based on filters and search term
    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    // Find listings that match the filters and search term
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      // ... (similar logic for other filters)
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    // Return the list of filtered and paginated listings
    return res.status(200).json(listings);
  } catch (error) {
    // Handle any errors that may occur during listing retrieval
    next(error);
  }
};