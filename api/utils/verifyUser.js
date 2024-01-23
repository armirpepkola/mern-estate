// Utility function to verify a user's access token
import jwt from 'jsonwebtoken';

// Import the errorHandler utility function
import { errorHandler } from './error.js';

// Middleware function to verify the access token in the request cookies
export const verifyToken = (req, res, next) => {
  // Extract the access token from the request cookies
  const token = req.cookies.access_token;

  // If no token is found, return an unauthorized error
  if (!token) return next(errorHandler(401, 'Unauthorized'));

  // Verify the token using the JWT_SECRET from the environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // If an error occurs during token verification, return a forbidden error
    if (err) return next(errorHandler(403, 'Forbidden'));

    // Attach the user information to the request for further use in controllers
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  });
};