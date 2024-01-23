import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';

// Test route to check if the API is working
export const test = (req, res) => {
  res.json({
    message: 'API route is working!',
  });
};

// Controller function for updating a user's information
export const updateUser = async (req, res, next) => {
  // Check if the logged-in user is updating their own account
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));

  try {
    // If the request body includes a password, hash it
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Update the user in the database with the new information
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    // Exclude password from the response
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    // Handle any errors that may occur during user update
    next(error);
  }
};

// Controller function for deleting a user's account
export const deleteUser = async (req, res, next) => {
  // Check if the logged-in user is deleting their own account
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));

  try {
    // Delete the user from the database and clear the access token cookie
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    // Handle any errors that may occur during user deletion
    next(error);
  }
};

// Controller function for retrieving listings associated with a user
export const getUserListings = async (req, res, next) => {
  // Check if the logged-in user is retrieving their own listings
  if (req.user.id === req.params.id) {
    try {
      // Find listings associated with the user
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      // Handle any errors that may occur during listing retrieval
      next(error);
    }
  } else {
    // Return an error if the logged-in user is not retrieving their own listings
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
};

// Controller function for retrieving user information by ID
export const getUser = async (req, res, next) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);

    // If user not found, return an error
    if (!user) return next(errorHandler(404, 'User not found!'));

    // Exclude password from the response
    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    // Handle any errors that may occur during user retrieval
    next(error);
  }
};