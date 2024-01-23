import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using the provided connection string
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve();

// Create an Express application
const app = express();

// Middleware to parse JSON in request bodies
app.use(express.json());

// Middleware to parse cookies in the request
app.use(cookieParser());

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

// Define routes for different parts of the API
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

// Error handling middleware to handle any errors that occur during the request
app.use((err, req, res, next) => {
  // Set the status code and message for the error response
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Send a JSON response with the error details
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});